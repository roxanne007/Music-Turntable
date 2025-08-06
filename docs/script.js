let waveA, waveB;

const vinylA = document.getElementById('vinylA');
const vinylB = document.getElementById('vinylB');
const deckA = document.getElementById('deckA');
const deckB = document.getElementById('deckB');

const volumeA = document.getElementById('volumeA');
const volumeB = document.getElementById('volumeB');
const speedA = document.getElementById('speedA');
const speedB = document.getElementById('speedB');
const crossfader = document.getElementById('crossfader');

window.addEventListener('DOMContentLoaded', () => {
  waveA = WaveSurfer.create({
    container: '#waveformA',
    waveColor: '#ff4081',
    progressColor: '#ffc107',
    height: 100,
    barWidth: 2,
    responsive: true,
  });

  waveB = WaveSurfer.create({
    container: '#waveformB',
    waveColor: '#00e5ff',
    progressColor: '#ff4081',
    height: 100,
    barWidth: 2,
    responsive: true,
  });

  waveA.setVolume(0.5);
  waveB.setVolume(0.5);
});

function togglePlay(deck) {
  if (deck === 'A') {
    waveA.playPause();
    deckA.classList.toggle('playing');
  } else {
    waveB.playPause();
    deckB.classList.toggle('playing');
  }
}

function loadTrack(event, deck) {
  const file = event.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);

  if (deck === 'A') {
    waveA.load(url);
    deckA.classList.remove('playing');
  } else {
    waveB.load(url);
    deckB.classList.remove('playing');
  }
}

volumeA.addEventListener('input', () => {
  waveA.setVolume(parseFloat(volumeA.value) * (1 - parseFloat(crossfader.value)));
});

volumeB.addEventListener('input', () => {
  waveB.setVolume(parseFloat(volumeB.value) * parseFloat(crossfader.value));
});

speedA.addEventListener('input', () => {
  waveA.setPlaybackRate(parseFloat(speedA.value));
});

speedB.addEventListener('input', () => {
  waveB.setPlaybackRate(parseFloat(speedB.value));
});

crossfader.addEventListener('input', () => {
  const cf = parseFloat(crossfader.value);
  waveA.setVolume(parseFloat(volumeA.value) * (1 - cf));
  waveB.setVolume(parseFloat(volumeB.value) * cf);
});
