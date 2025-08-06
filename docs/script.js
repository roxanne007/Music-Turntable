let waveA, waveB;
let cueA = 0, cueB = 0;
let loopA = false, loopB = false;

document.addEventListener('DOMContentLoaded', () => {
  waveA = WaveSurfer.create({ container: '#waveformA', waveColor: '#ff4081', progressColor: '#ffc107' });
  waveB = WaveSurfer.create({ container: '#waveformB', waveColor: '#00e5ff', progressColor: '#ff4081' });

  waveA.on('finish', () => { if (loopA) waveA.play(cueA); });
  waveB.on('finish', () => { if (loopB) waveB.play(cueB); });

  document.querySelectorAll('#trackList li').forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.url);
      e.dataTransfer.setData('bpm', item.dataset.bpm);
    });
  });

  document.getElementById('searchInput').addEventListener('input', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('#trackList li').forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(val) ? '' : 'none';
    });
  });
});

function handleDrop(e, deck) {
  e.preventDefault();
  const url = e.dataTransfer.getData('text/plain');
  const bpm = e.dataTransfer.getData('bpm');
  if (deck === 'A') {
    waveA.load(url);
    document.getElementById('bpmA').innerText = bpm;
  } else {
    waveB.load(url);
    document.getElementById('bpmB').innerText = bpm;
  }
}

function togglePlay(deck) {
  if (deck === 'A') waveA.playPause();
  else waveB.playPause();
}

function toggleLoop(deck) {
  if (deck === 'A') loopA = !loopA;
  else loopB = !loopB;
}

function setCue(deck) {
  if (deck === 'A') cueA = waveA.getCurrentTime();
  else cueB = waveB.getCurrentTime();
}

document.getElementById('volumeA').addEventListener('input', e => {
  waveA.setVolume(parseFloat(e.target.value));
});

document.getElementById('volumeB').addEventListener('input', e => {
  waveB.setVolume(parseFloat(e.target.value));
});

document.getElementById('crossfader').addEventListener('input', e => {
  const value = parseFloat(e.target.value);
  waveA.setVolume(1 - value);
  waveB.setVolume(value);
});
