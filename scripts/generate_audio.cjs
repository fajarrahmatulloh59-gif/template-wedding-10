// Audio synthesizer for wedding backsound (ambient romantic piano/strings)
const fs = require('fs');
const { execSync } = require('child_process');

const sampleRate = 44100;
const bpm = 68;
const beatSec = 60 / bpm;
const barSec = beatSec * 4; // 3.529 seconds per chord bar

// 8 chords (30 seconds total progression)
// D major -> A major -> B minor -> F# minor -> G major -> D major -> G major -> A major
const chords = [
  [146.83, 220.00, 293.66, 369.99, 440.00, 587.33], // D maj (D3, A3, D4, F#4, A4, D5)
  [110.00, 220.00, 277.18, 329.63, 440.00, 554.37], // A maj (A2, A3, C#4, E4, A4, C#5)
  [123.47, 185.00, 246.94, 293.66, 369.99, 493.88], // B min (B2, F#3, B3, D4, F#4, B4)
  [92.50, 185.00, 220.00, 277.18, 369.99, 440.00],  // F# min (F#2, F#3, A3, C#4, F#4, A4)
  [98.00, 196.00, 246.94, 293.66, 392.00, 493.88],  // G maj (G2, G3, B3, D4, G4, B4)
  [146.83, 220.00, 293.66, 369.99, 440.00, 587.33], // D maj
  [98.00, 196.00, 246.94, 293.66, 392.00, 587.33],  // G maj
  [110.00, 220.00, 277.18, 329.63, 440.00, 659.25]  // A maj
];

const totalSeconds = chords.length * barSec;
const totalSamples = Math.floor(sampleRate * totalSeconds);
const leftChannel = new Float32Array(totalSamples);
const rightChannel = new Float32Array(totalSamples);

// Synthesize arpeggiated piano & soft pad
chords.forEach((chord, chordIdx) => {
  const barStart = Math.floor(chordIdx * barSec * sampleRate);
  
  // Pad underlying chord
  chord.forEach((freq, noteIdx) => {
    const pan = (noteIdx / chord.length) * 0.8 + 0.1; // 0.1 to 0.9
    for (let t = 0; t < barSec * sampleRate; t++) {
      const idx = barStart + t;
      if (idx >= totalSamples) break;
      const time = t / sampleRate;
      
      // Warm sine + soft triangle
      const osc = Math.sin(2 * Math.PI * freq * time) * 0.5 + 
                  Math.sin(2 * Math.PI * freq * 2 * time) * 0.15 +
                  Math.sin(2 * Math.PI * freq * 3 * time) * 0.05;
      
      // Gentle swell envelope
      const env = Math.sin(Math.PI * (t / (barSec * sampleRate))) * 0.07;
      leftChannel[idx] += osc * env * (1 - pan);
      rightChannel[idx] += osc * env * pan;
    }
  });

  // Arpeggios like gentle raindrops / piano keys
  const notesPerBar = 8;
  const noteDuration = barSec / notesPerBar;
  for (let step = 0; step < notesPerBar; step++) {
    const noteFreq = chord[(step * 2) % chord.length];
    const noteStart = barStart + Math.floor(step * noteDuration * sampleRate);
    const decayDuration = 2.4; // seconds of ringing
    const pan = ((step % 3) / 2) * 0.6 + 0.2;

    for (let t = 0; t < decayDuration * sampleRate; t++) {
      const idx = noteStart + t;
      if (idx >= totalSamples) break;
      const time = t / sampleRate;
      
      // Piano-like decay with subtle chime harmonic
      const attack = Math.min(1.0, time / 0.015);
      const decay = Math.exp(-time * 2.8);
      const envelope = attack * decay * 0.14;

      const osc = Math.sin(2 * Math.PI * noteFreq * time) +
                  0.35 * Math.sin(2 * Math.PI * (noteFreq * 2) * time) * Math.exp(-time * 4) +
                  0.15 * Math.sin(2 * Math.PI * (noteFreq * 3) * time) * Math.exp(-time * 6) +
                  0.08 * Math.sin(2 * Math.PI * (noteFreq * 4) * time) * Math.exp(-time * 8);

      leftChannel[idx] += osc * envelope * (1 - pan);
      rightChannel[idx] += osc * envelope * pan;
    }
  }
});

// Soft master limiter / normalization
let maxAmp = 0;
for (let i = 0; i < totalSamples; i++) {
  maxAmp = Math.max(maxAmp, Math.abs(leftChannel[i]), Math.abs(rightChannel[i]));
}
const gain = maxAmp > 0 ? 0.85 / maxAmp : 1.0;

// Write 16-bit PCM WAV
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

// Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk1 size
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(bytesPerSample * 8, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  // Fade in at start and fade out at end for seamless looping
  let edgeFade = 1.0;
  if (i < sampleRate * 1.5) {
    edgeFade = i / (sampleRate * 1.5);
  } else if (i > totalSamples - sampleRate * 1.5) {
    edgeFade = (totalSamples - i) / (sampleRate * 1.5);
  }

  const l = Math.max(-1, Math.min(1, leftChannel[i] * gain * edgeFade));
  const r = Math.max(-1, Math.min(1, rightChannel[i] * gain * edgeFade));
  buffer.writeInt16LE(Math.floor(l < 0 ? l * 0x8000 : l * 0x7FFF), offset);
  offset += 2;
  buffer.writeInt16LE(Math.floor(r < 0 ? r * 0x8000 : r * 0x7FFF), offset);
  offset += 2;
}

fs.writeFileSync('public/music/backsound.wav', buffer);
console.log('WAV generated, converting to MP3...');
execSync('ffmpeg -y -i public/music/backsound.wav -codec:a libmp3lame -qscale:a 2 public/music/backsound.mp3');
fs.unlinkSync('public/music/backsound.wav');
console.log('MP3 generation complete!');
