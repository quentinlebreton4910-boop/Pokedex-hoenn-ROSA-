const const pokemonBackground = document.getElementById("pokemonBackground");

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/*
=========================================================
POKÉMON NORMAUX
=========================================================
*/

const normalPokemon = [

  // Kanto
  1, 4, 7, 25, 39, 52, 54, 58, 63, 66,
  74, 81, 95, 104, 111, 120, 129, 133,

  // Johto
  152, 155, 158, 175, 179, 194, 200,

  // Hoenn
  252, 255, 258, 261, 263, 265, 270, 273,
  276, 280, 283, 285, 287, 290, 293, 296,
  299, 300, 302, 304, 307, 309, 311, 313,
  315, 318, 320, 322, 325, 327, 328, 331,
  333, 335, 336, 339, 341, 343, 345, 347,
  349, 351, 353, 355, 357, 359, 361, 363,
  366, 369, 371, 374, 377, 380, 382, 384,

  // Autres régions
  387, 390, 393, 396, 403, 406, 415, 418,
  427, 443, 447, 459,

  495, 498, 501, 504, 506, 509, 519, 522,
  524, 529, 535, 540, 543, 546, 551, 554,
  557, 562, 570, 574, 577, 580, 585, 588,
  592, 599, 602, 607, 610, 613,

  650, 653, 656, 659, 661, 664, 667, 670,
  674, 677, 679, 682, 685, 688, 690, 692,
  694, 696, 698, 701, 704, 707, 710, 712,
  714, 722, 725, 728, 731, 734, 736, 739,
  742, 744, 747, 749, 752, 755, 757, 759,
  761, 764, 766, 768, 774, 777, 779, 782,
  785, 789, 791, 793, 803, 808, 810, 813,
  816, 819, 822, 825, 828, 831, 834, 837,
  840, 843, 846, 848, 850, 852, 854, 856,
  859, 868, 870, 872, 874, 877, 880, 882,
  885, 888, 890, 894, 896, 899
];


/*
=========================================================
MÉGA-ÉVOLUTIONS
=========================================================

IMPORTANT :
On utilise directement les IDs de FORMES PokeAPI.

La structure reste exactement :

speciesId
name
normal
shiny
mega
*/

const megaPokemon = [

  /*
=========================================================
FORMES SPÉCIALES
=========================================================

Chaque entrée possède exactement :

speciesId
name
normal
shiny
mega
*/

const specialForms = [

  /* =====================================================
     DEOXYS
     ===================================================== */

  {
    speciesId: 386,
    name: "Deoxys — Forme Attaque",
    normal:
      `${SPRITE}/386-attack.png`,
    shiny:
      `${SPRITE}/shiny/386-attack.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys — Forme Défense",
    normal:
      `${SPRITE}/386-defense.png`,
    shiny:
      `${SPRITE}/shiny/386-defense.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys — Forme Vitesse",
    normal:
      `${SPRITE}/386-speed.png`,
    shiny:
      `${SPRITE}/shiny/386-speed.png`,
    mega: false
  },


  /* =====================================================
     SHAYMIN
     ===================================================== */

  {
    speciesId: 492,
    name: "Shaymin — Forme Céleste",
    normal:
      `${SPRITE}/492-sky.png`,
    shiny:
      `${SPRITE}/shiny/492-sky.png`,
    mega: false
  },


  /* =====================================================
     GIRATINA
     ===================================================== */

  {
    speciesId: 487,
    name: "Giratina — Forme Originelle",
    normal:
      `${SPRITE}/487-origin.png`,
    shiny:
      `${SPRITE}/shiny/487-origin.png`,
    mega: false
  },


  /* =====================================================
     SHAYMIN / KELDEO
     ===================================================== */

  {
    speciesId: 647,
    name: "Keldeo — Forme Décidée",
    normal:
      `${SPRITE}/647-resolute.png`,
    shiny:
      `${SPRITE}/shiny/647-resolute.png`,
    mega: false
  },


  /* =====================================================
     MELOETTA
     ===================================================== */

  {
    speciesId: 648,
    name: "Meloetta — Forme Danse",
    normal:
      `${SPRITE}/648-pirouette.png`,
    shiny:
      `${SPRITE}/shiny/648-pirouette.png`,
    mega: false
  },


  /* =====================================================
     KYUREM
     ===================================================== */

  {
    speciesId: 646,
    name: "Kyurem Noir",
    normal:
      `${SPRITE}/646-black.png`,
    shiny:
      `${SPRITE}/shiny/646-black.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Blanc",
    normal:
      `${SPRITE}/646-white.png`,
    shiny:
      `${SPRITE}/shiny/646-white.png`,
    mega: false
  },


  /* =====================================================
     NECROZMA
     ===================================================== */

  {
    speciesId: 800,
    name: "Necrozma — Crinière du Couchant",
    normal:
      `${SPRITE}/800-dusk-mane.png`,
    shiny:
      `${SPRITE}/shiny/800-dusk-mane.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Necrozma — Ailes de l'Aurore",
    normal:
      `${SPRITE}/800-dawn-wings.png`,
    shiny:
      `${SPRITE}/shiny/800-dawn-wings.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Ultra-Necrozma",
    normal:
      `${SPRITE}/800-ultra.png`,
    shiny:
      `${SPRITE}/shiny/800-ultra.png`,
    mega: false
  },


  /* =====================================================
     ZYGARDE
     ===================================================== */

  {
    speciesId: 718,
    name: "Zygarde — Forme 10%",
    normal:
      `${SPRITE}/718-10.png`,
    shiny:
      `${SPRITE}/shiny/718-10.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde — Forme Parfaite",
    normal:
      `${SPRITE}/718-complete.png`,
    shiny:
      `${SPRITE}/shiny/718-complete.png`,
    mega: false
  },


  /* =====================================================
     HOOPA
     ===================================================== */

  {
    speciesId: 720,
    name: "Hoopa — Forme Déchaînée",
    normal:
      `${SPRITE}/720-unbound.png`,
    shiny:
      `${SPRITE}/shiny/720-unbound.png`,
    mega: false
  },


  /* =====================================================
     AEGISLASH
     ===================================================== */

  {
    speciesId: 681,
    name: "Exagide — Forme Lame",
    normal:
      `${SPRITE}/681-blade.png`,
    shiny:
      `${SPRITE}/shiny/681-blade.png`,
    mega: false
  },


  /* =====================================================
     DARMANITAN
     ===================================================== */

  {
    speciesId: 555,
    name: "Darumacho — Mode Transe",
    normal:
      `${SPRITE}/555-zen.png`,
    shiny:
      `${SPRITE}/shiny/555-zen.png`,
    mega: false
  },


  /* =====================================================
     WISHIWASHI
     ===================================================== */

  {
    speciesId: 746,
    name: "Froussardine — Forme Banc",
    normal:
      `${SPRITE}/746-school.png`,
    shiny:
      `${SPRITE}/shiny/746-school.png`,
    mega: false
  },


  /* =====================================================
     MIMIKYU
     ===================================================== */

  {
    speciesId: 778,
    name: "Mimiqui — Forme Buste",
    normal:
      `${SPRITE}/778-busted.png`,
    shiny:
      `${SPRITE}/shiny/778-busted.png`,
    mega: false
  },


  /* =====================================================
     MORPEKO
     ===================================================== */

  {
    speciesId: 877,
    name: "Morpeko — Forme Affamée",
    normal:
      `${SPRITE}/877-hangry.png`,
    shiny:
      `${SPRITE}/shiny/877-hangry.png`,
    mega: false
  },


  /* =====================================================
     URSHIFU
     ===================================================== */

  {
    speciesId: 892,
    name: "Shifours — Style Poing Final",
    normal:
      `${SPRITE}/892-single-strike.png`,
    shiny:
      `${SPRITE}/shiny/892-single-strike.png`,
    mega: false
  },

  {
    speciesId: 892,
    name: "Shifours — Style Mille Poings",
    normal:
      `${SPRITE}/892-rapid-strike.png`,
    shiny:
      `${SPRITE}/shiny/892-rapid-strike.png`,
    mega: false
  },


  /* =====================================================
     OGERPON
     ===================================================== */

  {
    speciesId: 1017,
    name: "Ogerpon — Masque Turquoise",
    normal:
      `${SPRITE}/1017-teal.png`,
    shiny:
      `${SPRITE}/shiny/1017-teal.png`,
    mega: false
  },

  {
    speciesId: 1017,
    name: "Ogerpon — Masque du Puits",
    normal:
      `${SPRITE}/1017-wellspring.png`,
    shiny:
      `${SPRITE}/shiny/1017-wellspring.png`,
    mega: false
  },

  {
    speciesId: 1017,
    name: "Ogerpon — Masque Fournaise",
    normal:
      `${SPRITE}/1017-hearthflame.png`,
    shiny:
      `${SPRITE}/shiny/1017-hearthflame.png`,
    mega: false
  },

  {
    speciesId: 1017,
    name: "Ogerpon — Masque Pierre",
    normal:
      `${SPRITE}/1017-cornerstone.png`,
    shiny:
      `${SPRITE}/shiny/1017-cornerstone.png`,
    mega: false
  },


  /* =====================================================
     TERAPAGOS
     ===================================================== */

  {
    speciesId: 1024,
    name: "Terapagos — Forme Téracristal",
    normal:
      `${SPRITE}/1024-terastal.png`,
    shiny:
      `${SPRITE}/shiny/1024-terastal.png`,
    mega: false
  },

  {
    speciesId: 1024,
    name: "Terapagos — Forme Stellaire",
    normal:
      `${SPRITE}/1024-stellar.png`,
    shiny:
      `${SPRITE}/shiny/1024-stellar.png`,
    mega: false
  },


  /* =====================================================
     ZACIAN
     ===================================================== */

  {
    speciesId: 888,
    name: "Zacian — Épée Suprême",
    normal:
      `${SPRITE}/888-crowned.png`,
    shiny:
      `${SPRITE}/shiny/888-crowned.png`,
    mega: false
  },


  /* =====================================================
     ZAMAZENTA
     ===================================================== */

  {
    speciesId: 889,
    name: "Zamazenta — Bouclier Suprême",
    normal:
      `${SPRITE}/889-crowned.png`,
    shiny:
      `${SPRITE}/shiny/889-crowned.png`,
    mega: false
  }

];


  /* =========================
     MÉGA KANTO
     ========================= */

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
    normal: `${SPRITE}/10090.png`,
    shiny: `${SPRITE}/shiny/10090.png`,
    mega: true
  },

  {
    speciesId: 18,
    name: "Méga-Roucarnage",
    normal: `${SPRITE}/10073.png`,
    shiny: `${SPRITE}/shiny/10073.png`,
    mega: true
  },

  /* =========================
     MÉGA JOHTO
     ========================= */

  {
    speciesId: 65,
    name: "Méga-Alakazam",
    normal: `${SPRITE}/10062.png`,
    shiny: `${SPRITE}/shiny/10062.png`,
    mega: true
  },

  {
    speciesId: 80,
    name: "Méga-Flagadoss",
    normal: `${SPRITE}/10071.png`,
    shiny: `${SPRITE}/shiny/10071.png`,
    mega: true
  },

  {
    speciesId: 94,
    name: "Méga-Ectoplasma",
    normal: `${SPRITE}/10038.png`,
    shiny: `${SPRITE}/shiny/10038.png`,
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
    normal: `${SPRITE}/10040.png`,
    shiny: `${SPRITE}/shiny/10040.png`,
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
    speciesId: 181,
    name: "Méga-Pharamp",
    normal: `${SPRITE}/10045.png`,
    shiny: `${SPRITE}/shiny/10045.png`,
    mega: true
  },

  /* =========================
     MÉGA HOENN
     ========================= */

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
    normal: `${SPRITE}/10061.png`,
    shiny: `${SPRITE}/shiny/10061.png`,
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
    normal: `${SPRITE}/10051.png`,
    shiny: `${SPRITE}/shiny/10051.png`,
    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",
    normal: `${SPRITE}/10066.png`,
    shiny: `${SPRITE}/shiny/10066.png`,
    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Mysdibule",
    normal: `${SPRITE}/10052.png`,
    shiny: `${SPRITE}/shiny/10052.png`,
    mega: true
  },

  {
    speciesId: 306,
    name: "Méga-Galeking",
    normal: `${SPRITE}/10053.png`,
    shiny: `${SPRITE}/shiny/10053.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal: `${SPRITE}/10069.png`,
    shiny: `${SPRITE}/shiny/10069.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal: `${SPRITE}/10055.png`,
    shiny: `${SPRITE}/shiny/10055.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal: `${SPRITE}/10070.png`,
    shiny: `${SPRITE}/shiny/10070.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal: `${SPRITE}/10078.png`,
    shiny: `${SPRITE}/shiny/10078.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal: `${SPRITE}/10076.png`,
    shiny: `${SPRITE}/shiny/10076.png`,
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
    normal: `${SPRITE}/10093.png`,
    shiny: `${SPRITE}/shiny/10093.png`,
    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",
    normal: `${SPRITE}/10060.png`,
    shiny: `${SPRITE}/shiny/10060.png`,
    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",
    normal: `${SPRITE}/10062.png`,
    shiny: `${SPRITE}/shiny/10062.png`,
    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",
    normal: `${SPRITE}/10063.png`,
    shiny: `${SPRITE}/shiny/10063.png`,
    mega: true
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",
    normal: `${SPRITE}/10079.png`,
    shiny: `${SPRITE}/shiny/10079.png`,
    mega: true
  },

  /* =========================
     AUTRES MÉGA
     ========================= */

  {
    speciesId: 445,
    name: "Méga-Carchacrok",
    normal: `${SPRITE}/10088.png`,
    shiny: `${SPRITE}/shiny/10088.png`,
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
    normal: `${SPRITE}/10061.png`,
    shiny: `${SPRITE}/shiny/10061.png`,
    mega: true
  },

  {
    speciesId: 475,
    name: "Méga-Gallame",
    normal: `${SPRITE}/10068.png`,
    shiny: `${SPRITE}/shiny/10068.png`,
    mega: true
  },

  {
    speciesId: 531,
    name: "Méga-Nanméouïe",
    normal: `${SPRITE}/10064.png`,
    shiny: `${SPRITE}/shiny/10064.png`,
    mega: true
  },

  {
    speciesId: 719,
    name: "Méga-Diancie",
    normal: `${SPRITE}/10075.png`,
    shiny: `${SPRITE}/shiny/10075.png`,
    mega: true
  }

];


/*
=========================================================
CRÉATION DU POOL
=========================================================
*/

const normalEntries = normalPokemon.map(id => ({
  speciesId: id,
  name: "",
  normal: `${SPRITE}/${id}.png`,
  shiny: `${SPRITE}/shiny/${id}.png`,
  mega: false
}));


const allPokemon = [
  ...normalEntries,
  ...megaPokemon,
  ...specialForms
];


/*
=========================================================
MÉLANGE
=========================================================
*/

function shuffle(array) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] =
      [copy[j], copy[i]];
  }

  return copy;
}


/*
=========================================================
FOND POKÉMON
=========================================================
*/

function createPokemonBackground() {

  if (!pokemonBackground) return;

  pokemonBackground.innerHTML = "";

  const pool =
    shuffle(allPokemon);

  const amount =
    window.innerWidth <= 600
      ? 30
      : 55;

  const selected =
    pool.slice(0, amount);

  const positions = [];

  selected.forEach(pokemon => {

    let x;
    let y;
    let valid = false;
    let tries = 0;

    while (!valid && tries < 500) {

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

          return Math.sqrt(
            dx * dx +
            dy * dy
          ) > 11;

        });

      tries++;
    }

    if (!valid) return;

    positions.push({ x, y });


    const img =
      document.createElement("img");

    img.className =
      "bg-pokemon";


    /*
    ================================================
    SHINY
    ================================================
    */

    const isShiny =
      Math.random() < 0.12;


    img.src =
      isShiny
        ? pokemon.shiny
        : pokemon.normal;


    /*
    ================================================
    SI LE SPRITE N'EXISTE PAS
    ================================================
    */

    img.onerror = () => {

      /*
       * Pour éviter les carrés/images cassées
       */

      img.remove();

    };


    img.draggable = false;


    /*
    ================================================
    POSITION
    ================================================
    */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /*
    ================================================
    TAILLE
    ================================================
    */

    const size =
      45 +
      Math.random() * 30;

    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /*
    ================================================
    ROTATION
    ================================================
    */

    img.style.setProperty(
      "--rotation",
      `${-6 + Math.random() * 12}deg`
    );


    /*
    ================================================
    ANIMATION
    ================================================
    */

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


/*
=========================================================
LANCEMENT DU FOND
=========================================================
*/

createPokemonBackground();


/*
=========================================================
BOUTON HOENN
=========================================================
*/

document
  .querySelectorAll(".region-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const region =
          button.dataset.region;

        if (region === "hoenn") {

          window.location.href =
            "pokedex/hoenn/";

        }

      }
    );

  });


/*
=========================================================
RECHARGER LE FOND À CHAQUE OUVERTURE
=========================================================
*/

window.addEventListener(
  "pageshow",
  () => {

    createPokemonBackground();

  }
);
