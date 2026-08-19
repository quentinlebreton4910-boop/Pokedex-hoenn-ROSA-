const pokemonBackground = document.getElementById("pokemonBackground");

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const HOME =
  `${SPRITE}/other/home`;

const SHINY =
  `${HOME}/shiny`;


/* =========================================================
   POKÉMON NORMAUX
   ========================================================= */

const normalPokemon = Array.from(
  { length: 1025 },
  (_, i) => ({
    speciesId: i + 1,
    name: `Pokémon ${i + 1}`,
    normal: `${SPRITE}/${i + 1}.png`,
    shiny: `${SPRITE}/shiny/${i + 1}.png`,
    mega: false
  })
);


/* =========================================================
   MÉGA-ÉVOLUTIONS
   Les IDs utilisés ici sont les IDs de FORMES PokéAPI.
   ========================================================= */

const megaPokemon = [

  /* KANTO */

  {
    speciesId: 3,
    name: "Méga-Florizarre",
    normal: `${SPRITE}/10033.png`,
    shiny: `${SPRITE}/shiny/10033.png`,
    mega: true
  },

  {
    speciesId: 6,
    name: "Méga-Dracaufeu X",
    normal: `${SPRITE}/10034.png`,
    shiny: `${SPRITE}/shiny/10034.png`,
    mega: true
  },

  {
    speciesId: 6,
    name: "Méga-Dracaufeu Y",
    normal: `${SPRITE}/10035.png`,
    shiny: `${SPRITE}/shiny/10035.png`,
    mega: true
  },

  {
    speciesId: 9,
    name: "Méga-Tortank",
    normal: `${SPRITE}/10036.png`,
    shiny: `${SPRITE}/shiny/10036.png`,
    mega: true
  },

  {
    speciesId: 15,
    name: "Méga-Dardargnan",
    normal: `${SPRITE}/10040.png`,
    shiny: `${SPRITE}/shiny/10040.png`,
    mega: true
  },

  {
    speciesId: 18,
    name: "Méga-Roucarnage",
    normal: `${SPRITE}/10073.png`,
    shiny: `${SPRITE}/shiny/10073.png`,
    mega: true
  },

  {
    speciesId: 65,
    name: "Méga-Alakazam",
    normal: `${SPRITE}/10026.png`,
    shiny: `${SPRITE}/shiny/10026.png`,
    mega: true
  },

  {
    speciesId: 80,
    name: "Méga-Flagadoss",
    normal: `${SPRITE}/10025.png`,
    shiny: `${SPRITE}/shiny/10025.png`,
    mega: true
  },

  {
    speciesId: 94,
    name: "Méga-Ectoplasma",
    normal: `${SPRITE}/10037.png`,
    shiny: `${SPRITE}/shiny/10037.png`,
    mega: true
  },

  {
    speciesId: 115,
    name: "Méga-Kangourex",
    normal: `${SPRITE}/10039.png`,
    shiny: `${SPRITE}/shiny/10039.png`,
    mega: true
  },

  {
    speciesId: 127,
    name: "Méga-Scarabrute",
    normal: `${SPRITE}/10038.png`,
    shiny: `${SPRITE}/shiny/10038.png`,
    mega: true
  },

  {
    speciesId: 130,
    name: "Méga-Léviator",
    normal: `${SPRITE}/10041.png`,
    shiny: `${SPRITE}/shiny/10041.png`,
    mega: true
  },

  {
    speciesId: 142,
    name: "Méga-Aéroptéryx",
    normal: `${SPRITE}/10042.png`,
    shiny: `${SPRITE}/shiny/10042.png`,
    mega: true
  },

  {
    speciesId: 150,
    name: "Méga-Mewtwo X",
    normal: `${SPRITE}/10043.png`,
    shiny: `${SPRITE}/shiny/10043.png`,
    mega: true
  },

  {
    speciesId: 150,
    name: "Méga-Mewtwo Y",
    normal: `${SPRITE}/10044.png`,
    shiny: `${SPRITE}/shiny/10044.png`,
    mega: true
  },


  /* JOHTO */

  {
    speciesId: 181,
    name: "Méga-Pharamp",
    normal: `${SPRITE}/10045.png`,
    shiny: `${SPRITE}/shiny/10045.png`,
    mega: true
  },

  {
    speciesId: 208,
    name: "Méga-Steelix",
    normal: `${SPRITE}/10072.png`,
    shiny: `${SPRITE}/shiny/10072.png`,
    mega: true
  },

  {
    speciesId: 212,
    name: "Méga-Cizayox",
    normal: `${SPRITE}/10046.png`,
    shiny: `${SPRITE}/shiny/10046.png`,
    mega: true
  },

  {
    speciesId: 214,
    name: "Méga-Scarhino",
    normal: `${SPRITE}/10047.png`,
    shiny: `${SPRITE}/shiny/10047.png`,
    mega: true
  },

  {
    speciesId: 229,
    name: "Méga-Démolosse",
    normal: `${SPRITE}/10048.png`,
    shiny: `${SPRITE}/shiny/10048.png`,
    mega: true
  },

  {
    speciesId: 248,
    name: "Méga-Tyranocif",
    normal: `${SPRITE}/10049.png`,
    shiny: `${SPRITE}/shiny/10049.png`,
    mega: true
  },


  /* HOENN */

  {
    speciesId: 254,
    name: "Méga-Jungko",
    normal: `${SPRITE}/10065.png`,
    shiny: `${SPRITE}/shiny/10065.png`,
    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",
    normal: `${SPRITE}/10063.png`,
    shiny: `${SPRITE}/shiny/10063.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal: `${SPRITE}/10064.png`,
    shiny: `${SPRITE}/shiny/10064.png`,
    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",
    normal: `${SPRITE}/10068.png`,
    shiny: `${SPRITE}/shiny/10068.png`,
    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",
    normal: `${SPRITE}/10053.png`,
    shiny: `${SPRITE}/shiny/10053.png`,
    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Galeking",
    normal: `${SPRITE}/10054.png`,
    shiny: `${SPRITE}/shiny/10054.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal: `${SPRITE}/10070.png`,
    shiny: `${SPRITE}/shiny/10070.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal: `${SPRITE}/10067.png`,
    shiny: `${SPRITE}/shiny/10067.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal: `${SPRITE}/10050.png`,
    shiny: `${SPRITE}/shiny/10050.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal: `${SPRITE}/10076.png`,
    shiny: `${SPRITE}/shiny/10076.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal: `${SPRITE}/10062.png`,
    shiny: `${SPRITE}/shiny/10062.png`,
    mega: true
  },

  {
    speciesId: 354,
    name: "Méga-Branette",
    normal: `${SPRITE}/10056.png`,
    shiny: `${SPRITE}/shiny/10056.png`,
    mega: true
  },

  {
    speciesId: 359,
    name: "Méga-Absol",
    normal: `${SPRITE}/10057.png`,
    shiny: `${SPRITE}/shiny/10057.png`,
    mega: true
  },

  {
    speciesId: 362,
    name: "Méga-Oniglali",
    normal: `${SPRITE}/10074.png`,
    shiny: `${SPRITE}/shiny/10074.png`,
    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",
    normal: `${SPRITE}/10065.png`,
    shiny: `${SPRITE}/shiny/10065.png`,
    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",
    normal: `${SPRITE}/10063.png`,
    shiny: `${SPRITE}/shiny/10063.png`,
    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",
    normal: `${SPRITE}/10081.png`,
    shiny: `${SPRITE}/shiny/10081.png`,
    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",
    normal: `${SPRITE}/10082.png`,
    shiny: `${SPRITE}/shiny/10082.png`,
    mega: true
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",
    normal: `${SPRITE}/10079.png`,
    shiny: `${SPRITE}/shiny/10079.png`,
    mega: true
  },


  /* SINNOH */

  {
    speciesId: 428,
    name: "Méga-Lockpin",
    normal: `${SPRITE}/10069.png`,
    shiny: `${SPRITE}/shiny/10069.png`,
    mega: true
  },

  {
    speciesId: 445,
    name: "Méga-Carchacrok",
    normal: `${SPRITE}/10071.png`,
    shiny: `${SPRITE}/shiny/10071.png`,
    mega: true
  },

  {
    speciesId: 448,
    name: "Méga-Lucario",
    normal: `${SPRITE}/10059.png`,
    shiny: `${SPRITE}/shiny/10059.png`,
    mega: true
  },

  {
    speciesId: 460,
    name: "Méga-Blizzaroi",
    normal: `${SPRITE}/10060.png`,
    shiny: `${SPRITE}/shiny/10060.png`,
    mega: true
  },


  /* UNYS */

  {
    speciesId: 531,
    name: "Méga-Roitiflam",
    normal: `${SPRITE}/10061.png`,
    shiny: `${SPRITE}/shiny/10061.png`,
    mega: true
  },


  /* KALOS */

  {
    speciesId: 719,
    name: "Méga-Diancie",
    normal: `${SPRITE}/10075.png`,
    shiny: `${SPRITE}/shiny/10075.png`,
    mega: true
  }

];


/* =========================================================
   PRIMO-ÉVOLUTIONS
   ========================================================= */

const primalPokemon = [

  {
    speciesId: 382,
    name: "Primo-Kyogre",
    normal: `${SPRITE}/10077.png`,
    shiny: `${SPRITE}/shiny/10077.png`,
    mega: false
  },

  {
    speciesId: 383,
    name: "Primo-Groudon",
    normal: `${SPRITE}/10078.png`,
    shiny: `${SPRITE}/shiny/10078.png`,
    mega: false
  }

];


/* =========================================================
   DEOXYS
   ========================================================= */

const deoxysForms = [

  {
    speciesId: 386,
    name: "Deoxys Forme Normale",
    normal: `${SPRITE}/386.png`,
    shiny: `${SPRITE}/shiny/386.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Forme Attaque",
    normal: `${SPRITE}/10001.png`,
    shiny: `${SPRITE}/shiny/10001.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Forme Défense",
    normal: `${SPRITE}/10002.png`,
    shiny: `${SPRITE}/shiny/10002.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Forme Vitesse",
    normal: `${SPRITE}/10003.png`,
    shiny: `${SPRITE}/shiny/10003.png`,
    mega: false
  }

];


/* =========================================================
   MELOETTA
   ========================================================= */

const meloettaForms = [

  {
    speciesId: 648,
    name: "Meloetta Chant",
    normal: `${SPRITE}/648.png`,
    shiny: `${SPRITE}/shiny/648.png`,
    mega: false
  },

  {
    speciesId: 648,
    name: "Meloetta Danse",
    normal: `${SPRITE}/10018.png`,
    shiny: `${SPRITE}/shiny/10018.png`,
    mega: false
  }

];


/* =========================================================
   KYUREM
   ========================================================= */

const kyuremForms = [

  {
    speciesId: 646,
    name: "Kyurem",
    normal: `${SPRITE}/646.png`,
    shiny: `${SPRITE}/shiny/646.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Noir",
    normal: `${SPRITE}/10022.png`,
    shiny: `${SPRITE}/shiny/10022.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Blanc",
    normal: `${SPRITE}/10023.png`,
    shiny: `${SPRITE}/shiny/10023.png`,
    mega: false
  }

];


/* =========================================================
   NECROZMA
   ========================================================= */

const necrozmaForms = [

  {
    speciesId: 800,
    name: "Necrozma",
    normal: `${SPRITE}/800.png`,
    shiny: `${SPRITE}/shiny/800.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Necrozma Crinière du Couchant",
    normal: `${SPRITE}/10047.png`,
    shiny: `${SPRITE}/shiny/10047.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Necrozma Ailes de l'Aurore",
    normal: `${SPRITE}/10048.png`,
    shiny: `${SPRITE}/shiny/10048.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Ultra-Necrozma",
    normal: `${SPRITE}/10049.png`,
    shiny: `${SPRITE}/shiny/10049.png`,
    mega: false
  }

];


/* =========================================================
   ZYGARDE
   ========================================================= */

const zygardeForms = [

  {
    speciesId: 718,
    name: "Zygarde 10%",
    normal: `${SPRITE}/10118.png`,
    shiny: `${SPRITE}/shiny/10118.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde 50%",
    normal: `${SPRITE}/718.png`,
    shiny: `${SPRITE}/shiny/718.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde Parfait",
    normal: `${SPRITE}/10119.png`,
    shiny: `${SPRITE}/shiny/10119.png`,
    mega: false
  }

];


/* =========================================================
   POKEMON ZA
   ========================================================= */

const zaForms = [
{
  speciesId: 807,
  name: "Méga-Zeraora",
  normal:
    `${SPRITE}/10271.png`,
  shiny:
    `${SPRITE}/shiny/10271.png`,
  mega: true
},

{
  speciesId: 718,
  name: "Méga-Zygarde",
  normal:
    `${SPRITE}/10272.png`,
  shiny:
    `${SPRITE}/shiny/10272.png`,
  mega: true
},

{
  speciesId: 359,
  name: "Méga-Absol Z",
  normal:
    `${SPRITE}/10273.png`,
  shiny:
    `${SPRITE}/shiny/10273.png`,
  mega: true
},

{
  speciesId: 448,
  name: "Méga-Lucario Z",
  normal:
    `${SPRITE}/10274.png`,
  shiny:
    `${SPRITE}/shiny/10274.png`,
  mega: true
},

{
  speciesId: 445,
  name: "Méga-Carchacrok Z",
  normal:
    `${SPRITE}/10275.png`,
  shiny:
    `${SPRITE}/shiny/10275.png`,
  mega: true
}

/* =========================================================
   ZACIAN / ZAMAZENTA
   ========================================================= */

const legendaryForms = [

  {
    speciesId: 888,
    name: "Zacian Épée Suprême",
    normal: `${SPRITE}/10270.png`,
    shiny: `${SPRITE}/shiny/10270.png`,
    mega: false
  },

  {
    speciesId: 889,
    name: "Zamazenta Bouclier Suprême",
    normal: `${SPRITE}/10271.png`,
    shiny: `${SPRITE}/shiny/10271.png`,
    mega: false
  }

];


/* =========================================================
   TOUTES LES FORMES SPÉCIALES
   ========================================================= */

const specialPokemon = [

  ...primalPokemon,
  ...deoxysForms,
  ...meloettaForms,
  ...kyuremForms,
  ...necrozmaForms,
  ...zygardeForms,
  ...legendaryForms

];


/* =========================================================
   HOENN UNIQUEMENT
   ========================================================= */

const hoennPokemon = [

  ...Array.from(
    { length: 135 },
    (_, i) => normalPokemon[i + 251]
  ),

  ...megaPokemon.filter(p =>
    [
      254,
      257,
      260,
      282,
      302,
      303,
      308,
      310,
      319,
      323,
      334,
      354,
      359,
      362,
      373,
      376,
      380,
      381,
      384
    ].includes(p.speciesId)
  ),

  ...primalPokemon,

  ...deoxysForms

];


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

function createPokemonBackground(
  region = "all"
) {

  const container =
    document.getElementById(
      "pokemonBackground"
    );

  if (!container) return;


  container.innerHTML = "";


  let pool;


  if (region === "hoenn") {

    pool = [
      ...hoennPokemon
    ];

  } else {

    pool = [
      ...normalPokemon,
      ...megaPokemon,
      ...specialPokemon
    ];

  }


  pool =
    shuffle(pool);


  /*
   * Nombre de Pokémon
   */

  const amount =
    window.innerWidth <= 600
      ? 42
      : 75;


  /*
   * Évite les doublons exacts
   */

  const selected = [];

  const used = new Set();


  for (const pokemon of pool) {

    const key =
      `${pokemon.speciesId}-${pokemon.name}`;


    if (used.has(key)) {
      continue;
    }


    used.add(key);

    selected.push(pokemon);


    if (
      selected.length >= amount
    ) {
      break;
    }

  }


  /*
   * Positions
   */

  const positions = [];


  selected.forEach(pokemon => {

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
        positions.every(pos => {

          const dx =
            pos.x - x;

          const dy =
            pos.y - y;


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


    /*
     * Shiny : 12 %
     */

    const isShiny =
      Math.random() < 0.12;


    const img =
      document.createElement(
        "img"
      );


    img.className =
      "bg-pokemon";


    img.draggable =
      false;


    /*
     * Sprite
     */

    img.src =
      isShiny
        ? pokemon.shiny
        : pokemon.normal;


    /*
     * Si le sprite n'existe pas,
     * on supprime l'image.
     */

    img.onerror = () => {

      img.remove();

    };


    /*
     * Position
     */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /*
     * Taille
     */

    const size =
      48 +
      Math.random() * 38;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /*
     * Rotation
     */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    /*
     * Animation
     */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 8}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    container.appendChild(
      img
    );

  });

}


/* =========================================================
   FOND ACCUEIL
   ========================================================= */

createPokemonBackground(
  "all"
);


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
