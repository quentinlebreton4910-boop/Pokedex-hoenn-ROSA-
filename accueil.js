/* =========================================================
   ACCUEIL POKÉDEX
   Pokémon aléatoires + Shiny + Méga-Évolutions
   ========================================================= */

const pokemonBackground = document.getElementById("pokemonBackground");


/* =========================================================
   LISTE DES POKÉMON DISPONIBLES
   ========================================================= */

const allPokemon = Array.from(
  { length: 1025 },
  (_, i) => ({
    id: i + 1,
    mega: false
  })
);


/* =========================================================
   MÉGA-ÉVOLUTIONS
   Pokémon de différentes générations
   ========================================================= */

const megaPokemon = [

  /* Kanto */
  { id: 3, name: "venusaur" },
  { id: 6, name: "charizard-x" },
  { id: 6, name: "charizard-y" },
  { id: 9, name: "blastoise" },
  { id: 15, name: "beedrill" },
  { id: 18, name: "pidgeot" },

  /* Johto */
  { id: 181, name: "ampharos" },
  { id: 208, name: "steelix" },
  { id: 212, name: "scizor" },
  { id: 214, name: "heracross" },
  { id: 229, name: "houndoom" },
  { id: 248, name: "tyranitar" },

  /* Hoenn */
  { id: 254, name: "sceptile" },
  { id: 257, name: "blaziken" },
  { id: 260, name: "swampert" },
  { id: 282, name: "gardevoir" },
  { id: 302, name: "sableye" },
  { id: 303, name: "mawile" },
  { id: 306, name: "aggron" },
  { id: 308, name: "medicham" },
  { id: 310, name: "manectric" },
  { id: 319, name: "sharpedo" },
  { id: 323, name: "camerupt" },
  { id: 334, name: "altaria" },
  { id: 354, name: "banette" },
  { id: 359, name: "absol" },
  { id: 362, name: "glalie" },
  { id: 373, name: "salamence" },
  { id: 376, name: "metagross" },
  { id: 380, name: "latias" },
  { id: 381, name: "latios" },

  /* Sinnoh */
  { id: 445, name: "garchomp" },
  { id: 448, name: "lucario" },
  { id: 460, name: "abomasnow" },

  /* Unys */
  { id: 531, name: "audino" },

  /* Kalos */
  { id: 719, name: "diancie" },

  /* Alola */
  { id: 800, name: "necrozma-dusk-mane" },
  { id: 800, name: "necrozma-dawn-wings" }

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
   SPRITE NORMAL
   ========================================================= */

function getNormalSprite(id, shiny) {

  if (shiny) {

    return `
      https://raw.githubusercontent.com/PokeAPI/sprites/master/
      sprites/pokemon/other/home/shiny/${id}.png
    `.replace(/\s/g, "");

  }

  return `
    https://raw.githubusercontent.com/PokeAPI/sprites/master/
    sprites/pokemon/other/home/${id}.png
  `.replace(/\s/g, "");

}


/* =========================================================
   SPRITE MÉGA
   ========================================================= */

function getMegaSprite(name, shiny) {

  const suffix =
    shiny
      ? "-shiny.gif"
      : ".gif";

  return `
    https://play.pokemonshowdown.com/sprites/xyani/mega-${name}${suffix}
  `.replace(/\s/g, "");

}


/* =========================================================
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground(region = "all") {

  const container =
    document.getElementById("pokemonBackground");

  if (!container) return;

  container.innerHTML = "";


  /* ---------------------------------------------------------
     CHOIX DU POOL
     --------------------------------------------------------- */

  let pool = [];


  if (region === "hoenn") {

    /* Pokémon Hoenn */

    pool = Array.from(
      { length: 135 },
      (_, i) => ({
        id: i + 252,
        mega: false
      })
    );


    /* Méga Hoenn */

    megaPokemon
      .filter(p => p.id >= 252 && p.id <= 386)
      .forEach(p => {

        pool.push({
          id: p.id,
          mega: true,
          name: p.name
        });

      });

  }

  else {

    /* Accueil : toutes les espèces */

    pool = [
      ...allPokemon
    ];


    /* Ajout des Méga */

    megaPokemon.forEach(p => {

      pool.push({
        id: p.id,
        mega: true,
        name: p.name
      });

    });

  }


  /* ---------------------------------------------------------
     MÉLANGE
     --------------------------------------------------------- */

  pool =
    shuffle(pool);


  /* ---------------------------------------------------------
     NOMBRE DE POKÉMON
     --------------------------------------------------------- */

  const amount =
    window.innerWidth <= 600
      ? 42
      : 75;


  /* ---------------------------------------------------------
     POSITIONS
     --------------------------------------------------------- */

  const positions = [];


  for (const pokemon of pool) {

    if (positions.length >= amount) {
      break;
    }


    let x;
    let y;
    let valid = false;

    let tries = 0;


    /* -------------------------------------------------------
       On cherche une position éloignée des autres
       ------------------------------------------------------- */

    while (!valid && tries < 500) {

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


    if (!valid) {
      continue;
    }


    positions.push({
      x,
      y
    });


    /* -------------------------------------------------------
       IMAGE
       ------------------------------------------------------- */

    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    img.draggable =
      false;


    /* -------------------------------------------------------
       SHINY
       ------------------------------------------------------- */

    const shiny =
      Math.random() < 0.12;


    /* -------------------------------------------------------
       SPRITE
       ------------------------------------------------------- */

    if (pokemon.mega) {

      img.src =
        getMegaSprite(
          pokemon.name,
          shiny
        );

      img.classList.add("mega-pokemon");

    }

    else {

      img.src =
        getNormalSprite(
          pokemon.id,
          shiny
        );

    }


    /* -------------------------------------------------------
       SI UNE IMAGE NE CHARGE PAS
       on la retire complètement
       ------------------------------------------------------- */

    img.onerror = () => {

      img.remove();

    };


    /* -------------------------------------------------------
       POSITION
       ------------------------------------------------------- */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /* -------------------------------------------------------
       TAILLE
       ------------------------------------------------------- */

    const size =
      45 +
      Math.random() * 35;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /* -------------------------------------------------------
       ROTATION
       ------------------------------------------------------- */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    /* -------------------------------------------------------
       ANIMATION
       ------------------------------------------------------- */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 8}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    /* -------------------------------------------------------
       AJOUT
       ------------------------------------------------------- */

    container.appendChild(img);

  }

}


/* =========================================================
   LANCEMENT DU FOND
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

        /* Son de clic */

        if (
          window.pokedexSound &&
          window.pokedexSound.click
        ) {

          window.pokedexSound.click();

        }


        const region =
          button.dataset.region;


        if (region === "hoenn") {

          window.location.href =
            "pokedex/hoenn/";

        }

      }
    );

  });
