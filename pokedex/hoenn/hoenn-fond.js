/* =========================================================
   FOND HOENN
   Pokémon Hoenn + Méga-Évolutions Hoenn
   ========================================================= */

const hoennBackground =
  document.createElement("div");

hoennBackground.id =
  "pokemonBackground";

hoennBackground.className =
  "background-pokemon";

document.body.prepend(
  hoennBackground
);


/* =========================================================
   POKÉMON HOENN
   ========================================================= */

const hoennPokemon =
  Array.from(
    { length: 135 },
    (_, i) => ({
      id: i + 252,
      mega: false
    })
  );


/* =========================================================
   MÉGA HOENN
   ========================================================= */

const hoennMega = [

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

  { id: 381, name: "latios" }

];


/* =========================================================
   MÉLANGE
   ========================================================= */

function shuffleHoenn(array) {

  return [...array]
    .sort(() => Math.random() - 0.5);

}


/* =========================================================
   CRÉATION
   ========================================================= */

function createHoennBackground() {

  let pool = [

    ...hoennPokemon,

    ...hoennMega.map(p => ({
      id: p.id,
      name: p.name,
      mega: true
    }))

  ];


  pool =
    shuffleHoenn(pool);


  const amount =
    window.innerWidth <= 600
      ? 38
      : 65;


  const positions = [];


  for (
    const pokemon of pool
  ) {

    if (
      positions.length >=
      amount
    ) {

      break;

    }


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


          return distance > 12;

        });


      tries++;

    }


    if (!valid) continue;


    positions.push({
      x,
      y
    });


    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    img.draggable =
      false;


    const shiny =
      Math.random() < 0.12;


    /* -----------------------------------------------------
       SPRITE
       ----------------------------------------------------- */

    if (pokemon.mega) {

      img.classList.add(
        "mega-pokemon"
      );


      img.src =
        `https://play.pokemonshowdown.com/sprites/xyani/mega-${pokemon.name}${shiny ? "-shiny.gif" : ".gif"}`;

    }

    else {

      img.src =
        shiny

          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`

          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

    }


    /* -----------------------------------------------------
       Image cassée
       ----------------------------------------------------- */

    img.onerror = () => {

      img.remove();

    };


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

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    /* -----------------------------------------------------
       ANIMATION
       ----------------------------------------------------- */

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
          window.pokedexSound
        ) {

          window.pokedexSound.click();

        }

      }
    );

  });
