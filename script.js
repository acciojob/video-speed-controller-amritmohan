const video = document.querySelector('.viewer');
  const toggle = document.querySelector('.toggle');
  const volume = document.querySelector('.volume');
  const rewind = document.querySelector('.rewind');
  const forward = document.querySelector('.forward');
  const speed = document.querySelector('.speed');
  const speedBar = document.querySelector('.speed-bar');
  const inputs = document.querySelectorAll('.controls input');

  function togglePlay() {
    if (video.paused) {
      video.play();
      toggle.textContent = '❚ ❚';
    } else {
      video.pause();
      toggle.textContent = '►';
    }
  }

  function updateVolume() {
    video.volume = volume.value;
  }

  function skip(seconds) {
    video.currentTime += seconds;
  }

  function handleSpeedChange(e) {
    const percent = e.offsetY / speed.offsetHeight;
    const min = 0.5;
    const max = 2;
    const playbackRate = percent * (max - min) + min;
    video.playbackRate = playbackRate;
    speedBar.style.height = `${percent * 100}%`;
    speedBar.textContent = `${playbackRate.toFixed(1)}×`;
  }

  function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }

  toggle.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  volume.addEventListener('input', updateVolume);
  rewind.addEventListener('click', () => skip(-10));
  forward.addEventListener('click', () => skip(25));
  speed.addEventListener('mousemove', handleSpeedChange);
  inputs.forEach(input => input.addEventListener('change', handleUpdate));
  inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));