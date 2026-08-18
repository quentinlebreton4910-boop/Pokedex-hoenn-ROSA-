/* =========================================================
   MUSIQUE + SONS DE L'APPLICATION
   ========================================================= */

/*
 * La musique est générée directement par le navigateur.
 * Aucun fichier MP3 n'est nécessaire.
 *
 * Cela évite les problèmes de fichiers audio manquants.
 */

let audioContext = null;

let musicGain = null;

let musicStarted = false;

let musicMuted = false;


/* =========================================================
   INITIALISATION
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
   PETITE MUSIQUE AMBIANTE
   ========================================================= */

function startMusic() {

  initAudio();


  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext.resume();

  }


  if (musicStarted) return;

  musicStarted = true;


  /*
   * Notes douces style
   * ambiance électronique.
   */

  const notes = [
    261.63,
    329.63,
    392.00,
    523.25,
    392.00,
    329.63
  ];


  let index = 0;


  function playNote() {

    if (!audioContext) return;


    const oscillator =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.value =
      notes[index];


    gain.gain.setValueAtTime(
      0,
      audioContext.currentTime
    );


    gain.gain.linearRampToValueAtTime(
      musicMuted
        ? 0
        : 0.035,
      audioContext.currentTime + 0.15
    );


    gain.gain.linearRampToValueAtTime(
      0,
      audioContext.currentTime + 1.4
    );


    oscillator.connect(gain);

    gain.connect(musicGain);


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 1.5
    );


    index =
      (index + 1) %
      notes.length;


    setTimeout(
      playNote,
      1000
    );

  }


  playNote();

}


/* =========================================================
   SON DE CLIC
   ========================================================= */

function playButtonSound() {

  initAudio();


  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext.resume();

  }


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.setValueAtTime(
    520,
    audioContext.currentTime
  );


  oscillator.frequency.exponentialRampToValueAtTime(
    760,
    audioContext.currentTime + 0.08
  );


  gain.gain.setValueAtTime(
    0.06,
    audioContext.currentTime
  );


  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.12
  );


  oscillator.connect(gain);

  gain.connect(
    audioContext.destination
  );


  oscillator.start();

  oscillator.stop(
    audioContext.currentTime + 0.12
  );

}


/* =========================================================
   CONTRÔLE DU VOLUME
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


  /*
   * Volume initial
   */

  const savedVolume =
    localStorage.getItem(
      "pokedexVolume"
    );


  if (savedVolume !== null) {

    slider.value =
      savedVolume;

  }


  function updateVolume() {

    initAudio();


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
    () => {

      initAudio();


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
   * La musique démarre après
   * le premier clic de l'utilisateur.
   */

  document.addEventListener(
    "click",
    () => {

      if (!musicStarted) {

        startMusic();

      }

    },
    {
      once: true
    }
  );


  updateVolume();

}


/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  setupVolumeControl
);
