/* =========================================================
   POKÉDEX - ACCUEIL
   1025 POKÉMON + FORMES SPÉCIALES
   STRUCTURE :
   speciesId / name / normal / shiny / mega
   ========================================================= */

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const FORM_API =
  "https://pokeapi.co/api/v2/pokemon-form/?limit=2000";

const pokemonBackground =
  document.getElementById("pokemonBackground");


/* =========================================================
   1025 POKÉMON DE BASE
   ========================================================= */

const POKEMON = Array.from(
  { length: 1025 },
  (_, i) => {

    const id = i + 1;

    return {

      speciesId: id,

      name: `Pokémon #${id}`,

      normal:
        `${SPRITE}/${id}.png`,

      shiny:
        `${SPRITE}/shiny/${id}.png`,

      mega: false

    };

  }
);


/* =========================================================
   FORMES SPÉCIALES DE SECOURS
   =========================================================
   Si PokéAPI n'est pas accessible, ces formes restent
   disponibles.
   ========================================================= */

const SPECIAL_FORMS = [

  /* =========================
     MÉGA HOENN
     ========================= */

  {
    speciesId: 254,
    name: "Méga-Jungko",
    normal: `${SPRITE}/other/home/mega/254.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/254.png`,
    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",
    normal: `${SPRITE}/other/home/mega/257.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/257.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal: `${SPRITE}/other/home/mega/260.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/260.png`,
    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",
    normal: `${SPRITE}/other/home/mega/282.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/282.png`,
    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",
    normal: `${SPRITE}/other/home/mega/302.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/302.png`,
    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Galeking",
    normal: `${SPRITE}/other/home/mega/303.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/303.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal: `${SPRITE}/other/home/mega/308.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/308.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal: `${SPRITE}/other/home/mega/310.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/310.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal: `${SPRITE}/other/home/mega/319.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/319.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal: `${SPRITE}/other/home/mega/323.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/323.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal: `${SPRITE}/other/home/mega/334.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/334.png`,
    mega: true
  },

  {
    speciesId: 359,
    name: "Méga-Absol",
    normal: `${SPRITE}/other/home/mega/359.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/359.png`,
    mega: true
  },

  {
    speciesId: 362,
    name: "Méga-Oniglali",
    normal: `${SPRITE}/other/home/mega/362.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/362.png`,
    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",
    normal: `${SPRITE}/other/home/mega/373.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/373.png`,
    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",
    normal: `${SPRITE}/other/home/mega/376.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/376.png`,
    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",
    normal: `${SPRITE}/other/home/mega/380.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/380.png`,
    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",
    normal: `${SPRITE}/other/home/mega/381.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/381.png`,
    mega: true
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",
    normal: `${SPRITE}/other/home/mega/384.png`,
    shiny: `${SPRITE}/other/home/shiny/mega/384.png`,
    mega: true
  },


  /* =========================
     PRIMO-RÉSURGENCE
     ========================= */

  {
    speciesId: 383,
    name: "Primo-Groudon",
    normal: `${SPRITE}/other/home/383.png`,
    shiny: `${SPRITE}/other/home/shiny/383.png`,
    mega: false
  },

  {
    speciesId: 382,
    name: "Primo-Kyogre",
    normal: `${SPRITE}/other/home/382.png`,
    shiny: `${SPRITE}/other/home/shiny/382.png`,
    mega: false
  },


  /* =========================
     DEOXYS
     ========================= */

  {
    speciesId: 386,
    name: "Deoxys - Forme Normale",
    normal: `${SPRITE}/other/home/386.png`,
    shiny: `${SPRITE}/other/home/shiny/386.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys - Forme Attaque",
    normal: `${SPRITE}/other/home/386-attack.png`,
    shiny: `${SPRITE}/other/home/shiny/386-attack.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys - Forme Défense",
    normal: `${SPRITE}/other/home/386-defense.png`,
    shiny: `${SPRITE}/other/home/shiny/386-defense.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys - Forme Vitesse",
    normal: `${SPRITE}/other/home/386-speed.png`,
    shiny: `${SPRITE}/other/home/shiny/386-speed.png`,
    mega: false
  },


  /* =========================
     KYUREM
     ========================= */

  {
    speciesId: 646,
    name: "Kyurem Blanc",
    normal: `${SPRITE}/other/home/646-white.png`,
    shiny: `${SPRITE}/other/home/shiny/646-white.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Noir",
    normal: `${SPRITE}/other/home/646-black.png`,
    shiny: `${SPRITE}/other/home/shiny/646-black.png`,
    mega: false
  },


  /* =========================
     NECROZMA
     ========================= */

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


  /* =========================
     SHAYMIN
     ========================= */

  {
    speciesId: 492,
    name: "Shaymin - Forme Céleste",
    normal: `${SPRITE}/other/home/492-sky.png`,
    shiny: `${SPRITE}/other/home/shiny/492-sky.png`,
    mega: false
  },


  /* =========================
     KELDEO
     ========================= */

  {
    speciesId: 647,
    name: "Keldeo - Forme Décidé",
    normal: `${SPRITE}/other/home/647-resolute.png`,
    shiny: `${SPRITE}/other/home/shiny/647-resolute.png`,
    mega: false
  },


  /* =========================
     MELOETTA
     ========================= */

  {
    speciesId: 648,
    name: "Meloetta - Forme Chant",
    normal: `${SPRITE}/other/home/648-aria.png`,
    shiny: `${SPRITE}/other/home/shiny/648-aria.png`,
    mega: false
  },

  {
    speciesId: 648,
    name: "Meloetta - Forme Danse",
    normal: `${SPRITE}/other/home/648-pirouette.png`,
    shiny: `${SPRITE}/other/home/shiny/648-pirouette.png`,
    mega: false
  },


  /* =========================
     ZYGARDE
     ========================= */

  {
    speciesId: 718,
    name: "Zygarde 10%",
    normal: `${SPRITE}/other/home/718-10.png`,
    shiny: `${SPRITE}/other/home/shiny/718-10.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde 50%",
    normal: `${SPRITE}/other/home/718.png`,
    shiny: `${SPRITE}/other/home/shiny/718.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde Parfait",
    normal: `${SPRITE}/other/home/718-complete.png`,
    shiny: `${SPRITE}/other/home/shiny/718-complete.png`,
    mega: false
  },


  /* =========================
     ZACIAN / ZAMAZENTA
     ========================= */

  {
    speciesId: 888,
    name: "Zacian Épée Suprême",
    normal: `${SPRITE}/other/home/888-crowned.png`,
    shiny: `${SPRITE}/other/home/shiny/888-crowned.png`,
    mega: false
  },

  {
    speciesId: 889,
    name: "Zamazenta Bouclier Suprême",
    normal: `${SPRITE}/other/home/889-crowned.png`,
    shiny: `${SPRITE}/other/home/shiny/889-crowned.png`,
    mega: false
  }

];


/* =========================================================
   FORMES HOENN
   ========================================================= */

const HOENN_FORM_NAMES = [

  "deoxys",

  "groudon-primal",

  "kyogre-primal",

  "rayquaza-mega",

  "sceptile-mega",

  "blaziken-mega",

  "swampert-mega",

  "gardevoir-mega",

  "sableye-mega",

  "mawile-mega",

  "aggron-mega",

  "medicham-mega",

  "manectric-mega",

  "sharpedo-mega",

  "camerupt-mega",

  "altaria-mega",

  "banette-mega",

  "absol-mega",

  "glalie-mega",

  "salamence-mega",

  "metagross-mega",

  "latias-mega",

  "latios-mega"

];


/* =========================================================
   CONVERSION D'UNE FORME POKÉAPI
   ========================================================= */

function convertApiForm(form) {

  if (!form || !form.sprites) {
    return null;
  }

  const normal =
    form.sprites.front_default;

  const shiny =
    form.sprites.front_shiny;

  if (!normal) {
    return null;
  }

  const speciesUrl =
    form.pokemon &&
    form.pokemon.url;

  let speciesId = null;

  if (speciesUrl) {

    const parts =
      speciesUrl
        .split("/")
        .filter(Boolean);

    speciesId =
      Number(parts[parts.length - 1]);

  }

  if (!speciesId) {
    return null;
  }

  let name =
    form.form_name ||
    form.name ||
    "Forme spéciale";

  name =
    name
      .replaceAll("-", " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  return {

    speciesId,

    name,

    normal,

    shiny: shiny || normal,

    mega:
      Boolean(form.is_mega)

  };

}


/* =========================================================
   CHARGEMENT DES FORMES POKÉAPI
   ========================================================= */

async function loadApiForms() {

  try {

    const response =
      await fetch(FORM_API, {
        cache: "no-store"
      });

    if (!response.ok) {
      throw new Error("PokéAPI inaccessible");
    }

    const data =
      await response.json();

    if (!data.results) {
      throw new Error("Réponse invalide");
    }

    const forms = [];

    /*
     * Les résultats de la liste ne contiennent
     * pas directement les sprites.
     *
     * On récupère donc chaque forme.
     */

    const requests =
      data.results.map(async item => {

        try {

          const r =
            await fetch(item.url);

          if (!r.ok) return null;

          const form =
            await r.json();

          return convertApiForm(form);

        } catch {

          return null;

        }

      });


    /*
     * On limite les requêtes simultanées
     * pour éviter de surcharger le téléphone.
     */

    const results =
      await Promise.all(requests);

    results.forEach(form => {

      if (form) {
        forms.push(form);
      }

    });

    return forms;

  } catch (error) {

    console.warn(
      "Impossible de charger les formes PokéAPI.",
      error
    );

    return [];

  }

}


/* =========================================================
   SUPPRESSION DES DOUBLONS
   ========================================================= */

function uniquePokemon(list) {

  const seen =
    new Set();

  const result = [];

  for (const pokemon of list) {

    if (!pokemon) continue;

    if (!pokemon.normal) continue;

    /*
     * Une espèce normale :
     * speciesId + normal
     *
     * Une forme :
     * speciesId + nom + normal
     */

    const key =
      [
        pokemon.speciesId,
        pokemon.name,
        pokemon.normal
      ]
      .join("|");

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);

    result.push(pokemon);

  }

  return result;

}


/* =========================================================
   MÉLANGE
   ========================================================= */

function shuffle(array) {

  const copy =
    [...array];

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
   TEST DE POSITION
   ========================================================= */

function positionIsValid(
  x,
  y,
  positions,
  minDistance
) {

  return positions.every(pos => {

    const dx =
      pos.x - x;

    const dy =
      pos.y - y;

    return (
      Math.sqrt(
        dx * dx +
        dy * dy
      ) > minDistance
    );

  });

}


/* =========================================================
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground(
  region = "all",
  specialForms = []
) {

  if (!pokemonBackground) {
    return;
  }

  pokemonBackground.innerHTML = "";

  let pool = [];


  /* =========================
     POKÉMON NORMAUX
     ========================= */

  if (region === "hoenn") {

    pool =
      POKEMON
        .filter(
          p =>
            p.speciesId >= 252 &&
            p.speciesId <= 386
        );

  } else {

    pool =
      [...POKEMON];

  }


  /* =========================
     FORMES SPÉCIALES
     ========================= */

  let forms =
    [...specialForms];


  if (region === "hoenn") {

    forms =
      forms.filter(form => {

        return (
          form.speciesId >= 252 &&
          form.speciesId <= 386
        );

      });

  }


  pool =
    uniquePokemon(
      [
        ...pool,
        ...forms
      ]
    );


  /* =========================
     MÉLANGE
     ========================= */

  pool =
    shuffle(pool);


  /* =========================
     NOMBRE DE POKÉMON
     ========================= */

  const amount =
    window.innerWidth <= 600
      ? 38
      : 70;


  const selected =
    pool.slice(
      0,
      Math.min(
        amount,
        pool.length
      )
    );


  /* =========================
     POSITIONS
     ========================= */

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
        5 +
        Math.random() * 90;


      valid =
        positionIsValid(
          x,
          y,
          positions,
          window.innerWidth <= 600
            ? 11
            : 9
        );


      tries++;

    }


    /*
     * Si aucune position correcte
     * n'a été trouvée, on ignore
     * simplement ce Pokémon.
     */

    if (!valid) {
      return;
    }


    positions.push({
      x,
      y
    });


    /* =========================
       IMAGE
       ========================= */

    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    /*
     * Shiny :
     * environ 12 %
     */

    const shiny =
      Math.random() < 0.12;


    img.src =
      shiny && pokemon.shiny
        ? pokemon.shiny
        : pokemon.normal;


    img.alt =
      pokemon.name;


    img.draggable =
      false;


    img.loading =
      "lazy";


    /*
     * Si une image ne fonctionne pas,
     * elle est retirée.
     */

    img.onerror =
      () => {

        img.remove();

      };


    /* =========================
       POSITION
       ========================= */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /* =========================
       TAILLE
       ========================= */

    const size =
      window.innerWidth <= 600

        ? 45 +
          Math.random() * 25

        : 55 +
          Math.random() * 35;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /* =========================
       ROTATION
       ========================= */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    /* =========================
       ANIMATION
       ========================= */

    img.style.setProperty(
      "--duration",
      `${7 + Math.random() * 8}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -10}s`
    );


    pokemonBackground
      .appendChild(img);

  });

}


/* =========================================================
   INITIALISATION
   ========================================================= */

async function initBackground() {

  /*
   * On commence immédiatement avec les
   * 1025 Pokémon + les formes de secours.
   */

  createPokemonBackground(
    "all",
    SPECIAL_FORMS
  );


  /*
   * Puis on essaye de récupérer toutes
   * les formes connues par PokéAPI.
   */

  const apiForms =
    await loadApiForms();


  /*
   * On ajoute les formes récupérées.
   */

  const allForms =
    uniquePokemon(
      [
        ...SPECIAL_FORMS,
        ...apiForms
      ]
    );


  /*
   * On reconstruit le fond avec
   * la liste complète.
   */

  createPokemonBackground(
    "all",
    allForms
  );

}


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

        if (region === "hoenn") {

          window.location.href =
            "pokedex/hoenn/";

        }

      }
    );

  });


/* =========================================================
   LANCEMENT
   ========================================================= */

initBackground();
