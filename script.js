let P = [];
let state = JSON.parse(localStorage.getItem("hoennState") || "{}");
let filter = "all";
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);

function save() {
    localStorage.setItem("hoennState", JSON.stringify(state));
}

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

    if ($("#modal") && !$("#modal").classList.contains("hidden")) {
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
        ? Math.round((obtained / P.length) * 100)
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
            `Complétion du Pokédex régional : ${requiredObtained}/208 requis`;
    }
}

/* =========================
   RECHERCHE / FILTRES
========================= */

function matches(pokemon) {

    const search =
        $("#search")
            ? $("#search").value.trim().toLowerCase()
            : "";

    if (
        search &&
        !pokemon.name.toLowerCase().includes(search) &&
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
        getPokemonState(pokemon.id).obtainedDate;

    return `
        <article
            class="card ${s === "obtained" ? "done" : ""}"
            onclick="openDetail(${pokemon.id})"
        >

            <button
                class="fav"
                onclick="
                    event.stopPropagation();
                    setState(${pokemon.id},{
                        favorite: !favorite(${pokemon.id})
                    })
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
                        setState(${pokemon.id},{
                            status:'progress'
                        })
                    "
                >
                    ↻
                </button>

                <button
                    class="nope"
                    title="Impossible"
                    onclick="
                        event.stopPropagation();
                        setState(${pokemon.id},{
                            status:'impossible'
                        })
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
            getPokemonState(id).obtainedDate ||
            new Date().toISOString()
    });
}

/* =========================
   AFFICHAGE
========================= */

function render() {

    progress();

    const grid = $("#grid");

    if (!grid) return;

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
        filtered.map(card).join("");
}

/* =========================
   ÉVOLUTIONS
========================= */

function evolutionLinks(pokemon) {

    if (!pokemon.family) {
        return pokemon.evolution ||
            "Aucune information";
    }

    const family = P.filter(
        p => p.family === pokemon.family
    );

    if (family.length <= 1) {
        return pokemon.evolution ||
            "Aucune évolution";
    }

    return family
        .map(p => {

            if (p.id === pokemon.id) {

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

/* =========================
   LIEUX DE LA CARTE
========================= */

/*
 * Coordonnées basées sur une carte
 * de 640 × 420 pixels.
 */

const mapLocations = {

    "Route 101": { x: 108, y: 290 },
    "Route 102": { x: 76, y: 268 },
    "Route 103": { x: 140, y: 248 },
    "Route 104": { x: 20, y: 240 },

    "Bois Clémenti": { x: 13, y: 222 },
    "Clémenti-Ville": { x: 41, y: 269 },
    "Bourg-en-vol": { x: 108, y: 313 },
    "Rosyères": { x: 108, y: 269 },
    "Mérouville": { x: 19, y: 170 },

    "Route 105": { x: 20, y: 312 },
    "Chenal 105": { x: 20, y: 312 },

    "Chenal 106": { x: 40, y: 356 },
    "Chenal 107": { x: 106, y: 378 },
    "Chenal 108": { x: 164, y: 380 },
    "Chenal 109": { x: 194, y: 360 },

    "Route 110": { x: 196, y: 235 },
    "Route 111": { x: 196, y: 105 },
    "Route 112": { x: 164, y: 139 },
    "Route 113": { x: 138, y: 49 },
    "Route 114": { x: 54, y: 73 },
    "Route 115": { x: 18, y: 115 },
    "Route 116": { x: 64, y: 160 },
    "Route 117": { x: 150, y: 179 },
    "Route 118": { x: 252, y: 180 },
    "Route 119": { x: 263, y: 105 },
    "Route 120": { x: 305, y: 81 },
    "Route 121": { x: 370, y: 115 },

    "Chenal 122": { x: 377, y: 148 },
    "Route 123": { x: 340, y: 180 },

    "Chenal 124": { x: 503, y: 123 },
    "Chenal 125": { x: 570, y: 123 },
    "Chenal 126": { x: 502, y: 212 },
    "Chenal 127": { x: 569, y: 212 },
    "Chenal 128": { x: 569, y: 268 },
    "Chenal 129": { x: 579, y: 289 },
    "Chenal 130": { x: 524, y: 291 },
    "Chenal 131": { x: 459, y: 291 },
    "Chenal 132": { x: 368, y: 290 },
    "Chenal 133": { x: 305, y: 290 },
    "Chenal 134": { x: 240, y: 291 },

    "Route Victoire": { x: 614, y: 243 },
    "Ligue Pokémon": { x: 613, y: 221 },
    "Éternara": { x: 613, y: 268 },

    "Grotte Tréfonds": { x: 586, y: 120 },
    "Algatia": { x: 558, y: 150 },
    "Caverne Fondmer": { x: 553, y: 266 },
    "Plage Secrète": { x: 592, y: 313 },
    "Champ Fleuri Secret": { x: 503, y: 268 },
    "Atalanopolis": { x: 494, y: 232 },
    "Îlot Secret": { x: 460, y: 235 },
    "Grotte Origine": { x: 460, y: 200 },
    "Pacifiville": { x: 416, y: 290 },
    "Île du Sud": { x: 298, y: 369 },
    "Lavandia Sea": { x: 160, y: 354 },
    "Myokara": { x: 63, y: 378 },
    "Grotte Granite": { x: 41, y: 378 },
    "Poivressel": { x: 195, y: 301 },
    "Tunnel Mérazon": { x: 110, y: 158 },
    "Vergazon": { x: 108, y: 180 },
    "Vermilava": { x: 130, y: 136 },
    "Sentier Sinuroc": { x: 142, y: 113 },
    "Mont Chimnée": { x: 140, y: 91 },
    "Chemin Ardent": { x: 162, y: 113 },
    "Autéquia": { x: 85, y: 49 },
    "Site Météore": { x: 31, y: 91 },
    "Lavandia": { x: 209, y: 182 },
    "New Lavandia": { x: 216, y: 204 },
    "Cimetronelle": { x: 284, y: 48 },
    "Parc Safari": { x: 361, y: 93 },
    "Mont Mémoria": { x: 389, y: 152 },
    "Nénucrique": { x: 450, y: 114 }
};

/*
 * Zones des routes et chenaux.
 * On utilise les coordonnées données
 * pour dessiner des zones en pointillés.
 */

const mapAreas = {

    "Route 101": [100, 284, 116, 296],
    "Route 102": [59, 260, 94, 276],
    "Route 103": [102, 241, 179, 255],
    "Route 104": [11, 201, 29, 278],

    "Chenal 105": [11, 286, 28, 338],
    "Chenal 106": [11, 349, 68, 363],
    "Chenal 107": [81, 372, 131, 385],
    "Chenal 108": [148, 371, 179, 388],
    "Chenal 109": [186, 333, 203, 386],

    "Route 110": [189, 201, 203, 270],
    "Route 111": [191, 45, 202, 164],
    "Route 112": [148, 129, 180, 149],
    "Route 113": [101, 39, 174, 58],
    "Route 114": [45, 46, 63, 99],
    "Route 115": [8, 90, 27, 139],
    "Route 116": [32, 154, 95, 166],
    "Route 117": [124, 173, 175, 185],
    "Route 118": [237, 172, 266, 189],
    "Route 119": [256, 46, 270, 163],
    "Route 120": [298, 41, 311, 122],
    "Route 121": [323, 108, 418, 122],

    "Chenal 122": [359, 132, 395, 164],

    "Route 123": [280, 173, 400, 187],

    "Chenal 124": [476, 86, 530, 160],
    "Chenal 125": [541, 87, 598, 158],
    "Chenal 126": [474, 173, 530, 252],
    "Chenal 127": [540, 174, 598, 250],
    "Chenal 128": [542, 261, 596, 275],
    "Chenal 129": [560, 282, 598, 296],
    "Chenal 130": [500, 282, 548, 301],
    "Chenal 131": [434, 282, 484, 300],
    "Chenal 132": [343, 281, 394, 299],
    "Chenal 133": [276, 282, 334, 298],
    "Chenal 134": [213, 283, 268, 300]
};

function normalizeLocationName(name) {

    return name
        .trim()
        .replace(/\s+/g, " ")
        .replace(/^Route Victoire$/i, "Route Victoire");
}

function findMapLocation(name) {

    const clean =
        normalizeLocationName(name);

    if (mapLocations[clean]) {
        return mapLocations[clean];
    }

    return null;
}

function isMapArea(name) {

    return !!mapAreas[
        normalizeLocationName(name)
    ];
}

function parseLocations(location) {

    if (!location) return [];

    return location
        .split(",")
        .map(x => x.trim())
        .filter(Boolean);
}

function createMapMarkers(locations) {

    return locations
        .map(location => {

            const clean =
                normalizeLocationName(location);

            const point =
                findMapLocation(clean);

            if (!point) return "";

            const area =
                isMapArea(clean);

            if (area) {

                const coords =
                    mapAreas[clean];

                const x1 = coords[0];
                const y1 = coords[1];
                const x2 = coords[2];
                const y2 = coords[3];

                return `
                    <div
                        class="mapMarker"
                        style="
                            left:${((x1 + x2) / 2 / 640) * 100}%;
                            top:${((y1 + y2) / 2 / 420) * 100}%;
                        "
                    >
                        <span
                            class="mapAreaOutline"
                            style="
                                width:${Math.abs(x2-x1) / 640 * 100}%;
                                height:${Math.abs(y2-y1) / 420 * 100}%;
                            "
                        ></span>
                    </div>
                `;
            }

            return `
                <div
                    class="mapMarker"
                    style="
                        left:${point.x / 640 * 100}%;
                        top:${point.y / 420 * 100}%;
                    "
                >
                    <span class="mapDot"></span>

                    <span class="mapLabel">
                        ${clean}
                    </span>
                </div>
            `;

        })
        .join("");
}

/* =========================
   CARTE DE HOENN
========================= */

function openMap(id, selectedLocation = null) {

    const pokemon =
        P.find(p => p.id === id);

    if (!pokemon) return;

    const locations =
        parseLocations(pokemon.location);

    $("#mapContent").innerHTML = `

        <div class="mapHeader">

            <button
                class="mapClose"
                onclick="closeMap()"
            >
                ×
            </button>

            <h2>
                🗺️ Carte de Hoenn
            </h2>

        </div>

        <p class="mapPokemonName">
            ${pokemon.name}
        </p>

        <div class="mapImageContainer">

            <div
                class="mapImageWrapper"
                style="
                    aspect-ratio: 640 / 420;
                "
            >

                <img
                    class="hoennMap"
                    src="hoenn-map.png"
                    alt="Carte de Hoenn"
                >

                ${
                    locations.length
                        ? createMapMarkers(locations)
                        : `
                            <div
                                class="mapUnknown"
                            >
                                Inconnue
                            </div>
                        `
                }

            </div>

        </div>

        <div class="mapLocations">

            <b>
                📍 Lieux où trouver
                ${pokemon.name} :
            </b>

            <br><br>

            ${
                locations.length
                    ? locations
                        .map(location => {

                            return `
                                <button
                                    class="mapLocationLink"
                                    onclick="
                                        openMap(
                                            ${id},
                                            '${location.replace(/'/g, "\\'")}'
                                        )
                                    "
                                >
                                    ${location}
                                </button>
                            `;

                        })
                        .join(" • ")
                    : "Inconnue"
            }

        </div>
    `;

    $("#mapModal")
        .classList
        .remove("hidden");
}

function closeMap() {

    if ($("#mapModal")) {
        $("#mapModal")
            .classList
            .add("hidden");
    }
}

/* =========================
   FICHE DÉTAILLÉE
========================= */

function openDetail(id) {

    const pokemon =
        P.find(p => p.id === id);

    if (!pokemon) return;

    const currentState =
        getPokemonState(id);

    const isShiny =
        shiny(id);

    const image =
        isShiny
            ? pokemon.shiny
            : pokemon.sprite;

    const evolution =
        evolutionLinks(pokemon);

    const location =
        pokemon.location ||
        "Information indisponible";

    const method =
        pokemon.method ||
        "Information indisponible";

    const egg =
        pokemon.egg ||
        "Information indisponible";

    const index =
        P.findIndex(p => p.id === id);

    const previous =
        index > 0
            ? P[index - 1]
            : null;

    const next =
        index < P.length - 1
            ? P[index + 1]
            : null;

    $("#detail").innerHTML = `

        <div class="detailNavigation">

            <button
                class="detailArrow"
                onclick="
                    event.stopPropagation();
                    ${
                        previous
                            ? `openDetail(${previous.id})`
                            : ""
                    }
                "
                ${previous ? "" : "disabled"}
            >
                ◀
            </button>

            <button
                class="detailClose"
                onclick="
                    closeDetail()
                "
            >
                ×
            </button>

            <button
                class="detailArrow"
                onclick="
                    event.stopPropagation();
                    ${
                        next
                            ? `openDetail(${next.id})`
                            : ""
                    }
                "
                ${next ? "" : "disabled"}
            >
                ▶
            </button>

        </div>

        <div class="detailHero">

            <div class="detailNumber">
                #${String(pokemon.id).padStart(3, "0")}
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
                <b>🌳 Évolution :</b><br>
                ${evolution}
            </p>

            <p>
                <b>📍 Où l'obtenir :</b><br>

                ${
                    parseLocations(location)
                        .map(loc => `
                            <button
                                class="locationLink"
                                onclick="
                                    openMap(
                                        ${id},
                                        '${loc.replace(/'/g, "\\'")}'
                                    )
                                "
                            >
                                ${loc}
                            </button>
                        `)
                        .join(", ")
                }
            </p>

            <button
                class="mapButton"
                onclick="
                    openMap(${id})
                "
            >
                🗺️ MAP
            </button>

            <p>
                <b>🎣 Méthode :</b><br>
                ${method}
            </p>

            <p>
                <b>🥚 Œuf :</b><br>
                ${egg}
            </p>

            <p>
                <b>📖 Complétion :</b><br>

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
                            <b>📅 Obtenu le :</b><br>
                            ${formatDate(
                                currentState.obtainedDate
                            )}
                        </p>
                    `
                    : ""
            }

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
                        setState(${id},{
                            status:'progress'
                        });
                        closeDetail()
                    "
                >
                    🔄 En cours
                </button>

                <button
                    onclick="
                        setState(${id},{
                            status:'impossible'
                        });
                        closeDetail()
                    "
                >
                    🚫 Impossible
                </button>

                <button
                    onclick="
                        setState(${id},{
                            favorite:
                                !favorite(${id})
                        })
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
                        setState(${id},{
                            shiny:
                                !shiny(${id})
                        })
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
                        setState(${id},{
                            status:'missing',
                            obtainedDate:null
                        });
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

    if ($("#modal")) {
        $("#modal")
            .classList
            .add("hidden");
    }

    render();
}

if ($("#close")) {
    $("#close").onclick =
        closeDetail;
}

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

    $("#search")
        .addEventListener(
            "input",
            render
        );
}

/* =========================
   FILTRES
========================= */

if ($("#filters")) {

    $("#filters")
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.tagName !==
                    "BUTTON"
                ) {
                    return;
                }

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
                    event.target
                        .dataset
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
    localStorage.getItem("theme") ===
    "dark"
) {
    setTheme("dark");
}

/* =========================
   EXPORT
========================= */

if ($("#exportBtn")) {

    $("#exportBtn").onclick = () => {

        const data = {
            version: 4,
            exportedAt:
                new Date().toISOString(),
            progression: state
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
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "pokedex-hoenn-progression.json";

        link.click();

        URL.revokeObjectURL(url);
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

            if (!file) return;

            const reader =
                new FileReader();

            reader.onload = () => {

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
                        state = imported;
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

            reader.readAsText(file);
        };
}

/* =========================
   RESET
========================= */

if ($("#resetBtn")) {

    $("#resetBtn").onclick = () => {

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

if ("serviceWorker" in navigator) {

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
