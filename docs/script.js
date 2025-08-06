const audioA = document.getElementById('audioA');
const audioB = document.getElementById('audioB');
const volumeA = document.getElementById('volumeA');
const volumeB = document.getElementById('volumeB');
const speedA = document.getElementById('speedA');
const speedB = document.getElementById('speedB');
const crossfader = document.getElementById('crossfader');

// Set initial volumes
audioA.volume = 0.5;
audioB.volume = 0.5;

// Toggle play/pause
function togglePlay(deck) {
  const audio = deck === 'A' ? audioA : audioB;
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Load track from file input
function loadTrack(event, deck) {
  const file = event.target.files[0];
  const audio = deck === 'A' ? audioA : audioB;
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.load();
  }
}

// Volume and speed controls
volumeA.addEventListener('input', () => {
  audioA.volume = volumeA.value * (1 - crossfader.value);
});
volumeB.addEventListener('input', () => {
  audioB.volume = volumeB.value * crossfader.value;
});

speedA.addEventListener('input', () => {
  audioA.playbackRate = speedA.value;
});
speedB.addEventListener('input', () => {
  audioB.playbackRate = speedB.value;
});

// Crossfader logic
crossfader.addEventListener('input', () => {
  audioA.volume = volumeA.value * (1 - crossfader.value);
  audioB.volume = volumeB.value * crossfader.value;
});
