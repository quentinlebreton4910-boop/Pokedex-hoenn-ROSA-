/* =========================================================
   FOND POKÉDEX HOENN
   ========================================================= */

const pokemonBackground =
  document.getElementById("pokemonBackground");


/* =========================================================
   POKÉMON DE HOENN
   ========================================================= */

const hoennPokemon = [];


for (let id = 252; id <= 386; id++) {

  hoennPokemon.push({
    id: id,
    mega: false,
    unique: `normal-${id}`
  });

}


/* =========================================================
   MÉGA-ÉVOLUTIONS DE HOENN
   ========================================================= */

const megaHoenn = [

  254, // Méga-Jungko
  257, // Méga-Braségali
  260, // Méga-Laggron
  282, // Méga-Gardevoir
  302, // Méga-Ténéfix
  306, // Méga-Galeking
  308, // Méga-Charmina
  310, // Méga-Élecsprint
  319, // Méga-Sharpedo
  323, // Méga-Camérupt
  334, // Méga-Altaria
  354, // Méga-Banette
  359, // Méga-Absol
  362, // Méga-Oniglali
  373, // Méga-Drattak
  376, // Méga-Métalosse
  380, // Méga-Latias
  381  // Méga-Latios

];


megaHoenn.forEach(id => {

  hoennPokemon.push({

    id: id,

    mega: true,

    unique: `mega-${id}`

  });

});


/* =========================================================
   MÉLANGE
   ========================================================= */

function shuffle(array) {

  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];

  }

  return copy;

}


/* =========================================================
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground() {

  if (!pokemonBackground) return;

  pokemonBackground.innerHTML = "";


  const pool =
    shuffle(hoennPokemon);


  /*
   * On affiche moins de Pokémon
   * sur téléphone pour éviter de
   * surcharger l'écran.
   */

  const amount =
    window.innerWidth <= 600
      ? 28
      : 50;


  const selected =
    pool.slice(0, amount);


  const positions = [];


  selected.forEach(pokemon => {

    let x;
    let y;

    let valid = false;

    let tries = 0;


    /* =====================================================
       POSITION SANS CHEVAUCHEMENT
       ===================================================== */

    while (
      !valid &&
      tries < 500
    ) {

      x =
        4 +
        Math.random() * 92;

      y =
        4 +
        Math.random() * 92;


      valid =
        positions.every(position => {

          const dx =
            position.x - x;

          const dy =
            position.y - y;


          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          return distance > 11;

        });


      tries++;

    }


    if (!valid) return;


    positions.push({
      x,
      y
    });


    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    img.draggable = false;


    /* =====================================================
       SHINY
       ===================================================== */

    const shiny =
      Math.random() < 0.12;


    /* =====================================================
       SPRITE
       ===================================================== */

    if (pokemon.mega) {

      /*
       * IMPORTANT :
       *
       * Les Méga sont dans :
       *
       * other/home/mega/
       *
       * et non :
       *
       * other/home/xxx-mega.png
       */

      img.src =
        shiny
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/mega/${pokemon.id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/mega/${pokemon.id}.png`;


      /*
       * Il n'existe pas forcément
       * de sprite shiny Mega dans
       * cette source.
       *
       * On ne remplace surtout PAS
       * par le Pokémon normal.
       */

      img.onerror = () => {

        img.style.display =
          "none";

      };

    } else {

      img.src =
        shiny
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;


      img.onerror = () => {

        img.style.display =
          "none";

      };

    }


    /* =====================================================
       POSITION
       ===================================================== */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /* =====================================================
       TAILLE
       ===================================================== */

    const size =
      45 +
      Math.random() * 30;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /* =====================================================
       ANIMATION
       ===================================================== */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 7}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    pokemonBackground.appendChild(img);

  });

}


/* =========================================================
   LANCEMENT
   ========================================================= */

createPokemonBackground();


/* =========================================================
   RETOUR ACCUEIL
   ========================================================= */

const backHome =
  document.getElementById("backHome");


if (backHome) {

  backHome.addEventListener(
    "click",
    () => {

      if (
        typeof playButtonSound ===
        "function"
      ) {

        playButtonSound();

      }


      setTimeout(() => {

        window.location.href =
          "../../";

      }, 120);

    }
  );

}


/* =========================================================
   BOUTONS POKÉDEX
   ========================================================= */

document
  .querySelectorAll(".choice-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const link =
          button.dataset.link;


        if (!link) return;


        if (
          typeof playButtonSound ===
          "function"
        ) {

          playButtonSound();

        }


        setTimeout(() => {

          window.location.href =
            link;

        }, 120);

      }
    );

  });
