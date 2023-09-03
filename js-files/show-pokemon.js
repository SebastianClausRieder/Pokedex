// Global Variables Show Pokemon Stats

let showPokemon;
let pokedexPokeID;
let evolutions;
let pokemonEvolution1;
let pokemonEvolutionURL1;
let evoPokemon1;
let pokemonEvolution2;
let pokemonEvolutionURL2;
let evoPokemon2;
let pokemonEvo1;
let pokemonEvo2;
let pokemonEvo3;
let data;
let additionalLabels = [];
let hiddenContain;
let pokeID;

// Global Eevee

let pokemonEevee;
let eeveeEvolutions;
let eeveeURLs = [];

// Functions Show Pokemon Stats

async function openPokedex(clickedPokemon) {
    undefineGlobalVariables();

    showPokemon = await fetchPokemonData(clickedPokemon);
    const selectetPokemon = document.getElementById('display');
    const controlPad = document.getElementById('control-pad-image');
    const showPokedex = document.getElementById('pokemonStats');
    showPokedex.classList.add('d-show');
    const pokemonStats = document.getElementById('right-side');
    pokemonNameAnimation();

    await processEvolutions(showPokemon);
    selectetPokemon.innerHTML = `<img src="${showPokemon['sprites']['other']['official-artwork']['front_default']}" class="selectet-pokemon">`;
    controlPad.innerHTML = padTemp();
    pokemonStats.innerHTML = showPokemonTemp();

    evolutionDetermination();
    statsRadarChart();
    adjustElementToScreen('status-area');
}

async function fetchPokemonData(clickedPokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`;
    return await fetchData(url);
}

async function processEvolutions(showPokemon) {
    pokeID = showPokemon['id'];
    pokemonEevee = showPokemon['forms'][0]['name'];
    await showEvolutions();
}

// Pokedex Right Side

function showPokemonTemp() {
    showPokedexPokemonID();
    return /*html */ `    
        <div class="pixel-image-ID font-source-sans-pro">
            <img src="${showPokemon['sprites']['front_default']}" class="pixel-image">
            <span class="pokedex-pokemon-name">${showPokemon['forms'][0]['name']}</span>
            <span class="pokedex-poke-id">#${pokedexPokeID}</span>
        </div>
        <canvas id="radarChart"></canvas>
        <div class="playable-skills">
            <button class="playable" onclick="showPlayableEditons()">Playable in Edition</button>
            <button class="skills" onclick="showSkills()">${showPokemon['forms'][0]['name']}'s Skills</button>
        </div>
        <div class="belowContainer">
            <div id="show-contain" class="show-contain"></div>
            <div id="evolutions">
            </div>
        </div>
    `;
}

function showPlayableEditons() {
    hiddenContain = document.getElementById('show-contain');
    hiddenContain.classList.add('d-show');
    hiddenContain.innerHTML = ``;
    hiddenContain.innerHTML = /*html */ `
        <button class="close-btn" onclick="closeHiddenContain()">X</button>
        <div id="lowerContain"></div>
    `;

    if (showPokemon['game_indices'].length > 0) {

        for (let pe = 0; pe < showPokemon['game_indices'].length; pe++) {
            const playableEdition = showPokemon['game_indices'][pe]['version']['name'];

            document.getElementById('lowerContain').innerHTML += /*html */ `
                <span class="playable-edition">${playableEdition}</span>
            `;
        }
    } else {
        document.getElementById('lowerContain').innerHTML += /*html */ `
                <span class="playable-edition">Unfortunately, no editions are known.</span>
            `;
    }
}

function showSkills() {
    hiddenContain = document.getElementById('show-contain');
    hiddenContain.classList.add('d-show');
    hiddenContain.innerHTML = ``;
    hiddenContain.innerHTML = /*html */ `
        <button class="close-btn" onclick="closeHiddenContain()">X</button>
        <div id="lowerContain"></div>
    `;

    for (let ps = 0; ps < showPokemon['moves'].length; ps++) {
        const skill = showPokemon['moves'][ps]['move']['name'];

        document.getElementById('lowerContain').innerHTML += /*html */ `
            <span class="playable-edition">${skill}</span>
        `;
    }
}

// Take Evolutions

async function showEvolutions() {
    const url = showPokemon['species']['url'];
    const species = await fetchData(url);

    const speciesURL = species['evolution_chain']['url'];
    evolutions = await fetchData(speciesURL);

    if (evolutions && evolutions['chain']) {
        await handleEvolutionChain(evolutions['chain']);
    }

    if (pokemonEevee == 'eevee') {
        eeveeEvolutions = evolutions['chain']['evolves_to'];
        await eevee(eeveeEvolutions);
    }
}

async function handleEvolutionChain(chain) {
    if (chain['evolves_to']) {
        await handleEvolution(chain['evolves_to'], 1);
    }

    if (
        chain['evolves_to'] &&
        chain['evolves_to'][0] &&
        chain['evolves_to'][0]['evolves_to']
    ) {
        await handleEvolution(chain['evolves_to'][0]['evolves_to'], 2);
    }
}

async function handleEvolution(evolutionChain, evolutionNumber) {
    if (evolutionChain[0] && evolutionChain[0]['species']) {
        let speciesName = evolutionChain[0]['species']['name'];
        let speciesURL = evolutionChain[0]['species']['url'];
        let newSpecies = await fetchData(speciesURL);
        let evoPokemonURL = newSpecies['varieties'][0]['pokemon']['url'];
        let evoPokemon = await fetchData(evoPokemonURL);

        if (evolutionNumber === 1) {
            pokemonEvolution1 = speciesName;
            evoPokemon1 = evoPokemon;
        } else if (evolutionNumber === 2) {
            pokemonEvolution2 = speciesName;
            evoPokemon2 = evoPokemon;
        }
    }
}

async function fetchData(url) {
    let response = await fetch(url);
    return await response.json();
}

async function eevee(eeveeEvolutions) {
    eeveeURLs = [];

    for (let e = 0; e < eeveeEvolutions.length; e++) {
        const speciesURL = eeveeEvolutions[e]['species']['url'];
        const speciesData = await fetchData(speciesURL);
        const pokemonURL = speciesData['varieties'][0]['pokemon']['url'];
        const pokemonData = await fetchData(pokemonURL);

        eeveeURLs[e] = pokemonData;
    }
}

// Evolution Determination

function evolutionDetermination() {
    const ignorPokemon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png';
    const pokemonEvoltions = document.getElementById('evolutions');
    pokemonEvo1 = showPokemon['sprites']['front_default'];
    pokemonEvo2 = evoPokemon1 && evoPokemon1['sprites'] ? evoPokemon1['sprites']['front_default'] : undefined;
    pokemonEvo3 = evoPokemon2 && evoPokemon2['sprites'] ? evoPokemon2['sprites']['front_default'] : undefined;

    if (pokemonEvo2 === ignorPokemon) {
        pokemonEvo2 = undefined;
    }

    if (pokemonEevee === 'eevee') { // Eevee Evolutions
        pokemonEvoltions.innerHTML = eeveeTemp();
    } else if (!pokemonEvo2 && !pokemonEvo3) { // If no Evolution
        pokemonEvoltions.innerHTML = onlyOne();
    } else if (pokemonEvo1 !== pokemonEvo2 && !pokemonEvo3) { // If 2 Evolutions and select the 1st
        pokemonEvoltions.innerHTML = firstOfTwoEvos();
    } else if (pokemonEvo1 === pokemonEvo2 && !pokemonEvo3) { // if 2 Evolutions and select the 2nd
        pokemonEvoltions.innerHTML = twoOfTwoEvos();
    } else if (pokemonEvo1 === pokemonEvo2 && pokemonEvo3) { // If 3 Evolutions and select the 2nd
        pokemonEvoltions.innerHTML = secOfThreeEvos();
    } else if (pokemonEvo1 === pokemonEvo3) { // If 3 Evolutions and select the 3rd
        pokemonEvoltions.innerHTML = thirdOfThreeEvos();
    } else { // If 3 Evolutions and select the 1st
        pokemonEvoltions.innerHTML = firstOfThreeEvos();
    }
}

function onlyOne() {
    return /*html */ `
    <div class="evo">
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
    </div>
`;
}

function firstOfTwoEvos() {
    return /*html */ `
        <div class="evo">
            <img src="${pokemonEvo1}" alt="" class="evolution">
            <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
        </div>
        <div class="evo-arrow-contain">
            <img src="img/icons/evo-arrow.png" alt="" class="evo-arrow">
        </div>
        <div class="evo">
            <img src="${pokemonEvo2}" alt="" class="evolution">
            <span class="poke-evo-name">${pokemonEvolution1}</span>
        </div>
    `;
}

function twoOfTwoEvos() {
    return /*html */ `
        <div class="evo">
            <img src="${pokemonEvo1}" alt="" class="evolution">
            <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
        </div>
    `;
}

function firstOfThreeEvos() {
    return /*html */ `
    <div class="evo">
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
    </div>
    <div class="evo-arrow-contain">
        <img src="img/icons/evo-arrow.png" alt="" class="evo-arrow">
    </div>
    <div class="evo">
        <img src="${pokemonEvo2}" alt="" class="evolution">
        <span class="poke-evo-name">${pokemonEvolution1}</span>
    </div>
    <div class="evo-arrow-contain">
        <img src="img/icons/evo-arrow.png" alt="" class="evo-arrow">
    </div>
    <div class="evo">
        <img src="${pokemonEvo3}" alt="" class="evolution">
        <span class="poke-evo-name">${pokemonEvolution2}</span>
    </div>
    `;
}

function secOfThreeEvos() {
    return /*html */ `
    <div class="evo">
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
    </div>
    <div class="evo-arrow-contain">
        <img src="img/icons/evo-arrow.png" alt="" class="evo-arrow">
    </div>
    <div class="evo">
        <img src="${pokemonEvo3}" alt="" class="evolution">
        <span class="poke-evo-name">${pokemonEvolution2}</span>
    </div>
`;
}

function thirdOfThreeEvos() {
    return /*html */ `
        <div class="evo">
            <img src="${pokemonEvo1}" alt="" class="evolution">
            <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
        </div>
    `;
}

function eeveeTemp() {
    let html = /*html */ `
        <div class="evo">
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <span class="poke-evo-name">${showPokemon['forms'][0]['name']}</span>
        </div>
        <div class="evo-arrow-contain">
            <img src="img/icons/evo-arrow.png" alt="" class="evo-arrow">
        </div>
        <div class="eevees-evos">
    `;

    for (let e = 0; e < eeveeURLs.length; e++) {
        const eeveeURL = eeveeURLs[e];
        const eeveeEvolution = eeveeEvolutions[e];

        html += /*html */ `
        <div class="evo">
          <img src="${eeveeURL['sprites']['front_default']}" alt="" class="evolution">
          <span class="poke-evo-name">${eeveeEvolution['species']['name']}</span>
        </div>
      `;
    }

    html += `</div>`;
    return html;
}

// Return and Close

function goBack() {
    document.getElementById('pokemonStats').classList.remove('d-show');
}

function closeHiddenContain() {
    hiddenContain.classList.remove('d-show');
}

// Format number open Pokedex

function pokedexPokemonID(number) {
    return number.toString().padStart(3, '0');
}

function showPokedexPokemonID() {
    let number = pokeID;

    pokedexPokeID = pokedexPokemonID(number);
}

// Text Animation

function pokemonNameAnimation() {
    let pokemonGDName = `${showPokemon['forms'][0]['name']}`;
    let gdPokeName = document.getElementById('pokemonGDName');
    gdPokeName.textContent = pokemonGDName;

    // Start Animation Manuel
    startAnimation(gdPokeName);
}

// Update Name
function updatePokemonName(newName) {
    let gdPokeName = document.getElementById('pokemonGDName');
    gdPokeName.textContent = newName;

    // Start Animation Manuel
    startAnimation(gdPokeName);
}

function startAnimation(element) {
    element.classList.add('animation');
}

// Previous or Next Pad

let previous;
let next;

function padTemp() {
    previous = pokeID - 1;
    next = pokeID + 1;
    if (previous == 0) {
        return /*html */ `
            <img src="img/icons/control-pad-right.png" class="right-control-pad">
            <div class="arrow-right" onclick="nextPokemon(${next})"></div>
        `;
    } else if (next == 1011) {
        return /*html */ `
            <img src="img/icons/control-pad-left.png" class="right-control-pad">
            <div class="arrow-left" onclick="previousPokemon(${previous})"></div>
        `;
    } else {
        return /*html */ `
            <img src="img/icons/control-pad.png" class="right-control-pad">
            <div class="arrow-left" onclick="previousPokemon(${previous})"></div>
            <div class="arrow-right" onclick="nextPokemon(${next})"></div>
        `;
    }
}

async function previousPokemon(previous) {
    document.getElementById('pokemonGDName').classList.remove('animation');
    await openPokedex(previous);
    updatePokemonName(showPokemon['forms'][0]['name']);
}

async function nextPokemon(next) {
    document.getElementById('pokemonGDName').classList.remove('animation');
    await openPokedex(next);
    updatePokemonName(showPokemon['forms'][0]['name']);
}

// Pokedex Scale written by ChatGPT

function adjustElementToScreen(elementId) {
    const element = document.getElementById(elementId);

    function scaleElement() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Anpassungsfaktor berechnen
        const scaleX = screenWidth / element.offsetWidth;
        const scaleY = screenHeight / element.offsetHeight;
        const scale = Math.min(scaleX, scaleY);

        // Element skalieren
        element.style.transform = `scale(${scale})`;
    }

    // Skalierung bei Fenstergrößenänderungen aktualisieren
    window.addEventListener('resize', scaleElement);

    // Skalierung initial durchführen
    scaleElement();
}

// Radar Chart in cooperation with ChatGPT

function statsRadarChart() {

    let options = {
        type: 'radar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Speed', 'SP.Def', 'SP.Atk'],
            datasets: [{
                label: 'Pokemon Stats',
                data: [],
                backgroundColor: 'rgba(101, 15, 181, 0.3)', // Hintergrundfarbe des Charts
                borderColor: 'rgba(101, 15, 181, 0.3)', // Farbe der Linie
                borderWidth: 0.5, // Dicke der Linie
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 1,
                    pointLabels: {
                        font: {
                            size: 16,
                            weight: 700
                        }
                    }
                }
            }
        }
    }

    for (let ps = 0; ps < 6; ps++) {
        options.data.datasets[0].data[ps] = showPokemon['stats'][ps]['base_stat'];
        additionalLabels.push(`${showPokemon['stats'][ps]['base_stat']}`);
    }

    options.data.labels = options.data.labels.map((label, index) => `${label}\n${additionalLabels[index]}`);

    let ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, options);

    Chart.defaults.font.size = 16;
    Chart.defaults.font.weight = 700;
}

function statsRadarChartResponsiv() {

    let options = {
        type: 'radar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Speed', 'SP.Def', 'SP.Atk'],
            datasets: [{
                label: 'Pokemon Stats',
                data: [],
                backgroundColor: 'rgba(101, 15, 181, 0.3)', // Hintergrundfarbe des Charts
                borderColor: 'rgba(101, 15, 181, 0.3)', // Farbe der Linie
                borderWidth: 0.5, // Dicke der Linie
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 1,
                    pointLabels: {
                        font: {
                            size: 9,
                            weight: 700
                        }
                    }
                }
            }
        }
    }

    for (let ps = 0; ps < 6; ps++) {
        options.data.datasets[0].data[ps] = showPokemon['stats'][ps]['base_stat'];
        additionalLabels.push(`${showPokemon['stats'][ps]['base_stat']}`);
    }

    options.data.labels = options.data.labels.map((label, index) => `${label}\n${additionalLabels[index]}`);

    let ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, options);

    Chart.defaults.font.size = 9;
    Chart.defaults.font.weight = 700;
}

// Undefine Global Variables

function undefineGlobalVariables() {
    evoPokemon1 = undefined;
    evoPokemon2 = undefined;
    pokemonEvo1 = undefined;
    pokemonEvo2 = undefined;
    pokemonEvo3 = undefined;
}