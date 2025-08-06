let waveA = WaveSurfer.create({
  container: '#waveformA',
  waveColor: '#ddd',
  progressColor: '#f44336',
  height: 80
});

let waveB = WaveSurfer.create({
  container: '#waveformB',
  waveColor: '#ddd',
  progressColor: '#2196f3',
  height: 80
});

let isLoopingA = false;
let isLoopingB = false;
let cueA = 0;
let cueB = 0;

// Load track to the correct deck
function loadTrack(deck, url, label) {
  const wave = deck === 'A' ? waveA : waveB;
  const volumeSlider = document.getElementById(`volume${deck}`);
  const pitchSlider = document.getElementById(`pitch${deck}`);
  const bpmDisplay = document.getElementById(`bpm${deck}`);
  const nowPlaying = document.getElementById(`nowPlaying${deck}`);

  wave.load(url);
  wave.setVolume(volumeSlider.value);
  wave.setPlaybackRate(pitchSlider.value);
  nowPlaying.textContent = `🎧 Now playing: ${label}`;
  bpmDisplay.textContent = '--';
}

// Toggle play/pause
function togglePlay(deck) {
  const wave = deck === 'A' ? waveA : waveB;
  wave.playPause();
}

// Toggle loop
function toggleLoop(deck) {
  const wave = deck === 'A' ? waveA : waveB;
  const isLooping = deck === 'A' ? isLoopingA : isLoopingB;

  if (!isLooping) {
    const cue = deck === 'A' ? cueA : cueB;
    const loopEnd = cue + 5; // loop 5 seconds
    wave.play(cue, loopEnd);
    if (deck === 'A') isLoopingA = true;
    else isLoopingB = true;
  } else {
    wave.playPause();
    if (deck === 'A') isLoopingA = false;
    else isLoopingB = false;
  }
}

// Set cue point
function setCue(deck) {
  const wave = deck === 'A' ? waveA : waveB;
  const currentTime = wave.getCurrentTime();
  if (deck === 'A') cueA = currentTime;
  else cueB = currentTime;
  alert(`🎯 Cue set at ${currentTime.toFixed(2)}s for Deck ${deck}`);
}

// Handle drag-and-drop
function handleDrop(event, deck) {
  event.preventDefault();
  const url = event.dataTransfer.getData("text/plain");
  const label = event.dataTransfer.getData("text/label");
  if (url && label) {
    loadTrack(deck, url, label);
  }
}

// Genre filter
function filterGenre(genre) {
  document.querySelectorAll('#trackList li').forEach(li => {
    const match = li.dataset.genre === genre || genre === 'All';
    li.style.display = match ? '' : 'none';
  });
}

// Search bar
document.getElementById('searchInput').addEventListener('input', function () {
  const term = this.value.toLowerCase();
  document.querySelectorAll('#trackList li').forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

// File upload (adds to trackList)
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function () {
  [...this.files].forEach(file => {
    const url = URL.createObjectURL(file);
    const name = file.name.replace(/\.[^/.]+$/, "");
    const li = document.createElement('li');

    li.textContent = `${name} (User Track)`;
    li.setAttribute('draggable', 'true');
    li.dataset.url = url;
    li.dataset.genre = 'User';
    li.dataset.bpm = '--';

    li.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData("text/plain", this.dataset.url);
      e.dataTransfer.setData("text/label", this.textContent);
    });

    document.getElementById('trackList').appendChild(li);
  });
});

// Volume & pitch controls
document.getElementById('volumeA').addEventListener('input', e => waveA.setVolume(e.target.value));
document.getElementById('volumeB').addEventListener('input', e => waveB.setVolume(e.target.value));
document.getElementById('pitchA').addEventListener('input', e => waveA.setPlaybackRate(e.target.value));
document.getElementById('pitchB').addEventListener('input', e => waveB.setPlaybackRate(e.target.value));

// Allow drag from static list
document.querySelectorAll('#trackList li').forEach(li => {
  li.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData("text/plain", this.dataset.url);
    e.dataTransfer.setData("text/label", this.textContent);
  });
});
