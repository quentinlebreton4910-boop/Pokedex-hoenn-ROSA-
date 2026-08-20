/* =========================================================
   FOND HOENN
   Pokémon de Hoenn
   + Méga-Évolutions
   + Primo-Résurgences
   + Méga-Rayquaza
   + Formes de Deoxys
   + Shiny
   ========================================================= */


/* =========================================================
   URL DES SPRITES
   ========================================================= */

const POKEAPI =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const SHOWDOWN =
  "https://play.pokemonshowdown.com/sprites";


/* =========================================================
   CONTENEUR DU FOND
   ========================================================= */

let hoennBackground =
  document.getElementById("pokemonBackground");

if (!hoennBackground) {

  hoennBackground =
    document.createElement("div");

  hoennBackground.id =
    "pokemonBackground";

  hoennBackground.className =
    "background-pokemon";

  document.body.prepend(
    hoennBackground
  );

}


/* =========================================================
   135 POKÉMON DE HOENN
   252 → 386
   ========================================================= */

const hoennPokemon =
  Array.from(
    { length: 135 },
    (_, i) => {

      const id = i + 252;

      return {

        speciesId: id,

        name: `Pokémon ${id}`,

        normal:
          `${POKEAPI}/other/home/${id}.png`,

        shiny:
          `${POKEAPI}/other/home/shiny/${id}.png`,

        mega: false

      };

    }
  );


/* =========================================================
   MÉGA-ÉVOLUTIONS DE HOENN
   ========================================================= */

const hoennMega = [

  {
    speciesId: 254,
    name: "Méga-Jungko",
    normal:
      `${SHOWDOWN}/gen7/mega-sceptile.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-sceptile-shiny.png`,
    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",
    normal:
      `${SHOWDOWN}/gen7/mega-blaziken.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-blaziken-shiny.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal:
      `${SHOWDOWN}/gen7/mega-swampert.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-swampert-shiny.png`,
    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",
    normal:
      `${SHOWDOWN}/gen7/mega-gardevoir.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-gardevoir-shiny.png`,
    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",
    normal:
      `${SHOWDOWN}/gen7/mega-sableye.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-sableye-shiny.png`,
    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Mysdibule",
    normal:
      `${SHOWDOWN}/gen7/mega-mawile.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-mawile-shiny.png`,
    mega: true
  },

  {
    speciesId: 306,
    name: "Méga-Galeking",
    normal:
      `${SHOWDOWN}/gen7/mega-aggron.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-aggron-shiny.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal:
      `${SHOWDOWN}/gen7/mega-medicham.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-medicham-shiny.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal:
      `${SHOWDOWN}/gen7/mega-manectric.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-manectric-shiny.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal:
      `${SHOWDOWN}/gen7/mega-sharpedo.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-sharpedo-shiny.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal:
      `${SHOWDOWN}/gen7/mega-camerupt.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-camerupt-shiny.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal:
      `${SHOWDOWN}/gen7/mega-altaria.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-altaria-shiny.png`,
    mega: true
  },

  {
    speciesId: 354,
    name: "Méga-Branette",
    normal:
      `${SHOWDOWN}/gen7/mega-banette.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-banette-shiny.png`,
    mega: true
  },

  {
    speciesId: 359,
    name: "Méga-Absol",
    normal:
      `${SHOWDOWN}/gen7/mega-absol.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-absol-shiny.png`,
    mega: true
  },

  {
    speciesId: 362,
    name: "Méga-Oniglali",
    normal:
      `${SHOWDOWN}/gen7/mega-glalie.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-glalie-shiny.png`,
    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",
    normal:
      `${SHOWDOWN}/gen7/mega-salamence.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-salamence-shiny.png`,
    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",
    normal:
      `${SHOWDOWN}/gen7/mega-metagross.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-metagross-shiny.png`,
    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",
    normal:
      `${SHOWDOWN}/gen7/mega-latias.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-latias-shiny.png`,
    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",
    normal:
      `${SHOWDOWN}/gen7/mega-latios.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-latios-shiny.png`,
    mega: true
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",
    normal:
      `${SHOWDOWN}/gen7/mega-rayquaza.png`,
    shiny:
      `${SHOWDOWN}/gen7/mega-rayquaza-shiny.png`,
    mega: true
  }

];


/* =========================================================
   PRIMO-RÉSURGENCES
   ========================================================= */

const hoennPrimal = [

  {
    speciesId: 382,
    name: "Primo-Kyogre",
    normal:
      `${SHOWDOWN}/gen7/primal-kyogre.png`,
    shiny:
      `${SHOWDOWN}/gen7/primal-kyogre-shiny.png`,
    mega: true
  },

  {
    speciesId: 383,
    name: "Primo-Groudon",
    normal:
      `${SHOWDOWN}/gen7/primal-groudon.png`,
    shiny:
      `${SHOWDOWN}/gen7/primal-groudon-shiny.png`,
    mega: true
  }

];


/* =========================================================
   FORMES DE DEOXYS
   ========================================================= */

const deoxysForms = [

  {
    speciesId: 386,
    name: "Deoxys",
    normal:
      `${POKEAPI}/other/home/386.png`,
    shiny:
      `${POKEAPI}/other/home/shiny/386.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Attaque",
    normal:
      `${SHOWDOWN}/gen7/deoxys-attack.png`,
    shiny:
      `${SHOWDOWN}/gen7/deoxys-attack-shiny.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Défense",
    normal:
      `${SHOWDOWN}/gen7/deoxys-defense.png`,
    shiny:
      `${SHOWDOWN}/gen7/deoxys-defense-shiny.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Vitesse",
    normal:
      `${SHOWDOWN}/gen7/deoxys-speed.png`,
    shiny:
      `${SHOWDOWN}/gen7/deoxys-speed-shiny.png`,
    mega: false
  }

];


/* =========================================================
   POOL COMPLET
   ========================================================= */

const hoennPool = [

  ...hoennPokemon,

  ...hoennMega,

  ...hoennPrimal,

  ...deoxysForms

];


/* =========================================================
   MÉLANGE ALÉATOIRE
   ========================================================= */

function shuffleHoenn(array) {

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

function createHoennBackground() {

  hoennBackground.innerHTML = "";


  const pool =
    shuffleHoenn(
      hoennPool
    );


  /*
   * Nombre de Pokémon
   */

  const amount =
    window.innerWidth <= 600
      ? 32
      : 55;


  /*
   * Positions déjà utilisées
   */

  const positions = [];


  /*
   * Tirage
   */

  for (
    const pokemon of pool
  ) {


    if (
      positions.length >= amount
    ) {

      break;

    }


    let x;
    let y;

    let valid = false;

    let tries = 0;


    /*
     * Recherche d'une position
     * qui ne touche pas les autres.
     */

    while (
      !valid &&
      tries < 500
    ) {

      x =
        5 +
        Math.random() * 90;

      y =
        5 +
        Math.random() * 90;


      valid =
        positions.every(
          position => {

            const dx =
              position.x - x;

            const dy =
              position.y - y;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            return distance > 12;

          }
        );


      tries++;

    }


    if (!valid) {

      continue;

    }


    positions.push({
      x,
      y
    });


    /* =================================================
       IMAGE
       ================================================= */

    const img =
      document.createElement(
        "img"
      );


    img.className =
      "bg-pokemon";


    /*
     * Classe spéciale
     */

    if (pokemon.mega) {

      img.classList.add(
        "mega-pokemon"
      );

    }


    img.draggable =
      false;


    img.alt =
      pokemon.name;


    /* =================================================
       SHINY
       ================================================= */

    const isShiny =
      Math.random() < 0.12;


    img.src =
      isShiny
        ? pokemon.shiny
        : pokemon.normal;


    /* =================================================
       ERREUR DE CHARGEMENT
       ================================================= */

    let fallbackUsed =
      false;


    img.onerror = () => {


      /*
       * IMPORTANT :
       * une Méga ne doit JAMAIS
       * être remplacée par son
       * Pokémon normal.
       */

      if (pokemon.mega) {

        img.remove();

        return;

      }


      /*
       * Pour les Pokémon normaux,
       * on utilise le sprite PokeAPI
       * classique en secours.
       */

      if (!fallbackUsed) {

        fallbackUsed = true;

        img.src =
          isShiny
            ? `${POKEAPI}/shiny/${pokemon.speciesId}.png`
            : `${POKEAPI}/${pokemon.speciesId}.png`;

        return;

      }


      img.remove();

    };


    /* =================================================
       POSITION
       ================================================= */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /* =================================================
       TAILLE
       ================================================= */

    const size =
      50 +
      Math.random() * 30;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /* =================================================
       ROTATION
       ================================================= */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    /* =================================================
       ANIMATION
       ================================================= */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 8}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    /*
     * Ajout au fond
     */

    hoennBackground.appendChild(
      img
    );

  }

}


/* =========================================================
   LANCEMENT
   ========================================================= */

createHoennBackground();


/* =========================================================
   SONS DES BOUTONS
   ========================================================= */

document
  .querySelectorAll("button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        if (
          window.pokedexSound &&
          typeof window.pokedexSound.click ===
          "function"
        ) {

          window.pokedexSound.click();

        }

      }
    );

  });
