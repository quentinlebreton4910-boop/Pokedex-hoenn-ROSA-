/* =========================================================
   POKÉDEX HOENN
   Fond Pokémon + navigation
   ========================================================= */

const pokemonBackground =
  document.getElementById("pokemonBackground");


/* =========================================================
   POKÉMON HOENN
   ========================================================= */

const hoennPokemon = [];

/*
 * 252 à 386 = Pokémon de Hoenn
 */

for (let id = 252; id <= 386; id++) {

  hoennPokemon.push({
    id: id,
    mega: false
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
  303, // Méga-Ténéfix
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
    mega: true
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
   FOND
   ========================================================= */

function createPokemonBackground() {

  if (!pokemonBackground) return;

  pokemonBackground.innerHTML = "";


  const shuffled =
    shuffle(hoennPokemon);


  /*
   * Nombre affiché
   */

  const amount =
    window.innerWidth <= 600
      ? 30
      : 55;


  const selected =
    shuffled.slice(0, amount);


  /*
   * Positions déjà utilisées
   */

  const positions = [];


  selected.forEach(pokemon => {

    let x;
    let y;

    let valid = false;

    let tries = 0;


    /*
     * Recherche d'une position
     * suffisamment éloignée
     */

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


          return distance > 10;

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


    /*
     * 12 % de chance de shiny
     */

    const shiny =
      Math.random() < 0.12;


    /* =====================================================
       SPRITE NORMAL / SHINY / MÉGA
       ===================================================== */

    if (pokemon.mega) {

      const megaNormal =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}-mega.png`;

      const megaShiny =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}-mega.png`;

      img.src =
        shiny
          ? megaShiny
          : megaNormal;


      /*
       * Si le sprite Méga n'existe pas,
       * on utilise le sprite normal.
       */

      img.onerror = () => {

        img.onerror = null;

        img.src =
          shiny
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

      };

    } else {

      img.src =
        shiny
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

    }


    img.draggable = false;


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
   GÉNÉRATION DU FOND
   ========================================================= */

createPokemonBackground();


/* =========================================================
   BOUTON ACCUEIL
   ========================================================= */

const backHome =
  document.getElementById("backHome");


if (backHome) {

  backHome.addEventListener(
    "click",
    () => {

      window.location.href =
        "../../";

    }
  );

}


/* =========================================================
   BOUTONS DES POKÉDEX
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


        /*
         * Petit délai pour permettre
         * au son de clic de jouer.
         */

        if (
          typeof playButtonSound ===
          "function"
        ) {

          playButtonSound();

        }


        setTimeout(() => {

          window.location.href =
            link;

        }, 100);

      }
    );

  });
