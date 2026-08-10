let P = [];
let state = JSON.parse(localStorage.getItem("hoennState") || "{}");
let filter = "all";
let deferredInstallPrompt = null;

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
   ÉTAT POKÉMON
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
        ? Math.round((obtained / P.length) * 100)
        : 0;

    if ($("#progressText")) {
        $("#progressText").textContent =
            `${obtained} / ${P.length}`;
    }

    if ($("#percent")) {
        $("#percent").textContent =
            `${percentage}%`;
    }

    if ($("#bar")) {
        $("#bar").style.width =
            `${percentage}%`;
    }

    if ($("#obtainedCount")) {
        $("#obtainedCount").textContent =
            `${obtained} obtenus`;
    }

    if ($("#todoCount")) {
        $("#todoCount").textContent =
            `${P.length - obtained} à faire`;
    }

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
            ? $("#search").value
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
        filtered
            .map(card)
            .join("");
}


/* =========================
   ÉVOLUTIONS CLIQUABLES
========================= */

function evolutionLinks(pokemon) {

    if (!pokemon.family) {

        return pokemon.evolution ||
            "Aucune information";
    }

    const family =
        P.filter(
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
   NAVIGATION POKÉDEX
========================= */

function previousPokemon(id) {

    const index =
        P.findIndex(
            p => p.id === id
        );

    if (index <= 0) return;

    openDetail(
        P[index - 1].id
    );
}


function nextPokemon(id) {

    const index =
        P.findIndex(
            p => p.id === id
        );

    if (
        index === -1 ||
        index >= P.length - 1
    ) {
        return;
    }

    openDetail(
        P[index + 1].id
    );
}


/* =========================
   FICHE DÉTAILLÉE
========================= */

function openDetail(id) {

    const pokemon =
        P.find(
            p => p.id === id
        );

    if (!pokemon) return;

    const index =
        P.findIndex(
            p => p.id === id
        );

    const hasPrevious =
        index > 0;

    const hasNext =
        index < P.length - 1;

    const isShiny =
        shiny(id);

    const image =
        isShiny
            ? pokemon.shiny
            : pokemon.sprite;

    const currentState =
        getPokemonState(id);

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


    $("#detail").innerHTML = `

        <div class="detailTopBar">

            ${
                hasPrevious
                    ? `
                        <button
                            class="detailNav previous"
                            onclick="
                                previousPokemon(${id})
                            "
                            aria-label="Pokémon précédent"
                        >
                            ‹
                        </button>
                    `
                    : `
                        <span class="detailNavPlaceholder"></span>
                    `
            }


            <button
                class="detailClose"
                onclick="closeDetail()"
                aria-label="Fermer"
            >
                ×
            </button>


            ${
                hasNext
                    ? `
                        <button
                            class="detailNav next"
                            onclick="
                                nextPokemon(${id})
                            "
                            aria-label="Pokémon suivant"
                        >
                            ›
                        </button>
                    `
                    : `
                        <span class="detailNavPlaceholder"></span>
                    `
            }

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
                ${location}
            </p>


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


            <!-- BOUTON CARTE -->

            <button
                class="mapButton"
                onclick="
                    event.stopPropagation();
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


/* =========================
   CARTE DE HOENN
========================= */

/*
   Coordonnées en pourcentage.

   x = position horizontale
   y = position verticale

   Ces coordonnées sont volontairement
   faciles à modifier si besoin.
*/

const HOENN_LOCATIONS = {

    "Route 101": { x: 19, y: 83 },
    "Route 102": { x: 27, y: 80 },
    "Route 103": { x: 38, y: 79 },
    "Route 104": { x: 25, y: 68 },
    "Bois Clémenti": { x: 28, y: 60 },
    "Route 105": { x: 20, y: 52 },
    "Route 106": { x: 27, y: 51 },
    "Route 107": { x: 38, y: 52 },
    "Route 108": { x: 48, y: 51 },
    "Route 109": { x: 55, y: 57 },
    "Route 110": { x: 55, y: 69 },
    "Route 111": { x: 69, y: 69 },
    "Route 112": { x: 63, y: 58 },
    "Route 113": { x: 56, y: 46 },
    "Route 114": { x: 48, y: 39 },
    "Route 115": { x: 34, y: 39 },
    "Route 116": { x: 45, y: 60 },
    "Route 117": { x: 47, y: 70 },
    "Route 118": { x: 67, y: 72 },
    "Route 119": { x: 73, y: 59 },
    "Route 120": { x: 76, y: 47 },
    "Route 121": { x: 82, y: 55 },
    "Route 122": { x: 75, y: 38 },
    "Route 123": { x: 68, y: 43 },
    "Route 124": { x: 55, y: 29 },
    "Route 125": { x: 69, y: 20 },
    "Route 126": { x: 55, y: 17 },
    "Route 127": { x: 49, y: 23 },
    "Route 128": { x: 43, y: 29 },
    "Route 129": { x: 37, y: 34 },
    "Route 130": { x: 31, y: 29 },
    "Route 131": { x: 25, y: 28 },
    "Route 132": { x: 31, y: 41 },
    "Route 133": { x: 38, y: 46 },
    "Route 134": { x: 45, y: 51 },

    "Grotte Granite": { x: 30, y: 50 },
    "Tunnel Mérazon": { x: 39, y: 56 },
    "Route Victoire": { x: 18, y: 18 },

    "Mérouville": { x: 29, y: 64 },
    "Clémenti-Ville": { x: 31, y: 71 },
    "Poivressel": { x: 53, y: 72 },
    "Lavandia": { x: 55, y: 67 },
    "Nénucrique": { x: 82, y: 63 },
    "Pacifiville": { x: 51, y: 10 },
    "Myokara": { x: 29, y: 53 },
    "Éternara": { x: 15, y: 11 },

    "Mont Mémoria": { x: 75, y: 39 },
    "Grand Envol": { x: 50, y: 50 },
    "Atoll de Combat": { x: 88, y: 17 }

};


/* =========================
   NORMALISATION DES LIEUX
========================= */

function normalizeLocationName(location) {

    return location
        .trim()
        .replace(/\s+/g, " ");
}


/* =========================
   EXTRACTION DES LIEUX
========================= */

function getPokemonLocations(location) {

    if (!location) {
        return [];
    }

    const lower =
        location
            .trim()
            .toLowerCase();

    if (
        lower === "inconnue" ||
        lower === "inconnu" ||
        lower === "information indisponible"
    ) {
        return [];
    }

    return location
        .split(",")
        .map(normalizeLocationName)
        .filter(Boolean);
}


/* =========================
   OUVRIR LA CARTE
========================= */

function openMap(id) {

    const pokemon =
        P.find(
            p => p.id === id
        );

    if (!pokemon) return;


    const location =
        pokemon.location ||
        "Inconnue";


    const locations =
        getPokemonLocations(
            location
        );


    const points =
        locations
            .map(
                name => {

                    const position =
                        HOENN_LOCATIONS[name];

                    if (!position) {
                        return "";
                    }

                    return `
                        <div
                            class="mapMarker"
                            style="
                                left:${position.x}%;
                                top:${position.y}%;
                            "
                            title="${name}"
                        >
                            <span class="mapDot"></span>

                            <span class="mapLabel">
                                ${name}
                            </span>
                        </div>
                    `;
                }
            )
            .join("");


    const unknown =
        locations.length === 0;


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


        <div class="mapImageContainer">

            <div class="mapImageWrapper">

                <img
                    class="hoennMap"
                    src="hoenn-map.png"
                    alt="Carte de Hoenn"
                >


                ${
                    unknown
                        ? `
                            <div class="mapUnknown">
                                Inconnue
                            </div>
                        `
                        : points
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
                unknown
                    ? "Inconnue"
                    : locations.join(", ")
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
   ÉVÉNEMENTS FERMETURE
========================= */

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

    $("#themeBtn").onclick =
        () => {

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

    $("#exportBtn").onclick =
        () => {

            const data = {

                version: 4,

                exportedAt:
                    new Date().toISOString(),

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

            if (!file) return;


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


            reader.readAsText(file);
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
