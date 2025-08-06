// Initialize WaveSurfer instances for Deck A and Deck B
const waveA = WaveSurfer.create({
  container: '#waveformA',
  waveColor: 'violet',
  progressColor: 'purple',
  height: 80
});

const waveB = WaveSurfer.create({
  container: '#waveformB',
  waveColor: 'cyan',
  progressColor: 'blue',
  height: 80
});

let cuePoints = { A: 0, B: 0 };
let loopEnabled = { A: false, B: false };

// Auto resume AudioContext on first user interaction
function resumeAudioContext() {
  const contextA = waveA.backend.getAudioContext();
  if (contextA.state === 'suspended') {
    contextA.resume();
    console.log('AudioContext resumed for Deck A');
  }
  const contextB = waveB.backend.getAudioContext();
  if (contextB.state === 'suspended') {
    contextB.resume();
    console.log('AudioContext resumed for Deck B');
  }
}
document.body.addEventListener('click', resumeAudioContext, { once: true });

function loadTrack(deck, url, title, bpm) {
  const wave = deck === 'A' ? waveA : waveB;
  wave.load(url);
  document.getElementById(`nowPlaying${deck}`).textContent = `Now Playing: ${title}`;
  document.getElementById(`bpm${deck}`).textContent = bpm;

  wave.on('ready', () => {
    console.log(`Track loaded on Deck ${deck}`);
  });
  wave.on('error', e => {
    console.error(`Error on Deck ${deck}:`, e);
  });
}

function togglePlay(deck) {
  const wave = deck === 'A' ? waveA : waveB;
  wave.playPause();
}

function toggleLoop(deck) {
  loopEnabled[deck] = !loopEnabled[deck];
}

function setCue(deck) {
  const wave = deck === 'A' ? waveA : waveB;
  cuePoints[deck] = wave.getCurrentTime();
}

function handleDrop(event, deck) {
  event.preventDefault();
  const url = event.dataTransfer.getData('url');
  const title = event.dataTransfer.getData('title');
  const bpm = event.dataTransfer.getData('bpm');
  loadTrack(deck, url, title, bpm);
}

// Drag functionality
const tracks = document.querySelectorAll('#trackList li');
tracks.forEach(track => {
  track.addEventListener('dragstart', e => {
    e.dataTransfer.setData('url', track.dataset.url);
    e.dataTransfer.setData('title', track.textContent);
    e.dataTransfer.setData('bpm', track.dataset.bpm);
  });
});

// File Upload Handler
document.getElementById('fileInput').addEventListener('change', (e) => {
  const list = document.getElementById('trackList');
  for (let file of e.target.files) {
    const url = URL.createObjectURL(file);
    const li = document.createElement('li');
    li.textContent = file.name;
    li.dataset.url = url;
    li.dataset.bpm = '--';
    li.dataset.genre = 'Uploaded';
    li.draggable = true;

    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('url', url);
      e.dataTransfer.setData('title', file.name);
      e.dataTransfer.setData('bpm', '--');
    });
    list.appendChild(li);
  }
});

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function () {
  const term = this.value.toLowerCase();
  document.querySelectorAll('#trackList li').forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

function filterGenre(genre) {
  document.querySelectorAll('#trackList li').forEach(li => {
    const match = li.dataset.genre === genre || genre === 'All';
    li.style.display = match ? '' : 'none';
  });
}

// Volume controls
document.getElementById('volumeA').addEventListener('input', (e) => {
  waveA.setVolume(e.target.value);
});
document.getElementById('volumeB').addEventListener('input', (e) => {
  waveB.setVolume(e.target.value);
});

// Pitch control
document.getElementById('pitchA').addEventListener('input', e => {
  waveA.setPlaybackRate(parseFloat(e.target.value));
});
document.getElementById('pitchB').addEventListener('input', e => {
  waveB.setPlaybackRate(parseFloat(e.target.value));
});

// Loop logic (basic demo)
function loopCheck() {
  ['A', 'B'].forEach(deck => {
    const wave = deck === 'A' ? waveA : waveB;
    if (loopEnabled[deck] && wave.isPlaying() && wave.getCurrentTime() >= wave.getDuration()) {
      wave.play(cuePoints[deck]);
    }
  });
  requestAnimationFrame(loopCheck);
}
loopCheck();
