const pokemonBackground = document.getElementById("pokemonBackground");

/*
 * Pokémon affichés sur la page d'accueil.
 * On pourra ajouter toutes les régions ici.
 */

const regions = {

  all: [
    1, 4, 7, 25, 39, 52, 54, 58, 63, 66,
    74, 81, 95, 104, 111, 120, 129, 133,
    152, 155, 158, 175, 179, 194, 200,
    252, 255, 258, 263, 280, 285, 304, 309,
    320, 333, 343, 349, 361, 371, 387, 390,
    393, 396, 403, 406, 415, 418, 427, 443,
    447, 459, 495, 498, 501, 504, 506, 509,
    519, 522, 524, 529, 535, 540, 543, 546,
    551, 554, 557, 562, 570, 574, 577, 580,
    585, 588, 592, 599, 602, 607, 610, 613,
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
  ],

  hoenn: [
    252, 253, 254,
    255, 256, 257,
    258, 259, 260,
    261, 262, 263, 264,
    265, 266, 267, 268, 269, 270,
    271, 272, 273, 274, 275,
    276, 277, 278, 279, 280,
    281, 282, 283, 284, 285,
    286, 287, 288, 289, 290,
    291, 292, 293, 294, 295,
    296, 297, 298, 299, 300,
    301, 302, 303, 304, 305,
    306, 307, 308, 309, 310,
    311, 312, 313, 314, 315,
    316, 317, 318, 319, 320,
    321, 322, 323, 324, 325,
    326, 327, 328, 329, 330,
    331, 332, 333, 334, 335,
    336, 337, 338, 339, 340,
    341, 342, 343, 344, 345,
    346, 347, 348, 349, 350,
    351, 352, 353, 354, 355,
    356, 357, 358, 359, 360,
    361, 362, 363, 364, 365,
    366, 367, 368, 369, 370,
    371, 372, 373, 374, 375,
    376, 377, 378, 379, 380,
    381, 382, 383, 384, 385,
    386, 387, 388, 389, 390,
    391, 392, 393, 394, 395,
    396, 397, 398, 399, 400,
    401, 402, 403, 404, 405,
    406, 407, 408, 409, 410,
    411, 412, 413, 414, 415,
    416, 417, 418, 419, 420,
    421, 422, 423, 424, 425,
    426, 427, 428, 429, 430,
    431, 432, 433, 434, 435,
    436, 437, 438, 439, 440,
    441, 442, 443, 444, 445,
    446, 447, 448, 449, 450,
    451, 452, 453, 454, 455,
    456, 457, 458, 459, 460,
    461, 462, 463, 464, 465,
    466, 467, 468, 469, 470,
    471, 472, 473, 474, 475,
    476, 477, 478, 479, 480,
    481, 482, 483, 484, 485
  ]

};


/* Mélange aléatoire */

function shuffle(array) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}


/*
 * Génère le fond.
 *
 * Important :
 * on utilise Set pour garantir qu'un même Pokémon
 * ne puisse jamais apparaître deux fois.
 */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


/* =========================================================
   FOND POKÉMON
   ========================================================= */

function createPokemonBackground(region = "all") {

  if (!pokemonBackground) return;

  pokemonBackground.innerHTML = "";

  /*
   * Pour l'accueil :
   * on prend beaucoup plus d'espèces disponibles.
   *
   * Pour Hoenn :
   * on utilise uniquement les Pokémon Hoenn + Méga Hoenn.
   */

  let pool = [];

  if (region === "hoenn") {

    pool = [
      ...regions.hoenn.map(id => ({
        id,
        mega: false
      })),

      /* MÉGA-ÉVOLUTIONS DE HOENN */

      { id: 254, mega: true }, // Méga-Jungko
      { id: 257, mega: true }, // Méga-Braségali
      { id: 260, mega: true }, // Méga-Laggron

      { id: 282, mega: true }, // Méga-Gardevoir
      { id: 284, mega: true }, // Méga-Armald? non
      { id: 306, mega: true }, // Méga-Galeking
      { id: 308, mega: true }, // Méga-Charmina
      { id: 310, mega: true }, // Méga-Élecsprint
      { id: 319, mega: true }, // Méga-Sharpedo
      { id: 323, mega: true }, // Méga-Camérupt
      { id: 334, mega: true }, // Méga-Altaria
      { id: 362, mega: true }, // Méga-Oniglali
      { id: 373, mega: true }, // Méga-Drattak
      { id: 376, mega: true }, // Méga-Métalosse
      { id: 380, mega: true }, // Méga-Latias
      { id: 381, mega: true }  // Méga-Latios
    ];

  } else {

    /*
     * ACCUEIL :
     * beaucoup plus d'espèces disponibles.
     *
     * 1 → 1025 couvre les Pokémon connus
     * disponibles dans les sprites PokeAPI.
     */

    pool = Array.from(
      { length: 1025 },
      (_, i) => ({
        id: i + 1,
        mega: false
      })
    );
  }


  /*
   * Mélange complet
   */

  pool = shuffle(pool);


  /*
   * Nombre de Pokémon affichés
   */

  const count =
    window.innerWidth <= 600
      ? 42
      : 75;


  /*
   * Pas de doublon
   */

  const selected = [];

  const used = new Set();

  for (const pokemon of pool) {

    const key =
      pokemon.mega
        ? `mega-${pokemon.id}`
        : `normal-${pokemon.id}`;

    if (used.has(key)) continue;

    used.add(key);

    selected.push(pokemon);

    if (selected.length >= count) break;
  }


  /*
   * Placement sans chevauchement
   */

  const placed = [];

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const minGap =
    screenWidth <= 600
      ? 18
      : 14;


  selected.forEach((pokemon, index) => {

    let x;
    let y;
    let size;

    let valid = false;

    let attempts = 0;


    while (!valid && attempts < 500) {

      /*
       * Taille aléatoire
       */

      size =
        screenWidth <= 600
          ? 38 + Math.random() * 28
          : 45 + Math.random() * 35;


      /*
       * Position
       */

      x =
        size / 2 +
        Math.random() *
        (screenWidth - size);

      y =
        size / 2 +
        Math.random() *
        (screenHeight - size);


      /*
       * Vérification des distances
       */

      valid = placed.every(existing => {

        const dx = existing.x - x;
        const dy = existing.y - y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        const requiredDistance =
          (existing.size + size) / 2 +
          minGap;

        return distance >= requiredDistance;
      });


      attempts++;
    }


    /*
     * Si aucun emplacement parfait n'est trouvé,
     * on ne crée PAS le Pokémon.
     *
     * Ça évite les chevauchements.
     */

    if (!valid) return;


    placed.push({
      x,
      y,
      size
    });


    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    /*
     * SHINY
     *
     * Environ 12 % de chance
     */

    const shiny =
      Math.random() < 0.12;


    let src;


    if (pokemon.mega) {

      /*
       * Sprite Méga ROSA
       */

      src =
        shiny
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omega-ruby-alpha-sapphire/shiny/${pokemon.id}-mega.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omega-ruby-alpha-sapphire/${pokemon.id}-mega.png`;

    } else {

      /*
       * Sprite normal / shiny
       */

      src =
        shiny
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    }


    img.src = src;

    img.draggable = false;

    img.alt = "";


    /*
     * Position
     */

    img.style.left =
      `${x}px`;

    img.style.top =
      `${y}px`;


    /*
     * Taille
     */

    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /*
     * Animation différente
     * pour chaque Pokémon
     */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 8}s`
    );

    img.style.setProperty(
      "--delay",
      `${Math.random() * -12}s`
    );


    /*
     * Légère rotation aléatoire
     */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    pokemonBackground.appendChild(img);

  });

}

    placed.push({
      x,
      y,
      size
    });

    const img = document.createElement("img");

    img.className = "bg-pokemon";

    img.src =
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    img.draggable = false;

    img.style.left = `${x}%`;
    img.style.top = `${y}%`;

    img.style.width = `${size}px`;
    img.style.height = `${size}px`;

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 9}s`
    );

    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );

    // Chaque Pokémon a une animation légèrement différente
    img.style.animationDelay =
      `${Math.random() * -10}s`;

    pokemonBackground.appendChild(img);
  });
}


/*
 * Page d'accueil :
 * Pokémon de toutes les régions.
 */

createPokemonBackground("all");


/*
 * Quand on clique sur Hoenn :
 *
 * Pour l'instant on envoie vers :
 * pokedex/hoenn/
 *
 * La page Hoenn pourra ensuite proposer :
 * - Pokédex régional
 * - Mégadex
 * - Pokédex national
 */

document.querySelectorAll(".region-card").forEach(button => {

  button.addEventListener("click", () => {

    const region = button.dataset.region;

    if (region === "hoenn") {

      window.location.href =
        "pokedex/hoenn/";

    }

  });

});
