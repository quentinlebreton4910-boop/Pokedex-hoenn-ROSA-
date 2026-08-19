/* =========================================================
   MUSIQUE + SONS
   ========================================================= */

let audioContext = null;
let musicGain = null;

let musicStarted = false;
let musicMuted = false;

let musicTimer = null;


/* =========================================================
   INITIALISATION AUDIO
   ========================================================= */

function initAudio() {

  if (audioContext) return;


  audioContext =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();


  musicGain =
    audioContext.createGain();


  musicGain.gain.value =
    0.08;


  musicGain.connect(
    audioContext.destination
  );

}


/* =========================================================
   DÉMARRAGE AUDIO
   ========================================================= */

function unlockAudio() {

  initAudio();


  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext.resume();

  }

}


/* =========================================================
   MUSIQUE
   ========================================================= */

function startMusic() {

  unlockAudio();


  if (musicStarted) return;

  musicStarted = true;


  const notes = [

    261.63,
    329.63,
    392.00,
    329.63,

    293.66,
    349.23,
    440.00,
    349.23

  ];


  let index = 0;


  function playNextNote() {

    if (!musicStarted) return;


    const oscillator =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.value =
      notes[index];


    const now =
      audioContext.currentTime;


    gain.gain.setValueAtTime(
      0,
      now
    );


    gain.gain.linearRampToValueAtTime(
      musicMuted
        ? 0
        : 0.035,
      now + 0.12
    );


    gain.gain.linearRampToValueAtTime(
      0,
      now + 1.3
    );


    oscillator.connect(gain);

    gain.connect(musicGain);


    oscillator.start(now);

    oscillator.stop(
      now + 1.35
    );


    index =
      (index + 1) %
      notes.length;


    musicTimer =
      setTimeout(
        playNextNote,
        950
      );

  }


  playNextNote();

}


/* =========================================================
   SON DE BOUTON
   ========================================================= */

function playButtonSound() {

  unlockAudio();


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  const now =
    audioContext.currentTime;


  oscillator.frequency.setValueAtTime(
    500,
    now
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    760,
    now + 0.08
  );


  gain.gain.setValueAtTime(
    0.055,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    0.001,
    now + 0.12
  );


  oscillator.connect(gain);

  gain.connect(
    audioContext.destination
  );


  oscillator.start(now);

  oscillator.stop(
    now + 0.13
  );

}


/* =========================================================
   VOLUME
   ========================================================= */

function setupVolumeControl() {

  const slider =
    document.getElementById(
      "volumeSlider"
    );


  const toggle =
    document.getElementById(
      "musicToggle"
    );


  if (!slider || !toggle) return;


  const saved =
    localStorage.getItem(
      "pokedexVolume"
    );


  if (saved !== null) {

    slider.value =
      saved;

  }


  function updateVolume() {

    unlockAudio();


    const value =
      Number(slider.value);


    musicGain.gain.value =
      musicMuted
        ? 0
        : value * 0.23;


    localStorage.setItem(
      "pokedexVolume",
      value
    );

  }


  slider.addEventListener(
    "input",
    updateVolume
  );


  toggle.addEventListener(
    "click",
    event => {

      event.stopPropagation();


      unlockAudio();


      musicMuted =
        !musicMuted;


      toggle.textContent =
        musicMuted
          ? "🔇"
          : "🔊";


      updateVolume();


      if (!musicMuted) {

        startMusic();

      }

    }
  );


  /*
   * Le navigateur autorise l'audio
   * après une vraie interaction.
   *
   * On écoute plusieurs types
   * d'interaction pour éviter que
   * le son ne reste bloqué.
   */

  const startAfterInteraction =
    () => {

      unlockAudio();

      startMusic();

      document.removeEventListener(
        "pointerdown",
        startAfterInteraction
      );

      document.removeEventListener(
        "touchstart",
        startAfterInteraction
      );

      document.removeEventListener(
        "keydown",
        startAfterInteraction
      );

    };


  document.addEventListener(
    "pointerdown",
    startAfterInteraction,
    {
      once: true
    }
  );


  document.addEventListener(
    "touchstart",
    startAfterInteraction,
    {
      once: true
    }
  );


  document.addEventListener(
    "keydown",
    startAfterInteraction,
    {
      once: true
    }
  );


  updateVolume();

}


document.addEventListener(
  "DOMContentLoaded",
  setupVolumeControl
);
