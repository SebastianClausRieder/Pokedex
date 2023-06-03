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
let data;
let additionalLabels = [];
let hiddenContain;

// Global Eevee

let pokemonEevee;
let eeveeEvolutions;
let eeveeURL1;
let eeveeURL2;
let eeveeURL3;
let eeveeURL4;
let eeveeURL5;
let eeveeURL6;
let eeveeURL7;
let eeveeURL8;

// Functions Show Pokemon Stats

async function openPokedex(clickedPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`;
    let response = await fetch(url);
    showPokemon = await response.json();
    await showEvolutions();
    pokemonEevee = showPokemon['forms'][0]['name'];

    let selectetPokemon = document.getElementById('display');
    let selectetPokemonName = document.getElementById('green-display');
    let showPokedex = document.getElementById('pokemonStats');
    showPokedex.classList.add('d-show');
    let pokemonStats = document.getElementById('right-side');
    pokemonNameAnimation();

    selectetPokemon.innerHTML = /*html */ `<img src="${showPokemon['sprites']['other']['official-artwork']['front_default']}" class="selectet-pokemon">`;
    pokemonStats.innerHTML = showPokemonTemp();
    evolutionDetermination();
    adjustElementToScreen('status-area');
    statsRadarChart();
}

async function showEvolutions() {
    let url = showPokemon['species']['url'];
    let response = await fetch(url);
    let species = await response.json();

    let speciesURL = species['evolution_chain']['url'];
    let speciesResponse = await fetch(speciesURL);
    evolutions = await speciesResponse.json();

    if (
        evolutions &&
        evolutions['chain'] &&
        evolutions['chain']['evolves_to'] &&
        evolutions['chain']['evolves_to'][0] &&
        evolutions['chain']['evolves_to'][0]['species']) {

        pokemonEvolution1 = evolutions['chain']['evolves_to'][0]['species']['name'];
        pokemonEvolutionURL1 = evolutions['chain']['evolves_to'][0]['species']['url'];
        eeveeEvolutions = evolutions['chain']['evolves_to'];
        eevee(eeveeEvolutions);

        let evoResponse1 = await fetch(pokemonEvolutionURL1);
        let newSpecies1 = await evoResponse1.json();
        let evoPokemonURL1 = newSpecies1['varieties'][0]['pokemon']['url'];

        let evoPokemonResponse1 = await fetch(evoPokemonURL1);
        evoPokemon1 = await evoPokemonResponse1.json();
    } else {
        evoPokemon1;
    }

    if (
        evolutions &&
        evolutions['chain'] &&
        evolutions['chain']['evolves_to'] &&
        evolutions['chain']['evolves_to'][0] &&
        evolutions['chain']['evolves_to'][0]['evolves_to'] &&
        evolutions['chain']['evolves_to'][0]['evolves_to'][0] &&
        evolutions['chain']['evolves_to'][0]['evolves_to'][0]['species'] &&
        evolutions['chain']['evolves_to'][0]['evolves_to'][0]['species']['name']) {

        pokemonEvolution2 = evolutions['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
        pokemonEvolutionURL2 = evolutions['chain']['evolves_to'][0]['evolves_to'][0]['species']['url'];

        let evoResponse2 = await fetch(pokemonEvolutionURL2);
        let newSpecies2 = await evoResponse2.json();
        let evoPokemonURL2 = newSpecies2['varieties'][0]['pokemon']['url'];

        let evoPokemonResponse2 = await fetch(evoPokemonURL2);
        evoPokemon2 = await evoPokemonResponse2.json();
    } else {
        evoPokemon2;
    }
}

async function eevee(eeveeEvolutions) {

        // Vaporeon

        let eeveeResponse1 = await fetch(eeveeEvolutions[0]['species']['url']);
        let eeveeSpecies1 = await eeveeResponse1.json();
        let eeveePokemonURL1 = eeveeSpecies1['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse1 = await fetch(eeveePokemonURL1);
        eeveeURL1 = await eeveePokemonResponse1.json();

        // Jolteon
        
        let eeveeResponse2 = await fetch(eeveeEvolutions[1]['species']['url']);
        let eeveeSpecies2 = await eeveeResponse2.json();
        let eeveePokemonURL2 = eeveeSpecies2['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse2 = await fetch(eeveePokemonURL2);
        eeveeURL2 = await eeveePokemonResponse2.json();

        // Flareon
        
        let eeveeResponse3 = await fetch(eeveeEvolutions[2]['species']['url']);
        let eeveeSpecies3 = await eeveeResponse3.json();
        let eeveePokemonURL3 = eeveeSpecies2['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse3 = await fetch(eeveePokemonURL3);
        eeveeURL3 = await eeveePokemonResponse3.json();

        // Espeon
        
        let eeveeResponse4 = await fetch(eeveeEvolutions[3]['species']['url']);
        let eeveeSpecies4 = await eeveeResponse4.json();
        let eeveePokemonURL4 = eeveeSpecies4['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse4 = await fetch(eeveePokemonURL4);
        eeveeURL4 = await eeveePokemonResponse4.json();

        // Umbreon
        
        let eeveeResponse5 = await fetch(eeveeEvolutions[4]['species']['url']);
        let eeveeSpecies5 = await eeveeResponse5.json();
        let eeveePokemonURL5 = eeveeSpecies5['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse5 = await fetch(eeveePokemonURL5);
        eeveeURL5 = await eeveePokemonResponse5.json();

        // Leafeon
        
        let eeveeResponse6 = await fetch(eeveeEvolutions[5]['species']['url']);
        let eeveeSpecies6 = await eeveeResponse6.json();
        let eeveePokemonURL6 = eeveeSpecies6['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse6 = await fetch(eeveePokemonURL6);
        eeveeURL6 = await eeveePokemonResponse6.json();

        // Glaceon
        
        let eeveeResponse7 = await fetch(eeveeEvolutions[6]['species']['url']);
        let eeveeSpecies7 = await eeveeResponse7.json();
        let eeveePokemonURL7 = eeveeSpecies7['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse7 = await fetch(eeveePokemonURL7);
        eeveeURL7 = await eeveePokemonResponse7.json();

        // Sylveon
        
        let eeveeResponse8 = await fetch(eeveeEvolutions[7]['species']['url']);
        let eeveeSpecies8 = await eeveeResponse8.json();
        let eeveePokemonURL8 = eeveeSpecies8['varieties'][0]['pokemon']['url'];

        let eeveePokemonResponse8 = await fetch(eeveePokemonURL8);
        eeveeURL8 = await eeveePokemonResponse8.json();
}

function evolutionDetermination() {
    let pokemonEvoltions = document.getElementById('evolutions');
    let pokemonEvo1 = showPokemon['sprites']['front_default'];
    let pokemonEvo2;
    let pokemonEvo3;

    if (
        evoPokemon1 &&
        evoPokemon1['sprites'] &&
        evoPokemon1['sprites']['front_default']) {
        pokemonEvo2 = evoPokemon1['sprites']['front_default'];
    } else {
        pokemonEvo2;
    }

    if (
        evoPokemon2 &&
        evoPokemon2['sprites'] &&
        evoPokemon2['sprites']['front_default']) {
        pokemonEvo3 = evoPokemon2['sprites']['front_default'];
    } else {
        pokemonEvo3;
    }

    if (pokemonEvo2 == undefined && pokemonEvo3 == undefined) {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">        
        `;
    } else if (pokemonEevee == 'eevee') {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <img src="${pokemonEvo2}" alt="" class="evolution">        
        `;
    } else if (pokemonEvo1 == pokemonEvo2 && pokemonEvo3 !== undefined) {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <img src="${pokemonEvo3}" alt="" class="evolution">        
        `;
    } else if (pokemonEvo1 !== pokemonEvo2 && pokemonEvo3 == undefined) {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution"> 
        <img src="${pokemonEvo2}" alt="" class="evolution">       
        `;
    } else if (pokemonEvo1 == pokemonEvo2 && pokemonEvo3 == undefined) {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">        
        `;
    } else if (pokemonEvo1 == pokemonEvo3) {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">        
        `;
    } else if (pokemonEvo2 == undefined && pokemonEvo3 == undefined) {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">
        `;
    } else {
        pokemonEvoltions.innerHTML = /*html */ `
        <img src="${pokemonEvo1}" alt="" class="evolution">
        <img src="${pokemonEvo2}" alt="" class="evolution">
        <img src="${pokemonEvo3}" alt="" class="evolution">        
        `;
    }
}

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

    for (let pe = 0; pe < showPokemon['game_indices'].length; pe++) {
        const playableEdition = showPokemon['game_indices'][pe]['version']['name'];

        document.getElementById('lowerContain').innerHTML += /*html */ `
            <div class="playable-edition">${playableEdition}</div>
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
            <div class="playable-edition">${skill}</div>
        `;
    }
}

function goBack() {
    document.getElementById('pokemonStats').classList.remove('d-show');
}

function closeHiddenContain() {
    hiddenContain.classList.remove('d-show');
}

// Format number open Pokedex

function pokedexPokemonID(zahl) {
    return zahl.toString().padStart(3, '0');
}

function showPokedexPokemonID() {
    let zahl = showPokemon['id'];

    pokedexPokeID = pokedexPokemonID(zahl);
}

// Text Animation

function pokemonNameAnimation() {
    let pokemonGDName = `${showPokemon['forms'][0]['name']}`;
    let gdPokeName = document.getElementById('pokemonGDName');
    gdPokeName.textContent = pokemonGDName;
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

        // Abstand von 25px oben und unten berechnen
        const offset = 25;
        const translateY = (screenHeight - (element.offsetHeight * scale)) / 2 - offset;

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
                backgroundColor: 'rgba(101, 15, 181, 1)', // Hintergrundfarbe des Charts
                borderColor: 'rgba(101, 15, 181, 1)', // Farbe der Linie
                borderWidth: 1, // Dicke der Linie
            }]
        },
        options: {
            scales: {
                r: {
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

    Chart.defaults.font.size = 20;
}