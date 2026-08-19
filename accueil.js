const pokemonBackground = document.getElementById("pokemonBackground");

/* =========================================================
   CONFIGURATION
   ========================================================= */

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const HOME =
  `${SPRITE}/other/home`;


/* =========================================================
   POKÉMON DISPONIBLES POUR L'ACCUEIL
   ========================================================= */

const allPokemon = Array.from(
  { length: 1025 },
  (_, i) => ({
    speciesId: i + 1,

    normal:
      `${SPRITE}/${i + 1}.png`,

    shiny:
      `${SPRITE}/shiny/${i + 1}.png`,

    mega: false
  })
);


/* =========================================================
   FORMES SPÉCIALES DE HOENN
   Chaque forme possède :
   - un lien normal
   - un lien shiny
   ========================================================= */

const hoennSpecial = [

  {
    speciesId: 254,
    name: "Méga-Jungko",
    normal:
      `${SPRITE}/10065.png`,
    shiny:
      `${SPRITE}/shiny/10065.png`,
    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",
    normal:
      `${SPRITE}/10050.png`,
    shiny:
      `${SPRITE}/shiny/10050.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal:
      `${SPRITE}/10064.png`,
    shiny:
      `${SPRITE}/shiny/10064.png`,
    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",
    normal:
      `${SPRITE}/10051.png`,
    shiny:
      `${SPRITE}/shiny/10051.png`,
    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Mawile",
    normal:
      `${SPRITE}/10052.png`,
    shiny:
      `${SPRITE}/shiny/10052.png`,
    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",
    normal:
      `${SPRITE}/10066.png`,
    shiny:
      `${SPRITE}/shiny/10066.png`,
    mega: true
  },

  {
    speciesId: 306,
    name: "Méga-Galeking",
    normal:
      `${SPRITE}/10053.png`,
    shiny:
      `${SPRITE}/shiny/10053.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal:
      `${SPRITE}/10054.png`,
    shiny:
      `${SPRITE}/shiny/10054.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal:
      `${SPRITE}/10055.png`,
    shiny:
      `${SPRITE}/shiny/10055.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal:
      `${SPRITE}/10070.png`,
    shiny:
      `${SPRITE}/shiny/10070.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal:
      `${SPRITE}/10087.png`,
    shiny:
      `${SPRITE}/shiny/10087.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal:
      `${SPRITE}/10067.png`,
    shiny:
      `${SPRITE}/shiny/10067.png`,
    mega: true
  },

  {
    speciesId: 354,
    name: "Méga-Branette",
    normal:
      `${SPRITE}/10056.png`,
    shiny:
      `${SPRITE}/shiny/10056.png`,
    mega: true
  },

  {
    speciesId: 359,
    name: "Méga-Absol",
    normal:
      `${SPRITE}/10057.png`,
    shiny:
      `${SPRITE}/shiny/10057.png`,
    mega: true
  },

  {
    speciesId: 362,
    name: "Méga-Oniglali",
    normal:
      `${SPRITE}/10074.png`,
    shiny:
      `${SPRITE}/shiny/10074.png`,
    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",
    normal:
      `${SPRITE}/10089.png`,
    shiny:
      `${SPRITE}/shiny/10089.png`,
    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",
    normal:
      `${SPRITE}/10076.png`,
    shiny:
      `${SPRITE}/shiny/10076.png`,
    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",
    normal:
      `${SPRITE}/10062.png`,
    shiny:
      `${SPRITE}/shiny/10062.png`,
    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",
    normal:
      `${SPRITE}/10063.png`,
    shiny:
      `${SPRITE}/shiny/10063.png`,
    mega: true
  },

  {
    speciesId: 382,
    name: "Primo-Kyogre",
    normal:
      `${SPRITE}/10077.png`,
    shiny:
      `${SPRITE}/shiny/10077.png`,
    mega: false,
    primal: true
  },

  {
    speciesId: 383,
    name: "Primo-Groudon",
    normal:
      `${SPRITE}/10078.png`,
    shiny:
      `${SPRITE}/shiny/10078.png`,
    mega: false,
    primal: true
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",
    normal:
      `${SPRITE}/10079.png`,
    shiny:
      `${SPRITE}/shiny/10079.png`,
    mega: true
  }

];


/* =========================================================
   POKÉMON DE HOENN
   ========================================================= */

const hoennPokemon = Array.from(
  { length: 135 },
  (_, i) => ({
    speciesId: i + 252,

    normal:
      `${SPRITE}/${i + 252}.png`,

    shiny:
      `${SPRITE}/shiny/${i + 252}.png`,

    mega: false
  })
);


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
    ] =
    [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}


/* =========================================================
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground(region = "all") {

  if (!pokemonBackground) {
    return;
  }

  pokemonBackground.innerHTML = "";


  let pool;


  /* -------------------------------------------------------
     HOENN
     ------------------------------------------------------- */

  if (region === "hoenn") {

    pool = [
      ...hoennPokemon,
      ...hoennSpecial
    ];

  }


  /* -------------------------------------------------------
     ACCUEIL
     ------------------------------------------------------- */

  else {

    pool = [
      ...allPokemon,
      ...hoennSpecial
    ];

  }


  pool = shuffle(pool);


  /* -------------------------------------------------------
     NOMBRE DE POKÉMON
     ------------------------------------------------------- */

  const amount =
    window.innerWidth <= 600
      ? 38
      : 70;


  /* -------------------------------------------------------
     Évite les doublons d'espèce
     ------------------------------------------------------- */

  const selected = [];

  const usedSpecies =
    new Set();


  /*
   * On donne une petite priorité
   * aux formes spéciales.
   */

  const specials =
    shuffle(
      pool.filter(
        pokemon =>
          pokemon.mega ||
          pokemon.primal
      )
    );


  /*
   * Sur le fond Hoenn :
   * on veut voir régulièrement
   * des Méga / Primo.
   */

  const specialAmount =
    region === "hoenn"
      ? Math.min(
          8,
          specials.length
        )
      : Math.min(
          6,
          specials.length
        );


  for (
    const pokemon of specials
  ) {

    if (
      selected.length >= specialAmount
    ) {
      break;
    }


    if (
      usedSpecies.has(
        pokemon.speciesId
      )
    ) {
      continue;
    }


    selected.push(pokemon);

    usedSpecies.add(
      pokemon.speciesId
    );

  }


  /*
   * Complète avec les Pokémon normaux.
   */

  for (
    const pokemon of pool
  ) {

    if (
      selected.length >= amount
    ) {
      break;
    }


    if (
      usedSpecies.has(
        pokemon.speciesId
      )
    ) {
      continue;
    }


    selected.push(pokemon);

    usedSpecies.add(
      pokemon.speciesId
    );

  }


  /* -------------------------------------------------------
     Positions
     ------------------------------------------------------- */

  const positions = [];


  for (
    const pokemon of selected
  ) {

    let x;
    let y;

    let valid = false;

    let tries = 0;


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


            return distance > 11;

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


    /* -----------------------------------------------------
       IMAGE
       ----------------------------------------------------- */

    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    img.draggable =
      false;


    /* -----------------------------------------------------
       SHINY
       ----------------------------------------------------- */

    const isShiny =
      Math.random() < 0.12;


    /*
     * IMPORTANT :
     * Chaque Méga/Primo possède son propre
     * lien normal ET son propre lien shiny.
     */

    img.src =
      isShiny
        ? pokemon.shiny
        : pokemon.normal;


    img.alt =
      pokemon.name ||
      "";


    /* -----------------------------------------------------
       POSITION
       ----------------------------------------------------- */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /* -----------------------------------------------------
       TAILLE
       ----------------------------------------------------- */

    const size =
      45 +
      Math.random() * 35;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /* -----------------------------------------------------
       ROTATION
       ----------------------------------------------------- */

    const rotation =
      -8 +
      Math.random() * 16;


    img.style.setProperty(
      "--rotation",
      `${rotation}deg`
    );


    /* -----------------------------------------------------
       ANIMATION
       ----------------------------------------------------- */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 7}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    /* -----------------------------------------------------
       AJOUT
       ----------------------------------------------------- */

    pokemonBackground.appendChild(
      img
    );

  }

}


/* =========================================================
   FOND DE L'ACCUEIL
   ========================================================= */

createPokemonBackground("all");


/* =========================================================
   BOUTON HOENN
   ========================================================= */

document
  .querySelectorAll(".region-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const region =
          button.dataset.region;


        if (
          region === "hoenn"
        ) {

          window.location.href =
            "pokedex/hoenn/";

        }

      }
    );

  });
