let P = [];
let state = JSON.parse(localStorage.getItem("hoennState") || "{}");
let filter = "all";
let deferredInstallPrompt = null;

/* =========================
   SÉLECTEUR
========================= */

const $ = (selector) => document.querySelector(selector);


/* =========================
   SAUVEGARDE
========================= */

function save() {

    localStorage.setItem(
        "hoennState",
        JSON.stringify(state)
    );

}


/* =========================
   ÉTAT DES POKÉMON
========================= */

function getPokemonState(id) {

    return state[id] || {};

}


function status(id) {

    return getPokemonState(id).status || "missing";

}


function shiny(id) {

    return !!getPokemonState(id).shiny;

}


function favorite(id) {

    return !!getPokemonState(id).favorite;

}


function setState(id, patch) {

    state[id] = {
        ...getPokemonState(id),
        ...patch
    };

    save();
    render();

    if (
        $("#modal") &&
        !$("#modal").classList.contains("hidden")
    ) {
        openDetail(id);
    }

}


/* =========================
   PROGRESSION
========================= */

function progress() {

    const obtained = P.filter(
        p => status(p.id) === "obtained"
    ).length;

    const requiredObtained = P.filter(
        p =>
            p.requiredForCompletion &&
            status(p.id) === "obtained"
    ).length;

    const percentage = P.length
        ? Math.round(
            (obtained / P.length) * 100
        )
        : 0;

    if ($("#progressText"))
        $("#progressText").textContent =
            `${obtained} / ${P.length}`;

    if ($("#percent"))
        $("#percent").textContent =
            `${percentage}%`;

    if ($("#bar"))
        $("#bar").style.width =
            `${percentage}%`;

    if ($("#obtainedCount"))
        $("#obtainedCount").textContent =
            `${obtained} obtenus`;

    if ($("#todoCount"))
        $("#todoCount").textContent =
            `${P.length - obtained} à faire`;

    const subprogress =
        document.querySelector(
            ".progressCard .subprogress"
        );

    if (subprogress) {

        subprogress.title =
            `Complétion du Pokédex régional : ` +
            `${requiredObtained}/208 requis`;

    }

}


/* =========================
   RECHERCHE / FILTRES
========================= */

function matches(pokemon) {

    const search =
        $("#search")
            ? $("#search")
                .value
                .trim()
                .toLowerCase()
            : "";

    if (
        search &&
        !pokemon.name
            .toLowerCase()
            .includes(search) &&
        !String(pokemon.id)
            .padStart(3, "0")
            .includes(search)
    ) {
        return false;
    }

    const s = status(pokemon.id);

    switch (filter) {

        case "obtained":
            return s === "obtained";

        case "progress":
            return s === "progress";

        case "missing":
            return s === "missing";

        case "impossible":
            return s === "impossible";

        case "favorite":
            return favorite(pokemon.id);

        case "shiny":
            return shiny(pokemon.id);

        default:
            return true;

    }

}


/* =========================
   CARTE POKÉMON
========================= */

function card(pokemon) {

    const s = status(pokemon.id);
    const isShiny = shiny(pokemon.id);
    const isFavorite = favorite(pokemon.id);

    const image =
        isShiny
            ? pokemon.shiny
            : pokemon.sprite;

    const date =
        getPokemonState(
            pokemon.id
        ).obtainedDate;

    return `

        <article
            class="card ${s === "obtained" ? "done" : ""}"
            onclick="openDetail(${pokemon.id})"
        >

            <button
                class="fav"
                onclick="
                    event.stopPropagation();
                    setState(
                        ${pokemon.id},
                        {
                            favorite:
                                !favorite(${pokemon.id})
                        }
                    )
                "
            >
                ${isFavorite ? "⭐" : "☆"}
            </button>

            <div class="num">
                #${String(pokemon.id).padStart(3, "0")}
            </div>

            <img
                src="${image}"
                loading="lazy"
                alt="${pokemon.name}"
            >

            <div class="name">

                ${pokemon.name}

                ${
                    pokemon.requiredForCompletion
                        ? ""
                        : `<sup title="Non requis pour la complétion régionale">★</sup>`
                }

            </div>

            <div class="types">

                ${
                    (pokemon.types || [])
                        .map(
                            type =>
                                `<span class="type">${type}</span>`
                        )
                        .join("")
                }

            </div>

            <div class="state">

                <button
                    class="got"
                    title="Obtenu"
                    onclick="
                        event.stopPropagation();
                        markObtained(${pokemon.id})
                    "
                >
                    ✓
                </button>

                <button
                    class="doing"
                    title="En cours"
                    onclick="
                        event.stopPropagation();
                        setState(
                            ${pokemon.id},
                            {
                                status:'progress'
                            }
                        )
                    "
                >
                    ↻
                </button>

                <button
                    class="nope"
                    title="Impossible"
                    onclick="
                        event.stopPropagation();
                        setState(
                            ${pokemon.id},
                            {
                                status:'impossible'
                            }
                        )
                    "
                >
                    ×
                </button>

            </div>

            ${
                s === "obtained"
                    ? `<div class="completedBadge">✓ Terminé</div>`
                    : ""
            }

            ${
                isShiny
                    ? `<div class="shinyBadge">✨ Shiny</div>`
                    : ""
            }

            ${
                date
                    ? `<div class="dateBadge">${formatDate(date)}</div>`
                    : ""
            }

        </article>

    `;

}


/* =========================
   OBTENTION
========================= */

function markObtained(id) {

    setState(id, {

        status: "obtained",

        obtainedDate:
            getPokemonState(id)
                .obtainedDate ||
            new Date().toISOString()

    });

}


/* =========================
   AFFICHAGE
========================= */

function render() {

    progress();

    const grid = $("#grid");

    if (!grid)
        return;

    const filtered =
        P.filter(matches);

    if (!filtered.length) {

        grid.innerHTML = `
            <div class="empty">
                🔍 Aucun Pokémon ne correspond.
            </div>
        `;

        return;
    }

    grid.innerHTML =
        filtered
            .map(card)
            .join("");

}


/* =========================================================
   CARTE DE HOENN
========================================================= */

const mapRoutes = {

    "ROUTE 101":
        [100, 284, 116, 296],

    "ROUTE 102":
        [59, 260, 94, 276],

    "ROUTE 103":
        [102, 241, 179, 255],

    "ROUTE 104":
        [29, 278, 11, 201],

    "CHENAL 105":
        [11, 286, 28, 338],

    "CHENAL 106":
        [11, 349, 68, 363],

    "CHENAL 107":
        [81, 372, 131, 385],

    "CHENAL 108":
        [148, 371, 179, 388],

    "CHENAL 109":
        [186, 333, 203, 386],

    "ROUTE 110":
        [203, 270, 189, 201],

    "ROUTE 111":
        [202, 164, 191, 45],

    "ROUTE 112":
        [180, 149, 148, 129],

    "ROUTE 113":
        [174, 39, 101, 58],

    "ROUTE 114":
        [63, 46, 45, 99],

    "ROUTE 115":
        [27, 139, 8, 90],

    "ROUTE 116":
        [32, 154, 95, 166],

    "ROUTE 117":
        [124, 173, 175, 185],

    "ROUTE 118":
        [237, 172, 266, 189],

    "ROUTE 119":
        [270, 163, 256, 46],

    "ROUTE 120":
        [298, 41, 311, 122],

    "ROUTE 121":
        [323, 108, 418, 122],

    "CHENAL 122":
        [359, 132, 395, 164],

    "ROUTE 123":
        [280, 173, 400, 187],

    "CHENAL 124":
        [461, 76, 525, 158],

    "CHENAL 125":
        [525, 76, 589, 158],

    "CHENAL 126":
        [461, 158, 525, 242],

    "CHENAL 127":
        [525, 158, 589, 242],

    "CHENAL 128":
        [525, 242, 589, 261],

    "CHENAL 129":
        [548, 261, 591, 281],

    "CHENAL 130":
        [484, 261, 546, 281],

    "CHENAL 131":
        [419, 261, 483, 281],

    "CHENAL 132":
        [333, 261, 394, 281],

    "CHENAL 133":
        [267, 261, 331, 281],

    "CHENAL 134":
        [203, 261, 265, 281]

};


const mapPlaces = {

    "ÉTERNARA":
        [600, 252, 17],

    "ROUTE VICTOIRE":
        [600, 228, 14],

    "LIGUE POKÉMON":
        [600, 204, 17],

    "GROTTE TRÉFONDS":
        [572, 111, 14],

    "ALGATIA":
        [546, 139, 27],

    "CAVERNE FONDMER":
        [540, 249, 14],

    "PLAGE SECRÈTE":
        [578, 292, 14],

    "CHAMP FLEURI SECRET":
        [491, 249, 14],

    "ATALANOPOLIS":
        [485, 219, 17],

    "ÎLOT SECRET":
        [450, 219, 14],

    "GROTTE ORIGINE":
        [452, 191, 14],

    "PACIFIVILLE":
        [406, 272, 17],

    "ÎLE DU SUD":
        [292, 345, 14],

    "LAVANDIA SEA":
        [156, 332, 14],

    "MYOKARA":
        [61, 354, 17],

    "GROTTE GRANITE":
        [38, 355, 14],

    "POIVRESSEL":
        [191, 281, 27],

    "BOURG-EN-VOL":
        [104, 293, 17],

    "ROSYÈRES":
        [104, 251, 17],

    "CLÉMENTI-VILLE":
        [40, 251, 17],

    "BOIS CLÉMENTI":
        [11, 207, 14],

    "MÉROUVILLE":
        [18, 158, 27],

    "TUNNEL MÉRAZON":
        [104, 144, 14],

    "VERGAZON":
        [104, 169, 17],

    "VERMILAVA":
        [126, 127, 17],

    "SENTIER SINUROC":
        [138, 107, 14],

    "MONT CHIMNÉE":
        [138, 85, 14],

    "CHEMIN ARDENT":
        [161, 107, 14],

    "AUTÉQUIA":
        [83, 46, 17],

    "SITE MÉTÉORE":
        [29, 86, 14],

    "LAVANDIA":
        [202, 169, 27],

    "NEW LAVANDIA":
        [212, 191, 14],

    "CIMETRONELLE":
        [277, 46, 17],

    "PARC SAFARI":
        [355, 88, 14],

    "MONT MÉMORIA":
        [380, 144, 14],

    "NÉNUCRIQUE":
        [439, 107, 27]

};


/* =========================
   NORMALISATION
========================= */

function normalizeLocationName(name) {

    return String(name || "")
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* =========================
   RECHERCHE ROUTE
========================= */

function findMapRoute(name) {

    const wanted =
        normalizeLocationName(name);

    for (const key in mapRoutes) {

        if (
            normalizeLocationName(key) ===
            wanted
        ) {

            return mapRoutes[key];

        }

    }

    return null;

}


/* =========================
   RECHERCHE LIEU
========================= */

function findMapPlace(name) {

    const wanted =
        normalizeLocationName(name);

    for (const key in mapPlaces) {

        if (
            normalizeLocationName(key) ===
            wanted
        ) {

            return mapPlaces[key];

        }

    }

    return null;

}


/* =========================
   LIEUX DU POKÉMON
========================= */

function getPokemonLocations(pokemon) {

    if (!pokemon.location)
        return [];

    const location =
        String(pokemon.location)
            .trim();

    if (
        !location ||
        normalizeLocationName(location) ===
        "INCONNUE"
    ) {

        return [];

    }

    return location
        .split(",")
        .map(
            place => place.trim()
        )
        .filter(Boolean);

}


/* =========================================================
   CRÉATION DES MARQUEURS
========================================================= */

function createMapMarkers(
    locations,
    selectedLocation = null
) {

    const width = 628;
    const height = 393;

    let svg = `

        <svg
            class="mapOverlay"
            viewBox="0 0 ${width} ${height}"
            preserveAspectRatio="none"
            style="
                position:absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:5;
                pointer-events:none;
                overflow:visible;
            "
        >

    `;

    let foundSomething = false;


    locations.forEach(location => {

        if (
            selectedLocation &&
            normalizeLocationName(location) !==
            normalizeLocationName(selectedLocation)
        ) {

            return;

        }


        const route =
            findMapRoute(location);

        const place =
            findMapPlace(location);


        /* =========================
           ROUTE / CHENAL
        ========================= */

        if (route) {

            const x1 = Math.min(
                route[0],
                route[2]
            );

            const y1 = Math.min(
                route[1],
                route[3]
            );

            const routeWidth =
                Math.abs(
                    route[2] -
                    route[0]
                );

            const routeHeight =
                Math.abs(
                    route[3] -
                    route[1]
                );


            svg += `

                <rect
                    x="${x1}"
                    y="${y1}"
                    width="${routeWidth}"
                    height="${routeHeight}"
                    rx="3"
                    ry="3"

                    fill="none"

                    stroke="white"
                    stroke-width="2.5"

                    stroke-dasharray="6 4"

                    vector-effect="non-scaling-stroke"

                    opacity="1"
                />

            `;

            foundSomething = true;

            return;

        }


        /* =========================
           VILLE / LIEU
        ========================= */

        if (place) {

            const x = place[0];
            const y = place[1];
            const r = place[2];


            svg += `

                <circle
                    cx="${x}"
                    cy="${y}"
                    r="${r}"

                    fill="none"
stroke="white"
                    stroke-width="2.5"

                    vector-effect="non-scaling-stroke"

                    opacity="1"
                />

            `;

            foundSomething = true;

        }

    });


    svg += `

        </svg>

    `;


    return {
        svg,
        foundSomething
    };

}


/* =========================
   OUVRIR LA CARTE
========================= */

function openMap(
    id,
    selectedLocation = null
) {

    const pokemon =
        P.find(
            p => p.id === id
        );

    if (!pokemon)
        return;


    const locations =
        getPokemonLocations(
            pokemon
        );


    if (!locations.length) {

        $("#mapContent").innerHTML = `

            <div class="mapHeader">

                <h2>
                    🗺️ Carte de Hoenn
                </h2>

                <button
                    class="mapClose"
                    onclick="closeMap()"
                >
                    ×
                </button>

            </div>

            <p class="mapPokemonName">
                ${pokemon.name}
            </p>

            <div
                class="mapImageContainer"
                style="
                    position:relative;
                "
            >

                <img
                    class="hoennMap"
                    src="hoenn-map.png"
                    alt="Carte de Hoenn"
                >

                <div
                    class="mapUnknown"
                    style="
                        position:absolute;
                        left:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        z-index:10;
                        padding:12px 20px;
                        border-radius:12px;
                        background:rgba(0,0,0,0.75);
                        color:white;
                        font-size:20px;
                        font-weight:700;
                    "
                >
                    Inconnue
                </div>

            </div>

        `;

        $("#mapModal")
            .classList
            .remove("hidden");

        return;

    }


    const markerData =
        createMapMarkers(
            locations,
            selectedLocation
        );


    if (
        selectedLocation &&
        !markerData.foundSomething
    ) {

        $("#mapContent").innerHTML = `

            <div class="mapHeader">

                <h2>
                    🗺️ Carte de Hoenn
                </h2>

                <button
                    class="mapClose"
                    onclick="closeMap()"
                >
                    ×
                </button>

            </div>

            <p class="mapPokemonName">
                ${pokemon.name}
            </p>

            <div
                class="mapImageContainer"
                style="
                    position:relative;
                "
            >

                <img
                    class="hoennMap"
                    src="hoenn-map.png"
                    alt="Carte de Hoenn"
                >

                <div
                    class="mapUnknown"
                    style="
                        position:absolute;
                        left:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        z-index:10;
                        padding:12px 20px;
                        border-radius:12px;
                        background:rgba(0,0,0,0.75);
                        color:white;
                        font-size:18px;
                        font-weight:700;
                    "
                >
                    ${selectedLocation}
                </div>

            </div>

        `;

        $("#mapModal")
            .classList
            .remove("hidden");

        return;

    }


    $("#mapContent").innerHTML = `

        <div class="mapHeader">

            <h2>
                🗺️ Carte de Hoenn
            </h2>

            <button
                class="mapClose"
                onclick="closeMap()"
            >
                ×
            </button>

        </div>

        <p class="mapPokemonName">
            ${pokemon.name}
        </p>

        <div
            class="mapImageContainer"
            style="
                position:relative;
                width:100%;
            "
        >

            <img
                class="hoennMap"
                src="hoenn-map.png"
                alt="Carte de Hoenn"
            >

            ${markerData.svg}

        </div>

        <div class="mapLocations">

            <b>
                📍 Lieux où trouver
                ${pokemon.name} :
            </b>

            <br><br>

            ${
                locations
                    .map(location => `

                        <button
                            class="mapLocationButton"
                            onclick="
                                openMap(
                                    ${pokemon.id},
                                    '${location
                                        .replace(
                                            /'/g,
                                            "\\'"
                                        )}'
                                )
                            "
                        >
                            ${location}
                        </button>

                    `)
                    .join(" · ")
            }

        </div>

    `;


    $("#mapModal")
        .classList
        .remove("hidden");

}


/* =========================
   FERMER LA CARTE
========================= */

function closeMap() {

    if ($("#mapModal")) {

        $("#mapModal")
            .classList
            .add("hidden");

    }

}


/* =========================
   ÉVOLUTIONS
========================= */

function evolutionLinks(
    pokemon
) {

    if (!pokemon.family) {

        return (
            pokemon.evolution ||
            "Aucune information"
        );

    }


    const family =
        P.filter(
            p =>
                p.family ===
                pokemon.family
        );


    if (family.length <= 1) {

        return (
            pokemon.evolution ||
            "Aucune évolution"
        );

    }


    return family
        .map(p => {

            if (
                p.id ===
                pokemon.id
            ) {

                return `
                    <strong>
                        ${p.name}
                    </strong>
                `;

            }


            return `

                <button
                    class="evolutionLink"
                    onclick="
                        event.stopPropagation();
                        openDetail(${p.id})
                    "
                >
                    ${p.name}
                </button>

            `;

        })
        .join(" → ");

}


/* =========================================================
   FICHE DÉTAILLÉE
========================================================= */

function openDetail(id) {

    const pokemon =
        P.find(
            p => p.id === id
        );

    if (!pokemon)
        return;


    const currentState =
        getPokemonState(id);

    const isShiny =
        shiny(id);

    const image =
        isShiny
            ? pokemon.shiny
            : pokemon.sprite;


    const evolution =
        evolutionLinks(
            pokemon
        );


    const location =
        pokemon.location ||
        "Information indisponible";


    const method =
        pokemon.method ||
        "Information indisponible";


    const egg =
        pokemon.egg ||
        "Information indisponible";

   /* =========================
   VERSION RO / SA
========================= */

let versionBadge = "";

if (pokemon.version === "RO") {
    versionBadge = `
        <div class="versionBadge versionRO">
            RO
        </div>
    `;
}

if (pokemon.version === "SA") {
    versionBadge = `
        <div class="versionBadge versionSA">
            SA
        </div>
    `;
}


    /* =========================
       LOCALISATIONS CLIQUABLES
    ========================= */

    let locationHTML;


    if (
        pokemon.location &&
        normalizeLocationName(
            pokemon.location
        ) !== "INCONNUE"
    ) {

        const locations =
            getPokemonLocations(
                pokemon
            );


        locationHTML =
            locations
                .map(location => `

                    <button
                        class="mapLocationButton"
                        onclick="
                            event.stopPropagation();
                            openMap(
                                ${pokemon.id},
                                '${location
                                    .replace(
                                        /'/g,
                                        "\\'"
                                    )}'
                            )
                        "
                    >
                        ${location}
                    </button>

                `)
                .join(" · ");


    } else {

        locationHTML =
            "Inconnue";

    }


    /* =========================
       POKÉMON PRÉCÉDENT / SUIVANT
    ========================= */

    const currentIndex =
        P.findIndex(
            p => p.id === id
        );


    const previous =
        currentIndex > 0
            ? P[currentIndex - 1]
            : null;


    const next =
        currentIndex <
            P.length - 1
            ? P[currentIndex + 1]
            : null;


    /* =========================
       FICHE
    ========================= */

    $("#detail").innerHTML = `

        <div class="detailNavigation">

            <button
                class="detailNav"
                ${
                    previous
                        ? `onclick="openDetail(${previous.id})"`
                        : "disabled"
                }
                title="Pokémon précédent"
            >
                ◀
            </button>

            <button
                class="detailClose"
                onclick="closeDetail()"
                title="Fermer"
            >
                ×
            </button>

            <button
                class="detailNav"
                ${
                    next
                        ? `onclick="openDetail(${next.id})"`
                        : "disabled"
                }
                title="Pokémon suivant"
            >
                ▶
            </button>

        </div>


        <!-- UN SEUL NUMÉRO, CENTRÉ SOUS LA CROIX -->

        <div class="detailNumber">
            #${String(
                pokemon.id
            ).padStart(3, "0")}
        </div>


        <div class="detailHero">

            <img
                src="${image}"
                alt="${pokemon.name}"
            >


            <h2>
    ${pokemon.name}
</h2>

${versionBadge}


            <div class="types">

                ${
                    (pokemon.types || [])
                        .map(
                            type =>
                                `<span class="type">${type}</span>`
                        )
                        .join("")
                }

            </div>

        </div>


        <div class="detail">


            <p>

                <b>
                    🌳 Évolution :
                </b>

                <br>

                ${evolution}

            </p>


            <p>

                <b>
                    📍 Où l'obtenir :
                </b>

                <br>

                ${locationHTML}

            </p>


            <p>

                <b>
                    🎣 Méthode :
                </b>

                <br>

                ${method}

            </p>


            <p>

                <b>
                    🥚 Œuf :
                </b>

                <br>

                ${egg}

            </p>


            <p>

                <b>
                    📖 Complétion :
                </b>

                <br>

                ${
                    pokemon.requiredForCompletion
                        ? "Compte parmi les 208 Pokémon requis."
                        : "Non requis pour compléter le Pokédex régional."
                }

            </p>


            ${
                currentState.obtainedDate
                    ? `

                        <p>

                            <b>
                                📅 Obtenu le :
                            </b>

                            <br>

                            ${formatDate(
                                currentState.obtainedDate
                            )}

                        </p>

                    `
                    : ""
            }


            <button
                class="mapButton"
                onclick="
                    openMap(${id})
                "
            >
                🗺️ Voir sur la carte
            </button>


            <div class="actions">


                <button
                    onclick="
                        markObtained(${id});
                        closeDetail()
                    "
                >
                    ✅ Obtenu
                </button>


                <button
                    onclick="
                        setState(
                            ${id},
                            {
                                status:'progress'
                            }
                        );
                        closeDetail()
                    "
                >
                    🔄 En cours
                </button>


                <button
                    onclick="
                        setState(
                            ${id},
                            {
                                status:'impossible'
                            }
                        );
                        closeDetail()
                    "
                >
                    🚫 Impossible
                </button>


                <button
                    onclick="
                        setState(
                            ${id},
                            {
                                favorite:
                                    !favorite(${id})
                            }
                        )
                    "
                >
                    ⭐ ${
                        favorite(id)
                            ? "Retirer des favoris"
                            : "Ajouter aux favoris"
                    }
                </button>


                <button
                    onclick="
                        setState(
                            ${id},
                            {
                                shiny:
                                    !shiny(${id})
                            }
                        )
                    "
                >
                    ✨ Shiny :
                    ${
                        shiny(id)
                            ? "oui"
                            : "non"
                    }
                </button>


                <button
                    onclick="
                        setState(
                            ${id},
                            {
                                status:'missing',
                                obtainedDate:null
                            }
                        );
                        closeDetail()
                    "
                >
                    ↩️ Réinitialiser
                </button>


            </div>


        </div>

    `;


    $("#modal")
        .classList
        .remove("hidden");

}


/* =========================
   FERMETURE FICHE
========================= */

function closeDetail() {

    if ($("#modal"))
        $("#modal")
            .classList
            .add("hidden");

    render();

}


/* =========================
   BOUTON FERMER
========================= */

if ($("#close"))
    $("#close").onclick =
        closeDetail;


/* =========================
   CLIC EXTÉRIEUR FICHE
========================= */

if ($("#modal")) {

    $("#modal").onclick =
        event => {

            if (
                event.target.id ===
                "modal"
            ) {

                closeDetail();

            }

        };

}


/* =========================
   CLIC EXTÉRIEUR CARTE
========================= */

if ($("#mapModal")) {

    $("#mapModal").onclick =
        event => {

            if (
                event.target.id ===
                "mapModal"
            ) {

                closeMap();

            }

        };

}


/* =========================
   RECHERCHE
========================= */

if ($("#search")) {

    $("#search").addEventListener(
        "input",
        render
    );

}


/* =========================
   FILTRES
========================= */

if ($("#filters")) {

    $("#filters").addEventListener(
        "click",
        event => {

            if (
                event.target.tagName !==
                "BUTTON"
            )
                return;


            document
                .querySelectorAll(
                    ".filters button"
                )
                .forEach(
                    button =>
                        button.classList
                            .remove(
                                "active"
                            )
                );


            event.target.classList
                .add("active");


            filter =
                event.target.dataset
                    .filter ||
                "all";


            render();

        }
    );

}


/* =========================
   THÈME
========================= */

function setTheme(theme) {

    document.body.classList.toggle(
        "dark",
        theme === "dark"
    );

    localStorage.setItem(
        "theme",
        theme
    );

}


if ($("#themeBtn")) {

    $("#themeBtn").onclick = () => {

        const dark =
            document.body.classList.contains(
                "dark"
            );


        setTheme(
            dark
                ? "light"
                : "dark"
        );

    };

}


if (
    localStorage.getItem(
        "theme"
    ) === "dark"
) {

    setTheme("dark");

}


/* =========================
   EXPORT
========================= */

if ($("#exportBtn")) {

    $("#exportBtn").onclick =
        () => {

            const data = {

                version: 4,

                exportedAt:
                    new Date()
                        .toISOString(),

                progression:
                    state

            };


            const blob =
                new Blob(
                    [
                        JSON.stringify(
                            data,
                            null,
                            2
                        )
                    ],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;


            link.download =
                "pokedex-hoenn-progression.json";


            link.click();


            URL.revokeObjectURL(
                url
            );

        };

}


/* =========================
   IMPORT
========================= */

if ($("#importFile")) {

    $("#importFile").onchange =
        event => {

            const file =
                event.target.files[0];

            if (!file)
                return;


            const reader =
                new FileReader();


            reader.onload =
                () => {

                    try {

                        const imported =
                            JSON.parse(
                                reader.result
                            );


                        if (
                            imported &&
                            imported.progression
                        ) {

                            state =
                                imported.progression;

                        } else {

                            state =
                                imported;

                        }


                        save();
                        render();


                        alert(
                            "Progression importée avec succès !"
                        );


                    } catch {

                        alert(
                            "Le fichier sélectionné est invalide."
                        );

                    }

                };


            reader.readAsText(
                file
            );

        };

}


/* =========================
   RESET
========================= */

if ($("#resetBtn")) {

    $("#resetBtn").onclick =
        () => {

            if (
                !confirm(
                    "⚠️ Effacer toute la progression ?"
                )
            ) {

                return;

            }


            state = {};


            save();


            render();

        };

}


/* =========================
   INSTALLATION PWA
========================= */

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredInstallPrompt =
            event;

        showInstallButton();

    }
);


function showInstallButton() {

    const button =
        $("#installBtn");

    const hint =
        $("#installHint");


    if (button)
        button.hidden = false;


    if (hint)
        hint.hidden = false;

}


if ($("#installBtn")) {

    $("#installBtn").onclick =
        async () => {

            if (
                !deferredInstallPrompt
            ) {

                return;

            }


            deferredInstallPrompt
                .prompt();


            await deferredInstallPrompt
                .userChoice;


            deferredInstallPrompt =
                null;


            $("#installBtn").hidden =
                true;

        };

}


window.addEventListener(
    "appinstalled",
    () => {

        deferredInstallPrompt =
            null;


        if ($("#installBtn"))
            $("#installBtn").hidden =
                true;


        if ($("#installHint"))
            $("#installHint").hidden =
                true;

    }
);


/* =========================
   SERVICE WORKER
========================= */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "service-worker.js"
                )
                .catch(
                    error =>
                        console.log(
                            "Service Worker :",
                            error
                        )
                );

        }
    );

}


/* =========================
   DATE
========================= */

function formatDate(date) {

    if (!date)
        return "";


    try {

        return new Date(date)
            .toLocaleDateString(
                "fr-FR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );

    } catch {

        return "";

    }

}


/* =========================
   CHARGEMENT DES DONNÉES
========================= */

fetch("pokemon.json")
    .then(response => {

        if (!response.ok) {

            throw new Error(
                "pokemon.json introuvable"
            );

        }

        return response.json();

    })

    .then(data => {

        P = data;

        render();

    })

    .catch(error => {

        console.error(error);

        if ($("#grid")) {

            $("#grid").innerHTML = `

                <div class="empty">

                    ❌ Impossible de charger
                    les données du Pokédex.

                </div>

            `;

        }

    });
