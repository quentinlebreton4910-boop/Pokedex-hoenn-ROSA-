/* =========================================================
   FOND HOENN
   Pokémon Hoenn + Méga-Évolutions + Primo + Deoxys
   ========================================================= */

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";


/* =========================================================
   CONTENEUR
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
   POKÉMON DE HOENN
   252 → 386
   ========================================================= */

const hoennPokemon =
  Array.from(
    { length: 135 },
    (_, i) => {

      const id = i + 252;

      return {

        speciesId: id,

        name: `Hoenn ${id}`,

        normal:
          `${SPRITE}/other/home/${id}.png`,

        shiny:
          `${SPRITE}/other/home/shiny/${id}.png`,

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
      `${SPRITE}/other/home/10065.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10065.png`,

    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",

    normal:
      `${SPRITE}/other/home/10050.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10050.png`,

    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",

    normal:
      `${SPRITE}/other/home/10089.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10089.png`,

    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",

    normal:
      `${SPRITE}/other/home/10068.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10068.png`,

    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",

    normal:
      `${SPRITE}/other/home/10066.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10066.png`,

    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Mysdibule",

    normal:
      `${SPRITE}/other/home/10052.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10052.png`,

    mega: true
  },

  {
    speciesId: 306,
    name: "Méga-Galeking",

    normal:
      `${SPRITE}/other/home/10054.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10054.png`,

    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",

    normal:
      `${SPRITE}/other/home/10076.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10076.png`,

    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",

    normal:
      `${SPRITE}/other/home/10055.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10055.png`,

    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",

    normal:
      `${SPRITE}/other/home/10073.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10073.png`,

    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",

    normal:
      `${SPRITE}/other/home/10075.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10075.png`,

    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",

    normal:
      `${SPRITE}/other/home/10067.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10067.png`,

    mega: true
  },

  {
    speciesId: 354,
    name: "Méga-Branette",

    normal:
      `${SPRITE}/other/home/10056.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10056.png`,

    mega: true
  },

  {
    speciesId: 359,
    name: "Méga-Absol",

    normal:
      `${SPRITE}/other/home/10057.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10057.png`,

    mega: true
  },

  {
    speciesId: 362,
    name: "Méga-Oniglali",

    normal:
      `${SPRITE}/other/home/10059.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10059.png`,

    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",

    normal:
      `${SPRITE}/other/home/10089.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10089.png`,

    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",

    normal:
      `${SPRITE}/other/home/10060.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10060.png`,

    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",

    normal:
      `${SPRITE}/other/home/10062.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10062.png`,

    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",

    normal:
      `${SPRITE}/other/home/10061.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10061.png`,

    mega: true
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",

    normal:
      `${SPRITE}/other/home/10079.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10079.png`,

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
      `${SPRITE}/other/home/10077.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10077.png`,

    mega: true
  },

  {
    speciesId: 383,
    name: "Primo-Groudon",

    normal:
      `${SPRITE}/other/home/10078.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10078.png`,

    mega: true
  }

];


/* =========================================================
   DEOXYS
   ========================================================= */

const deoxysForms = [

  {
    speciesId: 386,
    name: "Deoxys Normal",

    normal:
      `${SPRITE}/other/home/386.png`,

    shiny:
      `${SPRITE}/other/home/shiny/386.png`,

    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Attaque",

    normal:
      `${SPRITE}/other/home/10001.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10001.png`,

    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Défense",

    normal:
      `${SPRITE}/other/home/10002.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10002.png`,

    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Vitesse",

    normal:
      `${SPRITE}/other/home/10003.png`,

    shiny:
      `${SPRITE}/other/home/shiny/10003.png`,

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
   MÉLANGE
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


  const amount =
    window.innerWidth <= 600
      ? 32
      : 55;


  const positions = [];


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
     * suffisamment éloignée.
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
      document.createElement("img");


    img.className =
      "bg-pokemon";


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

    const shiny =
      Math.random() < 0.12;


    img.src =
      shiny
        ? pokemon.shiny
        : pokemon.normal;


    /* =================================================
       FALLBACK
       ================================================= */

    img.onerror = () => {

      /*
       * On tente le sprite
       * classique du Pokémon
       * avant de supprimer.
       */

      const fallback =
        `${SPRITE}/${pokemon.speciesId}.png`;


      if (
        img.src !== fallback
      ) {

        img.src =
          fallback;

      }

      else {

        /*
         * Si même le fallback
         * ne fonctionne pas,
         * on retire seulement
         * cette image.
         */

        img.remove();

      }

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
          typeof window.pokedexSound.click === "function"
        ) {

          window.pokedexSound.click();

        }

      }
    );

  });
