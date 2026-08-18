/* =========================================================
   MUSIQUE + SONS DU POKÉDEX
   Aucun fichier audio nécessaire
   ========================================================= */

(function () {

  let audioContext = null;

  let masterGain = null;

  let musicGain = null;

  let soundGain = null;

  let musicStarted = false;

  let musicTimer = null;

  let currentNote = 0;


  /* =======================================================
     NOTES
     ======================================================= */

  const notes = [

    261.63, // C4
    329.63, // E4
    392.00, // G4
    523.25, // C5

    392.00,
    329.63,
    293.66,
    392.00

  ];


  /* =======================================================
     INITIALISATION AUDIO
     ======================================================= */

  function initAudio() {

    if (audioContext) {

      if (
        audioContext.state ===
        "suspended"
      ) {

        audioContext.resume();

      }

      return;

    }


    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    masterGain =
      audioContext.createGain();

    musicGain =
      audioContext.createGain();

    soundGain =
      audioContext.createGain();


    masterGain.gain.value =
      0.55;

    musicGain.gain.value =
      0.035;

    soundGain.gain.value =
      0.20;


    musicGain.connect(
      masterGain
    );

    soundGain.connect(
      masterGain
    );

    masterGain.connect(
      audioContext.destination
    );


    createVolumeControl();

  }


  /* =======================================================
     MUSIQUE
     ======================================================= */

  function playMusicNote() {

    if (!audioContext) return;

    if (!musicStarted) return;


    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.value =
      notes[currentNote];


    gain.gain.setValueAtTime(
      0,
      audioContext.currentTime
    );


    gain.gain.linearRampToValueAtTime(
      0.8,
      audioContext.currentTime + 0.08
    );


    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 1.4
    );


    oscillator.connect(gain);

    gain.connect(musicGain);


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 1.5
    );


    currentNote++;

    if (
      currentNote >=
      notes.length
    ) {

      currentNote = 0;

    }

  }


  /* =======================================================
     DÉMARRER MUSIQUE
     ======================================================= */

  function startMusic() {

    initAudio();


    if (musicStarted) return;


    musicStarted = true;


    playMusicNote();


    musicTimer =
      setInterval(
        playMusicNote,
        1500
      );

  }


  /* =======================================================
     ARRÊTER MUSIQUE
     ======================================================= */

  function stopMusic() {

    musicStarted = false;


    if (musicTimer) {

      clearInterval(
        musicTimer
      );

      musicTimer = null;

    }

  }


  /* =======================================================
     SON DE CLIC
     ======================================================= */

  function clickSound() {

    initAudio();


    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();


    oscillator.type =
      "triangle";


    oscillator.frequency.setValueAtTime(
      520,
      audioContext.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
      850,
      audioContext.currentTime + 0.08
    );


    gain.gain.setValueAtTime(
      0.001,
      audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.7,
      audioContext.currentTime + 0.015
    );


    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.12
    );


    oscillator.connect(gain);

    gain.connect(soundGain);


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.13
    );

  }


  /* =======================================================
     SON DE TRANSITION
     ======================================================= */

  function transitionSound() {

    initAudio();


    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.setValueAtTime(
      300,
      audioContext.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
      900,
      audioContext.currentTime + 0.25
    );


    gain.gain.setValueAtTime(
      0.001,
      audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.4,
      audioContext.currentTime + 0.04
    );


    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.3
    );


    oscillator.connect(gain);

    gain.connect(soundGain);


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.31
    );

  }


  /* =======================================================
     CONTRÔLE DU VOLUME
     ======================================================= */

  function createVolumeControl() {

    if (
      document.getElementById(
        "musicControl"
      )
    ) {

      return;

    }


    const control =
      document.createElement("div");


    control.id =
      "musicControl";


    control.innerHTML = `

      <button
        id="musicButton"
        aria-label="Musique"
      >
        🔊
      </button>

      <input
        id="volumeSlider"
        type="range"
        min="0"
        max="100"
        value="55"
      >

    `;


    document.body.appendChild(
      control
    );


    const button =
      document.getElementById(
        "musicButton"
      );


    const slider =
      document.getElementById(
        "volumeSlider"
      );


    button.addEventListener(
      "click",
      () => {

        initAudio();


        if (musicStarted) {

          stopMusic();

          button.textContent =
            "🔇";

        }

        else {

          startMusic();

          button.textContent =
            "🔊";

        }

      }
    );


    slider.addEventListener(
      "input",
      () => {

        initAudio();


        const volume =
          Number(slider.value) /
          100;


        masterGain.gain.value =
          volume;


        if (volume === 0) {

          button.textContent =
            "🔇";

        }

        else if (!musicStarted) {

          button.textContent =
            "🔈";

        }

        else {

          button.textContent =
            "🔊";

        }

      }
    );

  }


  /* =======================================================
     DÉMARRAGE AU PREMIER CLIC
     ======================================================= */

  document.addEventListener(
    "click",
    function firstClick() {

      initAudio();

      startMusic();

      document.removeEventListener(
        "click",
        firstClick
      );

    },
    {
      once: true
    }
  );


  /* =======================================================
     API PUBLIQUE
     ======================================================= */

  window.pokedexSound = {

    startMusic,

    stopMusic,

    click: clickSound,

    transition: transitionSound

  };


})();
