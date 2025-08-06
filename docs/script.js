// script.js

const wavesurferA = WaveSurfer.create({
  container: '#waveformA',
  waveColor: '#999',
  progressColor: '#0f0',
});
const wavesurferB = WaveSurfer.create({
  container: '#waveformB',
  waveColor: '#999',
  progressColor: '#0ff',
});

const deckState = {
  A: { wave: wavesurferA, loop: false, cueTime: 0 },
  B: { wave: wavesurferB, loop: false, cueTime: 0 }
};

function handleDrop(e, deckId) {
  e.preventDefault();
  const url = e.dataTransfer.getData('text') || e.target.dataset.url;
  const track = e.target.closest('li');
  const bpm = track?.dataset.bpm;
  const deck = deckState[deckId];

  deck.wave.load(url);
  if (bpm) document.getElementById(`bpm${deckId}`).textContent = bpm;
}

function togglePlay(deckId) {
  const wave = deckState[deckId].wave;
  wave.playPause();
}

function toggleLoop(deckId) {
  const deck = deckState[deckId];
  deck.loop = !deck.loop;
  if (deck.loop) {
    deck.wave.on('finish', () => deck.wave.play(deck.cueTime));
  } else {
    deck.wave.un('finish');
  }
}

function setCue(deckId) {
  const wave = deckState[deckId].wave;
  deckState[deckId].cueTime = wave.getCurrentTime();
}

document.getElementById('volumeA').addEventListener('input', e => {
  deckState.A.wave.setVolume(e.target.value);
});
document.getElementById('volumeB').addEventListener('input', e => {
  deckState.B.wave.setVolume(e.target.value);
});

document.getElementById('pitchA').addEventListener('input', e => {
  deckState.A.wave.setPlaybackRate(e.target.value);
});
document.getElementById('pitchB').addEventListener('input', e => {
  deckState.B.wave.setPlaybackRate(e.target.value);
});

function updateEQ(deckId) {
  const bass = document.getElementById(`bass${deckId}`).value;
  const mid = document.getElementById(`mid${deckId}`).value;
  const treble = document.getElementById(`treble${deckId}`).value;
  // EQ logic placeholder — Web Audio API filtering would go here
  console.log(`EQ for ${deckId} - Bass: ${bass}, Mid: ${mid}, Treble: ${treble}`);
}

['A', 'B'].forEach(id => {
  ['bass', 'mid', 'treble'].forEach(band => {
    document.getElementById(`${band}${id}`).addEventListener('input', () => updateEQ(id));
  });
});

// Drag and drop trackList
const trackItems = document.querySelectorAll('#trackList li');
trackItems.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text', item.dataset.url);
  });
});
