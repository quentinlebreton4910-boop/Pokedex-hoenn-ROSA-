/* =========================================================
   POKÉDEX - PAGE D'ACCUEIL
   ========================================================= */

const pokemonBackground = document.getElementById("pokemonBackground");

const SPRITE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/*
 * =========================================================
 * POKÉMON DISPONIBLES POUR LE FOND
 * =========================================================
 *
 * Structure utilisée pour les formes :
 *
 * speciesId
 * name
 * normal
 * shiny
 * mega
 *
 * mega = true uniquement pour une Méga-Évolution.
 */


/* =========================================================
   POKÉMON NORMAUX
   ========================================================= */

const normalPokemon = [

  { speciesId: 1, name: "Bulbizarre", normal: `${SPRITE}/1.png`, shiny: `${SPRITE}/shiny/1.png`, mega: false },
  { speciesId: 4, name: "Salamèche", normal: `${SPRITE}/4.png`, shiny: `${SPRITE}/shiny/4.png`, mega: false },
  { speciesId: 7, name: "Carapuce", normal: `${SPRITE}/7.png`, shiny: `${SPRITE}/shiny/7.png`, mega: false },

  { speciesId: 25, name: "Pikachu", normal: `${SPRITE}/25.png`, shiny: `${SPRITE}/shiny/25.png`, mega: false },
  { speciesId: 39, name: "Rondoudou", normal: `${SPRITE}/39.png`, shiny: `${SPRITE}/shiny/39.png`, mega: false },
  { speciesId: 52, name: "Miaouss", normal: `${SPRITE}/52.png`, shiny: `${SPRITE}/shiny/52.png`, mega: false },
  { speciesId: 54, name: "Psykokwak", normal: `${SPRITE}/54.png`, shiny: `${SPRITE}/shiny/54.png`, mega: false },
  { speciesId: 58, name: "Caninos", normal: `${SPRITE}/58.png`, shiny: `${SPRITE}/shiny/58.png`, mega: false },
  { speciesId: 63, name: "Abra", normal: `${SPRITE}/63.png`, shiny: `${SPRITE}/shiny/63.png`, mega: false },
  { speciesId: 66, name: "Machoc", normal: `${SPRITE}/66.png`, shiny: `${SPRITE}/shiny/66.png`, mega: false },

  { speciesId: 74, name: "Racaillou", normal: `${SPRITE}/74.png`, shiny: `${SPRITE}/shiny/74.png`, mega: false },
  { speciesId: 81, name: "Magnéti", normal: `${SPRITE}/81.png`, shiny: `${SPRITE}/shiny/81.png`, mega: false },
  { speciesId: 95, name: "Onix", normal: `${SPRITE}/95.png`, shiny: `${SPRITE}/shiny/95.png`, mega: false },
  { speciesId: 104, name: "Osselait", normal: `${SPRITE}/104.png`, shiny: `${SPRITE}/shiny/104.png`, mega: false },
  { speciesId: 111, name: "Rhinocorne", normal: `${SPRITE}/111.png`, shiny: `${SPRITE}/shiny/111.png`, mega: false },
  { speciesId: 120, name: "Stari", normal: `${SPRITE}/120.png`, shiny: `${SPRITE}/shiny/120.png`, mega: false },
  { speciesId: 129, name: "Magicarpe", normal: `${SPRITE}/129.png`, shiny: `${SPRITE}/shiny/129.png`, mega: false },
  { speciesId: 133, name: "Évoli", normal: `${SPRITE}/133.png`, shiny: `${SPRITE}/shiny/133.png`, mega: false },

  { speciesId: 152, name: "Germignon", normal: `${SPRITE}/152.png`, shiny: `${SPRITE}/shiny/152.png`, mega: false },
  { speciesId: 155, name: "Héricendre", normal: `${SPRITE}/155.png`, shiny: `${SPRITE}/shiny/155.png`, mega: false },
  { speciesId: 158, name: "Kaiminus", normal: `${SPRITE}/158.png`, shiny: `${SPRITE}/shiny/158.png`, mega: false },

  { speciesId: 175, name: "Togepi", normal: `${SPRITE}/175.png`, shiny: `${SPRITE}/shiny/175.png`, mega: false },
  { speciesId: 179, name: "Wattouat", normal: `${SPRITE}/179.png`, shiny: `${SPRITE}/shiny/179.png`, mega: false },
  { speciesId: 194, name: "Axoloto", normal: `${SPRITE}/194.png`, shiny: `${SPRITE}/shiny/194.png`, mega: false },
  { speciesId: 200, name: "Feuforêve", normal: `${SPRITE}/200.png`, shiny: `${SPRITE}/shiny/200.png`, mega: false },


  /* =========================
     HOENN
     ========================= */

  { speciesId: 252, name: "Arcko", normal: `${SPRITE}/252.png`, shiny: `${SPRITE}/shiny/252.png`, mega: false },
  { speciesId: 255, name: "Poussifeu", normal: `${SPRITE}/255.png`, shiny: `${SPRITE}/shiny/255.png`, mega: false },
  { speciesId: 258, name: "Gobou", normal: `${SPRITE}/258.png`, shiny: `${SPRITE}/shiny/258.png`, mega: false },

  { speciesId: 261, name: "Medhyèna", normal: `${SPRITE}/261.png`, shiny: `${SPRITE}/shiny/261.png`, mega: false },
  { speciesId: 263, name: "Zigzaton", normal: `${SPRITE}/263.png`, shiny: `${SPRITE}/shiny/263.png`, mega: false },
  { speciesId: 270, name: "Lotad", normal: `${SPRITE}/270.png`, shiny: `${SPRITE}/shiny/270.png`, mega: false },
  { speciesId: 273, name: "Grainipiot", normal: `${SPRITE}/273.png`, shiny: `${SPRITE}/shiny/273.png`, mega: false },
  { speciesId: 280, name: "Tarsal", normal: `${SPRITE}/280.png`, shiny: `${SPRITE}/shiny/280.png`, mega: false },
  { speciesId: 281, name: "Kirlia", normal: `${SPRITE}/281.png`, shiny: `${SPRITE}/shiny/281.png`, mega: false },
  { speciesId: 285, name: "Balignon", normal: `${SPRITE}/285.png`, shiny: `${SPRITE}/shiny/285.png`, mega: false },
  { speciesId: 296, name: "Makuhita", normal: `${SPRITE}/296.png`, shiny: `${SPRITE}/shiny/296.png`, mega: false },
  { speciesId: 300, name: "Skitty", normal: `${SPRITE}/300.png`, shiny: `${SPRITE}/shiny/300.png`, mega: false },
  { speciesId: 302, name: "Ténéfix", normal: `${SPRITE}/302.png`, shiny: `${SPRITE}/shiny/302.png`, mega: false },
  { speciesId: 303, name: "Mysdibule", normal: `${SPRITE}/303.png`, shiny: `${SPRITE}/shiny/303.png`, mega: false },
  { speciesId: 304, name: "Aron", normal: `${SPRITE}/304.png`, shiny: `${SPRITE}/shiny/304.png`, mega: false },
  { speciesId: 309, name: "Dynavolt", normal: `${SPRITE}/309.png`, shiny: `${SPRITE}/shiny/309.png`, mega: false },
  { speciesId: 318, name: "Carvanha", normal: `${SPRITE}/318.png`, shiny: `${SPRITE}/shiny/318.png`, mega: false },
  { speciesId: 320, name: "Wailmer", normal: `${SPRITE}/320.png`, shiny: `${SPRITE}/shiny/320.png`, mega: false },
  { speciesId: 321, name: "Wailord", normal: `${SPRITE}/321.png`, shiny: `${SPRITE}/shiny/321.png`, mega: false },
  { speciesId: 322, name: "Chamallot", normal: `${SPRITE}/322.png`, shiny: `${SPRITE}/shiny/322.png`, mega: false },
  { speciesId: 328, name: "Kraknoix", normal: `${SPRITE}/328.png`, shiny: `${SPRITE}/shiny/328.png`, mega: false },
  { speciesId: 333, name: "Tylton", normal: `${SPRITE}/333.png`, shiny: `${SPRITE}/shiny/333.png`, mega: false },
  { speciesId: 334, name: "Altaria", normal: `${SPRITE}/334.png`, shiny: `${SPRITE}/shiny/334.png`, mega: false },
  { speciesId: 335, name: "Mangriff", normal: `${SPRITE}/335.png`, shiny: `${SPRITE}/shiny/335.png`, mega: false },
  { speciesId: 336, name: "Séviper", normal: `${SPRITE}/336.png`, shiny: `${SPRITE}/shiny/336.png`, mega: false },
  { speciesId: 338, name: "Solaroc", normal: `${SPRITE}/338.png`, shiny: `${SPRITE}/shiny/338.png`, mega: false },
  { speciesId: 339, name: "Barloche", normal: `${SPRITE}/339.png`, shiny: `${SPRITE}/shiny/339.png`, mega: false },
  { speciesId: 341, name: "Écrapince", normal: `${SPRITE}/341.png`, shiny: `${SPRITE}/shiny/341.png`, mega: false },
  { speciesId: 343, name: "Balbuto", normal: `${SPRITE}/343.png`, shiny: `${SPRITE}/shiny/343.png`, mega: false },
  { speciesId: 349, name: "Barpau", normal: `${SPRITE}/349.png`, shiny: `${SPRITE}/shiny/349.png`, mega: false },
  { speciesId: 350, name: "Milobellus", normal: `${SPRITE}/350.png`, shiny: `${SPRITE}/shiny/350.png`, mega: false },
  { speciesId: 353, name: "Polichombr", normal: `${SPRITE}/353.png`, shiny: `${SPRITE}/shiny/353.png`, mega: false },
  { speciesId: 354, name: "Branette", normal: `${SPRITE}/354.png`, shiny: `${SPRITE}/shiny/354.png`, mega: false },
  { speciesId: 359, name: "Absol", normal: `${SPRITE}/359.png`, shiny: `${SPRITE}/shiny/359.png`, mega: false },
  { speciesId: 361, name: "Stalgamin", normal: `${SPRITE}/361.png`, shiny: `${SPRITE}/shiny/361.png`, mega: false },
  { speciesId: 362, name: "Oniglali", normal: `${SPRITE}/362.png`, shiny: `${SPRITE}/shiny/362.png`, mega: false },
  { speciesId: 371, name: "Draby", normal: `${SPRITE}/371.png`, shiny: `${SPRITE}/shiny/371.png`, mega: false },
  { speciesId: 374, name: "Terhal", normal: `${SPRITE}/374.png`, shiny: `${SPRITE}/shiny/374.png`, mega: false },
  { speciesId: 376, name: "Métalosse", normal: `${SPRITE}/376.png`, shiny: `${SPRITE}/shiny/376.png`, mega: false },

  { speciesId: 380, name: "Latias", normal: `${SPRITE}/380.png`, shiny: `${SPRITE}/shiny/380.png`, mega: false },
  { speciesId: 381, name: "Latios", normal: `${SPRITE}/381.png`, shiny: `${SPRITE}/shiny/381.png`, mega: false },
  { speciesId: 382, name: "Kyogre", normal: `${SPRITE}/382.png`, shiny: `${SPRITE}/shiny/382.png`, mega: false },
  { speciesId: 383, name: "Groudon", normal: `${SPRITE}/383.png`, shiny: `${SPRITE}/shiny/383.png`, mega: false },
  { speciesId: 384, name: "Rayquaza", normal: `${SPRITE}/384.png`, shiny: `${SPRITE}/shiny/384.png`, mega: false },
  { speciesId: 385, name: "Jirachi", normal: `${SPRITE}/385.png`, shiny: `${SPRITE}/shiny/385.png`, mega: false },
  { speciesId: 386, name: "Deoxys", normal: `${SPRITE}/386.png`, shiny: `${SPRITE}/shiny/386.png`, mega: false },


  /* =========================
     AUTRES RÉGIONS
     ========================= */

  { speciesId: 393, name: "Tiplouf", normal: `${SPRITE}/393.png`, shiny: `${SPRITE}/shiny/393.png`, mega: false },
  { speciesId: 403, name: "Lixy", normal: `${SPRITE}/403.png`, shiny: `${SPRITE}/shiny/403.png`, mega: false },
  { speciesId: 447, name: "Riolu", normal: `${SPRITE}/447.png`, shiny: `${SPRITE}/shiny/447.png`, mega: false },
  { speciesId: 459, name: "Blizzi", normal: `${SPRITE}/459.png`, shiny: `${SPRITE}/shiny/459.png`, mega: false },

  { speciesId: 495, name: "Vipélierre", normal: `${SPRITE}/495.png`, shiny: `${SPRITE}/shiny/495.png`, mega: false },
  { speciesId: 498, name: "Gruikui", normal: `${SPRITE}/498.png`, shiny: `${SPRITE}/shiny/498.png`, mega: false },
  { speciesId: 501, name: "Moustillon", normal: `${SPRITE}/501.png`, shiny: `${SPRITE}/shiny/501.png`, mega: false },

  { speciesId: 570, name: "Zorua", normal: `${SPRITE}/570.png`, shiny: `${SPRITE}/shiny/570.png`, mega: false },
  { speciesId: 574, name: "Scrutella", normal: `${SPRITE}/574.png`, shiny: `${SPRITE}/shiny/574.png`, mega: false },

  { speciesId: 650, name: "Marisson", normal: `${SPRITE}/650.png`, shiny: `${SPRITE}/shiny/650.png`, mega: false },
  { speciesId: 653, name: "Feunnec", normal: `${SPRITE}/653.png`, shiny: `${SPRITE}/shiny/653.png`, mega: false },
  { speciesId: 656, name: "Grenousse", normal: `${SPRITE}/656.png`, shiny: `${SPRITE}/shiny/656.png`, mega: false },

  { speciesId: 722, name: "Brindibou", normal: `${SPRITE}/722.png`, shiny: `${SPRITE}/shiny/722.png`, mega: false },
  { speciesId: 725, name: "Flamiaou", normal: `${SPRITE}/725.png`, shiny: `${SPRITE}/shiny/725.png`, mega: false },
  { speciesId: 728, name: "Otaquin", normal: `${SPRITE}/728.png`, shiny: `${SPRITE}/shiny/728.png`, mega: false },

  { speciesId: 810, name: "Ouistempo", normal: `${SPRITE}/810.png`, shiny: `${SPRITE}/shiny/810.png`, mega: false },
  { speciesId: 813, name: "Flambino", normal: `${SPRITE}/813.png`, shiny: `${SPRITE}/shiny/813.png`, mega: false },
  { speciesId: 816, name: "Larméléon", normal: `${SPRITE}/816.png`, shiny: `${SPRITE}/shiny/816.png`, mega: false }

];


/* =========================================================
   MÉGA-ÉVOLUTIONS
   =========================================================
   
   Les sprites utilisent les IDs de formes de PokéAPI.
   ========================================================= */

const megaPokemon = [

  {
    speciesId: 254,
    name: "Méga-Jungko",
    normal: `${SPRITE}/10065.png`,
    shiny: `${SPRITE}/shiny/10065.png`,
    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",
    normal: `${SPRITE}/10041.png`,
    shiny: `${SPRITE}/shiny/10041.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal: `${SPRITE}/10064.png`,
    shiny: `${SPRITE}/shiny/10064.png`,
    mega: true
  },

  {
    speciesId: 282,
    name: "Méga-Gardevoir",
    normal: `${SPRITE}/10051.png`,
    shiny: `${SPRITE}/shiny/10051.png`,
    mega: true
  },

  {
    speciesId: 302,
    name: "Méga-Ténéfix",
    normal: `${SPRITE}/10066.png`,
    shiny: `${SPRITE}/shiny/10066.png`,
    mega: true
  },

  {
    speciesId: 303,
    name: "Méga-Mysdibule",
    normal: `${SPRITE}/10052.png`,
    shiny: `${SPRITE}/shiny/10052.png`,
    mega: true
  },

  {
    speciesId: 308,
    name: "Méga-Charmina",
    normal: `${SPRITE}/10069.png`,
    shiny: `${SPRITE}/shiny/10069.png`,
    mega: true
  },

  {
    speciesId: 310,
    name: "Méga-Élecsprint",
    normal: `${SPRITE}/10072.png`,
    shiny: `${SPRITE}/shiny/10072.png`,
    mega: true
  },

  {
    speciesId: 319,
    name: "Méga-Sharpedo",
    normal: `${SPRITE}/10070.png`,
    shiny: `${SPRITE}/shiny/10070.png`,
    mega: true
  },

  {
    speciesId: 323,
    name: "Méga-Camérupt",
    normal: `${SPRITE}/10087.png`,
    shiny: `${SPRITE}/shiny/10087.png`,
    mega: true
  },

  {
    speciesId: 334,
    name: "Méga-Altaria",
    normal: `${SPRITE}/10067.png`,
    shiny: `${SPRITE}/shiny/10067.png`,
    mega: true
  },

  {
    speciesId: 359,
    name: "Méga-Absol",
    normal: `${SPRITE}/10057.png`,
    shiny: `${SPRITE}/shiny/10057.png`,
    mega: true
  },

  {
    speciesId: 362,
    name: "Méga-Oniglali",
    normal: `${SPRITE}/10074.png`,
    shiny: `${SPRITE}/shiny/10074.png`,
    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",
    normal: `${SPRITE}/10021.png`,
    shiny: `${SPRITE}/shiny/10021.png`,
    mega: true
  },

  {
    speciesId: 376,
    name: "Méga-Métalosse",
    normal: `${SPRITE}/10076.png`,
    shiny: `${SPRITE}/shiny/10076.png`,
    mega: true
  },

  {
    speciesId: 380,
    name: "Méga-Latias",
    normal: `${SPRITE}/10062.png`,
    shiny: `${SPRITE}/shiny/10062.png`,
    mega: true
  },

  {
    speciesId: 381,
    name: "Méga-Latios",
    normal: `${SPRITE}/10063.png`,
    shiny: `${SPRITE}/shiny/10063.png`,
    mega: true
  },


  /* =======================================================
     MÉGA-ÉVOLUTIONS CLASSIQUES
     ======================================================= */

  {
    speciesId: 3,
    name: "Méga-Florizarre",
    normal: `${SPRITE}/10033.png`,
    shiny: `${SPRITE}/shiny/10033.png`,
    mega: true
  },

  {
    speciesId: 6,
    name: "Méga-Dracaufeu X",
    normal: `${SPRITE}/10034.png`,
    shiny: `${SPRITE}/shiny/10034.png`,
    mega: true
  },

  {
    speciesId: 6,
    name: "Méga-Dracaufeu Y",
    normal: `${SPRITE}/10035.png`,
    shiny: `${SPRITE}/shiny/10035.png`,
    mega: true
  },

  {
    speciesId: 9,
    name: "Méga-Tortank",
    normal: `${SPRITE}/10036.png`,
    shiny: `${SPRITE}/shiny/10036.png`,
    mega: true
  },

  {
    speciesId: 15,
    name: "Méga-Dardargnan",
    normal: `${SPRITE}/10090.png`,
    shiny: `${SPRITE}/shiny/10090.png`,
    mega: true
  },

  {
    speciesId: 18,
    name: "Méga-Roucarnage",
    normal: `${SPRITE}/10073.png`,
    shiny: `${SPRITE}/shiny/10073.png`,
    mega: true
  },

  {
    speciesId: 65,
    name: "Méga-Alakazam",
    normal: `${SPRITE}/10037.png`,
    shiny: `${SPRITE}/shiny/10037.png`,
    mega: true
  },

  {
    speciesId: 80,
    name: "Méga-Flagadoss",
    normal: `${SPRITE}/10038.png`,
    shiny: `${SPRITE}/shiny/10038.png`,
    mega: true
  },

  {
    speciesId: 94,
    name: "Méga-Ectoplasma",
    normal: `${SPRITE}/10039.png`,
    shiny: `${SPRITE}/shiny/10039.png`,
    mega: true
  },

  {
    speciesId: 115,
    name: "Méga-Kangourex",
    normal: `${SPRITE}/10040.png`,
    shiny: `${SPRITE}/shiny/10040.png`,
    mega: true
  },

  {
    speciesId: 127,
    name: "Méga-Scarabrute",
    normal: `${SPRITE}/10042.png`,
    shiny: `${SPRITE}/shiny/10042.png`,
    mega: true
  },

  {
    speciesId: 130,
    name: "Méga-Léviator",
    normal: `${SPRITE}/10043.png`,
    shiny: `${SPRITE}/shiny/10043.png`,
    mega: true
  },

  {
    speciesId: 142,
    name: "Méga-Aérodactyle",
    normal: `${SPRITE}/10072.png`,
    shiny: `${SPRITE}/shiny/10072.png`,
    mega: true
  },

  {
    speciesId: 150,
    name: "Méga-Mewtwo X",
    normal: `${SPRITE}/10044.png`,
    shiny: `${SPRITE}/shiny/10044.png`,
    mega: true
  },

  {
    speciesId: 150,
    name: "Méga-Mewtwo Y",
    normal: `${SPRITE}/10045.png`,
    shiny: `${SPRITE}/shiny/10045.png`,
    mega: true
  },

  {
    speciesId: 181,
    name: "Méga-Pharamp",
    normal: `${SPRITE}/10041.png`,
    shiny: `${SPRITE}/shiny/10041.png`,
    mega: true
  },

  {
    speciesId: 212,
    name: "Méga-Cizayox",
    normal: `${SPRITE}/10046.png`,
    shiny: `${SPRITE}/shiny/10046.png`,
    mega: true
  },

  {
    speciesId: 214,
    name: "Méga-Scarhino",
    normal: `${SPRITE}/10047.png`,
    shiny: `${SPRITE}/shiny/10047.png`,
    mega: true
  },

  {
    speciesId: 229,
    name: "Méga-Démolosse",
    normal: `${SPRITE}/10048.png`,
    shiny: `${SPRITE}/shiny/10048.png`,
    mega: true
  },

  {
    speciesId: 248,
    name: "Méga-Tyranocif",
    normal: `${SPRITE}/10049.png`,
    shiny: `${SPRITE}/shiny/10049.png`,
    mega: true
  },

  {
    speciesId: 254,
    name: "Méga-Jungko",
    normal: `${SPRITE}/10065.png`,
    shiny: `${SPRITE}/shiny/10065.png`,
    mega: true
  },

  {
    speciesId: 257,
    name: "Méga-Braségali",
    normal: `${SPRITE}/10050.png`,
    shiny: `${SPRITE}/shiny/10050.png`,
    mega: true
  },

  {
    speciesId: 260,
    name: "Méga-Laggron",
    normal: `${SPRITE}/10064.png`,
    shiny: `${SPRITE}/shiny/10064.png`,
    mega: true
  },

  {
    speciesId: 373,
    name: "Méga-Drattak",
    normal: `${SPRITE}/10021.png`,
    shiny: `${SPRITE}/shiny/10021.png`,
    mega: true
  }

];


/* =========================================================
   FORMES SPÉCIALES
   ========================================================= */

const specialForms = [

  {
    speciesId: 382,
    name: "Primo-Kyogre",
    normal: `${SPRITE}/10077.png`,
    shiny: `${SPRITE}/shiny/10077.png`,
    mega: false
  },

  {
    speciesId: 383,
    name: "Primo-Groudon",
    normal: `${SPRITE}/10078.png`,
    shiny: `${SPRITE}/shiny/10078.png`,
    mega: false
  },

  {
    speciesId: 384,
    name: "Méga-Rayquaza",
    normal: `${SPRITE}/10079.png`,
    shiny: `${SPRITE}/shiny/10079.png`,
    mega: true
  },

  {
    speciesId: 386,
    name: "Deoxys Attaque",
    normal: `${SPRITE}/386-attack.png`,
    shiny: `${SPRITE}/shiny/386-attack.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Défense",
    normal: `${SPRITE}/386-defense.png`,
    shiny: `${SPRITE}/shiny/386-defense.png`,
    mega: false
  },

  {
    speciesId: 386,
    name: "Deoxys Vitesse",
    normal: `${SPRITE}/386-speed.png`,
    shiny: `${SPRITE}/shiny/386-speed.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Noir",
    normal: `${SPRITE}/646-black.png`,
    shiny: `${SPRITE}/shiny/646-black.png`,
    mega: false
  },

  {
    speciesId: 646,
    name: "Kyurem Blanc",
    normal: `${SPRITE}/646-white.png`,
    shiny: `${SPRITE}/shiny/646-white.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Necrozma Ailes de l'Aurore",
    normal: `${SPRITE}/800-dawn-wings.png`,
    shiny: `${SPRITE}/shiny/800-dawn-wings.png`,
    mega: false
  },

  {
    speciesId: 800,
    name: "Necrozma Crinière du Couchant",
    normal: `${SPRITE}/800-dusk-mane.png`,
    shiny: `${SPRITE}/shiny/800-dusk-mane.png`,
    mega: false
  },

  {
    speciesId: 718,
    name: "Zygarde Forme Parfaite",
    normal: `${SPRITE}/718-complete.png`,
    shiny: `${SPRITE}/shiny/718-complete.png`,
    mega: false
  }

];


/* =========================================================
   FOND HOENN
   ========================================================= */

const hoennNormal = normalPokemon.filter(p =>
  p.speciesId >= 252 &&
  p.speciesId <= 386
);

const hoennSpecial = specialForms.filter(p =>
  [382, 383, 384, 386].includes(p.speciesId)
);

const hoennMega = megaPokemon.filter(p =>
  [254, 257, 260, 282, 302, 303, 308, 310, 319, 323, 334, 359, 362, 373, 376, 380, 381].includes(p.speciesId)
);


/* =========================================================
   MÉLANGE
   ========================================================= */

function shuffle(array) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1));

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
   CRÉATION DU FOND
   ========================================================= */

function createPokemonBackground(region = "all") {

  if (!pokemonBackground) {
    console.warn(
      "pokemonBackground introuvable."
    );
    return;
  }

  pokemonBackground.innerHTML = "";


  let pool;


  if (region === "hoenn") {

    pool = [
      ...hoennNormal,
      ...hoennMega,
      ...hoennSpecial
    ];

  } else {

    pool = [
      ...normalPokemon,
      ...megaPokemon,
      ...specialForms
    ];

  }


  pool = shuffle(pool);


  /*
   * Empêche deux fois exactement
   * le même objet dans le fond.
   */

  const selected = [];

  const usedKeys = new Set();


  for (const pokemon of pool) {

    const key =
      pokemon.name;

    if (usedKeys.has(key)) {
      continue;
    }

    usedKeys.add(key);
    selected.push(pokemon);

  }


  /*
   * Nombre de Pokémon.
   */

  const amount =
    window.innerWidth <= 600
      ? 22
      : 42;


  const pokemonToDisplay =
    selected.slice(
      0,
      Math.min(
        amount,
        selected.length
      )
    );


  /*
   * Positions utilisées.
   */

  const positions = [];


  pokemonToDisplay.forEach(pokemon => {

    let x;
    let y;

    let valid = false;

    let tries = 0;


    /*
     * On cherche une position
     * suffisamment éloignée des autres.
     */

    while (
      !valid &&
      tries < 200
    ) {

      x =
        5 +
        Math.random() * 90;

      y =
        5 +
        Math.random() * 90;


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


          return distance >= 13;

        });


      tries++;

    }


    if (!valid) {
      return;
    }


    positions.push({
      x,
      y
    });


    const img =
      document.createElement("img");


    img.className =
      "bg-pokemon";


    /*
     * Shiny :
     * environ 12 %.
     */

    const isShiny =
      Math.random() < 0.12;


    const wantedSrc =
      isShiny
        ? pokemon.shiny
        : pokemon.normal;


    img.src =
      wantedSrc;


    /*
     * Si un sprite de forme
     * spéciale n'existe pas,
     * on revient automatiquement
     * au sprite normal.
     */

    img.onerror = () => {

      if (
        img.dataset.fallback !== "1"
      ) {

        img.dataset.fallback = "1";

        img.src =
          pokemon.normal;

      } else {

        /*
         * Si même le normal
         * ne fonctionne pas,
         * on supprime seulement
         * cette image.
         */

        img.remove();

      }

    };


    img.alt =
      pokemon.name;


    img.draggable =
      false;


    /*
     * Position.
     */

    img.style.left =
      `${x}%`;

    img.style.top =
      `${y}%`;


    /*
     * Taille aléatoire.
     */

    const size =
      48 +
      Math.random() * 42;


    img.style.width =
      `${size}px`;

    img.style.height =
      `${size}px`;


    /*
     * Rotation.
     */

    img.style.setProperty(
      "--rotation",
      `${-8 + Math.random() * 16}deg`
    );


    /*
     * Animation différente
     * pour chaque Pokémon.
     */

    img.style.setProperty(
      "--duration",
      `${6 + Math.random() * 7}s`
    );


    img.style.setProperty(
      "--delay",
      `${Math.random() * -8}s`
    );


    /*
     * Mega légèrement plus visible.
     */

    if (pokemon.mega) {

      img.classList.add(
        "mega-pokemon"
      );

    }


    pokemonBackground.appendChild(
      img
    );

  });

}


/* =========================================================
   FOND INITIAL
   ========================================================= */

createPokemonBackground("all");


/* =========================================================
   BOUTON HOENN
   ========================================================= */

function openHoenn() {

  window.location.href =
    "pokedex/hoenn/";

}


/*
 * On utilise un écouteur,
 * mais uniquement si les boutons existent.
 */

const regionButtons =
  document.querySelectorAll(
    ".region-card"
  );


regionButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const region =
        button.dataset.region;


      if (
        region === "hoenn"
      ) {

        openHoenn();

      }

    }
  );

});


/* =========================================================
   SÉCURITÉ :
   Si le bouton existe mais qu'un
   autre script interfère, le clic
   reste fonctionnel.
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".region-card"
      );


    if (!button) {
      return;
    }


    if (
      button.dataset.region === "hoenn"
    ) {

      event.preventDefault();

      openHoenn();

    }

  }
);
