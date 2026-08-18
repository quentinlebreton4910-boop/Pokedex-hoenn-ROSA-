const pokemonBackground = document.getElementById("pokemonBackground");

/* =========================================================
   LISTES DE POKÉMON
   ========================================================= */

/*
 * Pokémon disponibles pour l'accueil.
 * On utilise beaucoup d'espèces différentes afin que
 * le fond change à chaque ouverture.
 */
const regions = {

  all: Array.from({ length: 1025 }, (_, i) => ({
    id: i + 1,
    mega: false
  })),

  hoenn: Array.from({ length: 135 }, (_, i) => ({
    id: i + 252,
    mega: false
  }))

};


/*
 * Méga-Évolutions de Pokémon de Hoenn.
 *
 * On utilise ici les IDs des Pokémon de base.
 * Le sprite Méga sera recherché séparément.
 */
const megaHoenn = [
  254, // Jungko
  257, // Braségali
  260, // Laggron
  282, // Gardevoir
  302, // Ténéfix
  303, // Mysdibule
  306, // Galeking
  308, // Charmina
  310, // Élecsprint
  319, // Sharpedo
  323, // Camérupt
  334, // Altaria
  359, // Absol
  362, // Oniglali
  373, // Drattak
  376, // Métalosse
  380, // Latias
  381  // Latios
];


/* =========================================================
   MÉLANGE
   ========================================================= */

function shuffle(array) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];

  }

  return copy;

}


/* =========================================================
   SPRITE
   ========================================================= */

function getPokemonSprite(pokemon, shiny) {

  /*
   * Pour les Pokémon normaux :
   * sprite HOME de PokeAPI.
   */
  if (!pokemon.mega) {

    if (shiny) {

      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`;

    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

  }


  /*
   * Les sprites Méga ne sont pas disponibles
   * avec la même structure que les sprites normaux
   * de HOME.
   *
   * On utilise donc les sprites Showdown,
   * qui permettent d'avoir les Méga-Évolutions.
   */

  const megaName = getMegaName(pokemon.id);

  if (!megaName) {

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

  }


  if (shiny) {

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${megaName}.gif`;

  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${megaName}.gif`;

}


/*
 * Nom utilisé par les sprites Méga.
 */
function getMegaName(id) {

  const names = {

    254: "sceptile-mega",
    257: "blaziken-mega",
    260: "swampert-mega",

    282: "gardevoir-mega",

    302: "sableye-mega",
    303: "mawile-mega",
    306: "aggron-mega",
    308: "medicham-mega",
    310: "manectric-mega",

    319: "sharpedo-mega",
    323: "camerupt-mega",

    334: "altaria-mega",
    359: "absol-mega",
    362: "glalie-mega",

    373: "salamence-mega",
    376: "metagross-mega",

    380: "latias-mega",
    381: "latios-mega"

  };

  return names[id] || null;

}


/* =========================================================
   POSITION SANS CHEVAUCHEMENT
   ========================================================= */

function findFreePosition(positions) {

  const MIN_DISTANCE = 10;

  for (let attempt = 0; attempt < 500; attempt++) {

    const x = 4 + Math.random() * 92;
    const y = 5 + Math.random() * 90;

    let valid = true;

    for (const position of positions) {

      const dx = position.x - x;
      const dy = position.y - y;

      const distance = Math.sqrt(
        dx * dx + dy * dy
      );

      if (distance < MIN_DISTANCE) {

        valid = false;
        break;

      }

    }

    if (valid) {

      return {
        x,
        y
      };

    }

  }

  return null;

}


/* =========================================================
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground(region = "all") {

  if (!pokemonBackground) return;

  pokemonBackground.innerHTML = "";

  let pool = [];


  /*
   * Accueil :
   * tous les Pokémon.
   */

  if (region === "all") {

    pool = [...regions.all];

  }


  /*
   * Hoenn :
   * Pokémon 252 → 386
   * + Méga-Évolutions.
   */

  if (region === "hoenn") {

    pool = [...regions.hoenn];

    megaHoenn.forEach(id => {

      pool.push({
        id,
        mega: true
      });

    });

  }


  /*
   * Mélange complet.
   */

  pool = shuffle(pool);


  /*
   * Nombre affiché.
   */

  const amount =
    window.innerWidth <= 600
      ? 30
      : 70;


  /*
   * Sélection sans doublon.
   */

  const selected = pool.slice(0, amount);


  /*
   * Positions utilisées.
   */

  const positions = [];


  selected.forEach(pokemon => {

    const position = findFreePosition(positions);

    if (!position) return;

    positions.push(position);


    const img = document.createElement("img");

    img.className = "bg-pokemon";

    img.draggable = false;


    /*
     * Chance de shiny :
     * environ 12 %.
     */

    const shiny = Math.random() < 0.12;


    /*
     * Image.
     */

    img.src = getPokemonSprite(
      pokemon,
      shiny
    );


    /*
     * Si une image ne fonctionne pas,
     * on la supprime au lieu d'afficher
     * un carré vide.
     */

    img.onerror = function () {

      this.remove();

    };


    /*
     * Position.
     */

    img.style.left =
      `${position.x}%`;

    img.style.top =
      `${position.y}%`;


    /*
     * Taille aléatoire.
     */

    const size =
      45 + Math.random() * 30;

    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /*
     * Animation individuelle.
     */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 7}s`
    );

    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    /*
     * Rotation aléatoire.
     */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    pokemonBackground.appendChild(img);

  });

}


/* =========================================================
   FOND DE L'ACCUEIL
   ========================================================= */

createPokemonBackground("all");


/* =========================================================
   BOUTONS DES RÉGIONS
   ========================================================= */

document.querySelectorAll(".region-card").forEach(button => {

  button.addEventListener("click", () => {

    const region =
      button.dataset.region;


    if (region === "hoenn") {

      window.location.href =
        "pokedex/hoenn/";

    }

  });

});
