const pokemonBackground = document.getElementById("pokemonBackground");

/* =========================================================
   CONFIGURATION
   ========================================================= */

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";


/* =========================================================
   POKÉMON DISPONIBLES
   ========================================================= */

const regions = {

  all: Array.from(
    { length: 1025 },
    (_, i) => i + 1
  ),

  hoenn: Array.from(
    { length: 135 },
    (_, i) => i + 252
  )

};


/* =========================================================
   FORMES SPÉCIALES
   ========================================================= */

/*
 * On utilise ici les IDs de formes PokéAPI.
 *
 * Les formes possèdent leurs propres sprites.
 * Cela évite de prendre le sprite normal du Pokémon.
 */

const specialForms = [

  /* Deoxys */

  {
    speciesId: 386,
    name: "Deoxys Attaque",
    normal: `${SPRITE}/other/home/386.png`,
    shiny: `${SPRITE}/other/home/shiny/386.png`,
    mega: false
  },

  /* Shaymin */

  {
    speciesId: 492,
    name: "Shaymin Céleste",
    normal: `${SPRITE}/other/home/492-sky.png`,
    shiny: `${SPRITE}/other/home/shiny/492-sky.png`,
    mega: false
  },

  /* Giratina */

  {
    speciesId: 487,
    name: "Giratina Originelle",
    normal: `${SPRITE}/other/home/487-origin.png`,
    shiny: `${SPRITE}/other/home/shiny/487-origin.png`,
    mega: false
  },

  /* Meloetta */

  {
    speciesId: 648,
    name: "Meloetta Danse",
    normal: `${SPRITE}/other/home/648-pirouette.png`,
    shiny: `${SPRITE}/other/home/shiny/648-pirouette.png`,
    mega: false
  },

  /* Keldeo */

  {
    speciesId: 647,
    name: "Keldeo Décidé",
    normal: `${SPRITE}/other/home/647-resolute.png`,
    shiny: `${SPRITE}/other/home/shiny/647-resolute.png`,
    mega: false
  },

  /* Kyurem */

  {
    speciesId: 646,
    name: "Kyurem Noir",
    normal: `${SPRITE}/other/home/646-black.png`,
    shiny: `${SPRITE}/other/home/shiny/646-black.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Blanc",
    normal: `${SPRITE}/other/home/646-white.png`,
    shiny: `${SPRITE}/other/home/shiny/646-white.png`,
    mega: false
  },

  /* Necrozma */

  {
    speciesId: 800,
    name: "Necrozma Crinière du Couchant",
    normal: `${SPRITE}/other/home/800-dusk-mane.png`,
    shiny: `${SPRITE}/other/home/shiny/800-dusk-mane.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Necrozma Ailes de l'Aurore",
    normal: `${SPRITE}/other/home/800-dawn-wings.png`,
    shiny: `${SPRITE}/other/home/shiny/800-dawn-wings.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Ultra-Necrozma",
    normal: `${SPRITE}/other/home/800-ultra.png`,
    shiny: `${SPRITE}/other/home/shiny/800-ultra.png`,
    mega: false
  },

  /* Zygarde */

  {
    speciesId: 718,
    name: "Zygarde 10%",
    normal: `${SPRITE}/other/home/718-10.png`,
    shiny: `${SPRITE}/other/home/shiny/718-10.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde Parfait",
    normal: `${SPRITE}/other/home/718-complete.png`,
    shiny: `${SPRITE}/other/home/shiny/718-complete.png`,
    mega: false
  },

  /* Hoopa */

  {
    speciesId: 720,
    name: "Hoopa Déchaîné",
    normal: `${SPRITE}/other/home/720-unbound.png`,
    shiny: `${SPRITE}/other/home/shiny/720-unbound.png`,
    mega: false
  },

  /* Zacian */

  {
    speciesId: 888,
    name: "Zacian Épée Suprême",
    normal: `${SPRITE}/other/home/888-crowned.png`,
    shiny: `${SPRITE}/other/home/shiny/888-crowned.png`,
    mega: false
  },

  /* Zamazenta */

  {
    speciesId: 889,
    name: "Zamazenta Bouclier Suprême",
    normal: `${SPRITE}/other/home/889-crowned.png`,
    shiny: `${SPRITE}/other/home/shiny/889-crowned.png`,
    mega: false
  },

  /* Ogerpon */

  {
    speciesId: 1017,
    name: "Ogerpon Masque Turquoise",
    normal: `${SPRITE}/other/home/1017-teal.png`,
    shiny: `${SPRITE}/other/home/shiny/1017-teal.png`,
    mega: false
  },

  {
    speciesId: 1017,
    name: "Ogerpon Masque du Puits",
    normal: `${SPRITE}/other/home/1017-wellspring.png`,
    shiny: `${SPRITE}/other/home/shiny/1017-wellspring.png`,
    mega: false
  },

  {
    speciesId: 1017,
    name: "Ogerpon Masque Fournaise",
    normal: `${SPRITE}/other/home/1017-hearthflame.png`,
    shiny: `${SPRITE}/other/home/shiny/1017-hearthflame.png`,
    mega: false
  },

  {
    speciesId: 1017,
    name: "Ogerpon Masque Pierre",
    normal: `${SPRITE}/other/home/1017-cornerstone.png`,
    shiny: `${SPRITE}/other/home/shiny/1017-cornerstone.png`,
    mega: false
  }

];


/* =========================================================
   MÉGA-ÉVOLUTIONS
   ========================================================= */

const megaPokemon = [

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
      `${SPRITE}/other/home/10064.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10064.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal:
      `${SPRITE}/other/home/10063.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10063.png`,
    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",
    normal:
      `${SPRITE}/other/home/10051.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10051.png`,
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
    name: "Méga-Galeking",
    normal:
      `${SPRITE}/other/home/10056.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10056.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal:
      `${SPRITE}/other/home/10042.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10042.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal:
      `${SPRITE}/other/home/10045.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10045.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal:
      `${SPRITE}/other/home/10054.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10054.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal:
      `${SPRITE}/other/home/10087.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10087.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal:
      `${SPRITE}/other/home/10066.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10066.png`,
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
      `${SPRITE}/other/home/10074.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10074.png`,
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
      `${SPRITE}/other/home/10076.png`,
    shiny:
      `${SPRITE}/other/home/shiny/10076.png`,
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
  }

];


/* =========================================================
   MÉLANGE
   ========================================================= */

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


/* =========================================================
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground(region = "all") {

  const container =
    document.getElementById("pokemonBackground");

  if (!container) return;

  container.innerHTML = "";

  let pool = [];


  /* Pokémon normaux */

  const ids =
    regions[region] || regions.all;

  ids.forEach(id => {

    pool.push({

      speciesId: id,

      name: "",

      normal:
        `${SPRITE}/other/home/${id}.png`,

      shiny:
        `${SPRITE}/other/home/shiny/${id}.png`,

      mega: false

    });

  });


  /* Formes spéciales */

  pool.push(
    ...specialForms
  );


  /* Méga */

  if (region === "all") {

    pool.push(
      ...megaPokemon
    );

  }


  pool =
    shuffle(pool);


  /* Nombre de Pokémon */

  const amount =
    window.innerWidth <= 600
      ? 32
      : 60;


  const selected =
    pool.slice(0, amount);


  /* Positions */

  const positions = [];


  selected.forEach(pokemon => {

    let x;
    let y;
    let valid = false;
    let tries = 0;


    while (!valid && tries < 500) {

      x =
        5 +
        Math.random() * 90;

      y =
        5 +
        Math.random() * 90;


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


    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    /* Shiny : 12 % */

    const shiny =
      Math.random() < 0.12;


    img.src =
      shiny
        ? pokemon.shiny
        : pokemon.normal;


    img.onerror = function () {

      /*
       * Si un sprite de forme spéciale
       * n'existe pas, on le supprime
       * plutôt que d'afficher un carré vide.
       */

      this.remove();

    };


    img.draggable = false;


    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    const size =
      45 +
      Math.random() * 35;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 7}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    img.style.setProperty(
      "--rotation",
      `${-5 + Math.random() * 10}deg`
    );


    container.appendChild(img);

  });

}


/* =========================================================
   PAGE D'ACCUEIL
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
      function () {

        const region =
          this.dataset.region;


        if (region === "hoenn") {

          window.location.href =
            "pokedex/hoenn/";

        }

      }
    );

  });
