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

    // Si une fiche est ouverte, on la rafraîchit
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
        p => p.requiredForCompletion &&
             status(p.id) === "obtained"
    ).length;

    const percentage = P.length
        ? Math.round((obtained / P.length) * 100)
        : 0;

    if ($("#progressText"))
        $("#progressText").textContent = `${obtained} / ${P.length}`;

    if ($("#percent"))
        $("#percent").textContent = `${percentage}%`;

    if ($("#bar"))
        $("#bar").style.width = `${percentage}%`;

    if ($("#obtainedCount"))
        $("#obtainedCount").textContent = `${obtained} obtenus`;

    if ($("#todoCount"))
        $("#todoCount").textContent =
            `${P.length - obtained} à faire`;

    const subprogress =
        document.querySelector(".progressCard .subprogress");

    if (subprogress) {
        subprogress.title =
            `Complétion du Pokédex régional : ${requiredObtained}/208 requis`;
    }
}

/* =========================
   RECHERCHE / FILTRES
========================= */

function matches(pokemon) {
    const search = $("#search")
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
   FICHE DÉTAILLÉE
========================= */

function openDetail(id) {

    const pokemon =
        P.find(p => p.id === id);

    if (!pokemon) return;

    const currentStatus =
        status(id);

    const isShiny =
        shiny(id);

    const image =
        isShiny
            ? pokemon.shiny
            : pokemon.sprite;

    const currentState =
        getPokemonState(id);

    const evolution =
        pokemon.evolution ||
        "Aucune information";

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
                        ${formatDate(currentState.obtainedDate)}
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
                            favorite: !favorite(${id})
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
                            shiny: !shiny(${id})
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

    $("#modal").classList.remove("hidden");
}

/* =========================
   FERMETURE FICHE
========================= */

function closeDetail() {

    if ($("#modal"))
        $("#modal").classList.add("hidden");

    render();
}

if ($("#close"))
    $("#close").onclick = closeDetail;

if ($("#modal")) {
    $("#modal").onclick = event => {
        if (event.target.id === "modal") {
            closeDetail();
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
                event.target.tagName !== "BUTTON"
            ) return;

            document
                .querySelectorAll(
                    ".filters button"
                )
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
                );

            event.target.classList.add(
                "active"
            );

            filter =
                event.target.dataset.filter ||
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

                    /*
                     * Accepte :
                     * - ancien format
                     * - nouveau format V4
                     */

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
