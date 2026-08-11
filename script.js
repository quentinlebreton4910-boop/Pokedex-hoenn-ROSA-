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


/*
    Coordonnées de référence :
    628 × 393 px.

    L'image réelle peut être affichée
    en 640 × 420 px.

    Le SVG est étiré exactement
    avec l'image afin que les coordonnées
    restent au bon endroit.
*/


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
        [476, 86, 530, 160],

    "CHENAL 125":
        [541, 87, 598, 158],

    "CHENAL 126":
        [474, 173, 530, 252],

    "CHENAL 127":
        [540, 174, 598, 250],

    "CHENAL 128":
        [542, 261, 596, 275],

    "CHENAL 129":
        [560, 282, 598, 296],

    "CHENAL 130":
        [500, 282, 548, 301],

    "CHENAL 131":
        [434, 282, 484, 300],

    "CHENAL 132":
        [343, 281, 394, 299],

    "CHENAL 133":
        [276, 282, 334, 298],

    "CHENAL 134":
        [213, 283, 268, 300]

};


const mapPlaces = {

    "ÉTERNARA":
        [613, 268, 17],

    "ROUTE VICTOIRE":
        [614, 243, 14],

    "LIGUE POKÉMON":
        [613, 221, 14],

    "GROTTE TRÉFONDS":
        [586, 120, 14],

    "ALGATIA":
        [558, 150, 27],

    "CAVERNE FONDMER":
        [553, 266, 14],

    "PLAGE SECRÈTE":
        [592, 313, 14],

    "CHAMP FLEURI SECRET":
        [503, 268, 14],

    "ATALANOPOLIS":
        [494, 232, 17],

    "ÎLOT SECRET":
        [460, 235, 16],

    "GROTTE ORIGINE":
        [460, 200, 13],

    "PACIFIVILLE":
        [416, 290, 16],

    "ÎLE DU SUD":
        [298, 369, 14],

    "LAVANDIA SEA":
        [160, 354, 15],

    "MYOKARA":
        [63, 378, 16],

    "GROTTE GRANITE":
        [41, 378, 15],

    "POIVRESSEL":
        [195, 301, 26],

    "BOURG-EN-VOL":
        [108, 313, 16],

    "ROSYÈRES":
        [108, 269, 16],

    "CLÉMENTI-VILLE":
        [41, 269, 14],

    "BOIS CLÉMENTI":
        [13, 222, 16],

    "MÉROUVILLE":
        [19, 170, 26],

    "TUNNEL MÉRAZON":
        [110, 158, 13],

    "VERGAZON":
        [108, 180, 13],

    "VERMILAVA":
        [130, 136, 14],

    "SENTIER SINUROC":
        [142, 113, 15],

    "MONT CHIMNÉE":
        [140, 91, 14],

    "CHEMIN ARDENT":
        [162, 113, 14],

    "AUTÉQUIA":
        [85, 49, 16],

    "SITE MÉTÉORE":
        [31, 91, 14],

    "LAVANDIA":
        [209, 182, 25],

    "NEW LAVANDIA":
        [216, 204, 16],

    "CIMETRONELLE":
        [284, 48, 15],

    "PARC SAFARI":
        [361, 93, 14],

    "MONT MÉMORIA":
        [389, 152, 15],

    "NÉNUCRIQUE":
        [450, 114, 25]

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

    /*
        IMPORTANT :

        Le SVG est maintenant en position
        ABSOLUE au-dessus de l'image.

        Il ne peut donc plus créer une
        deuxième carte en dessous.
    */

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

        /*
            Si on a demandé une route précise,
            on n'affiche QUE celle-ci.
        */

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


            /*
                Pointillés directement
                dans le SVG.

                Pas besoin de CSS.
            */

            svg += `

                <rect
                    x="${x1}"
                    y="${y1}"
                    width="${routeWidth}"
                    height="${routeHeight}"
                    rx="3"
                    ry="3"

                    fill="none"

                    stroke="#e3350d"
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

                    fill="rgba(227,53,13,0.12)"

                    stroke="#e3350d"
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


    /* =========================
       AUCUNE LOCALISATION
    ========================= */

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


    /* =========================
       CRÉATION MARQUEURS
    ========================= */

    const markerData =
        createMapMarkers(
            locations,
            selectedLocation
        );


    /* =========================
       LIEU DEMANDÉ INCONNU
    ========================= */

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


    /* =========================
       CARTE
    ========================= */

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

<div class="detailNumber">
    #${String(
        pokemon.id
    ).padStart(3, "0")}
</div>

<div class="detailNumber">
    #${String(
        pokemon.id
    ).padStart(3, "0")}
</div>


            <img
                src="${image}"
                alt="${pokemon.name}"
            >


            <h2>
                ${pokemon.name}
            </h2>


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


            <!-- BOUTON MAP -->

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
