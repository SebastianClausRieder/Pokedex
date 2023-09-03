// Global Variables for load Pokemons

let correntPokemon;
let pokemonID;
let pokemonCardBG;
let pokemonTypeONE;
let pokemonTypeTWO;
let loadedPokemons = 50;
let pokemonToLoad = 1;
let aktuallLoadedPokemon = 0;
let scroll = false;

// Functions for load Pokemons

async function loadPokedex() {
    let imLoading = document.getElementById('onloading');
    imLoading.innerHTML = /*html */ `<span class="loading">Loading!</span>`;

    if (window.innerWidth > 1000) {
        adjustElementToScreen('navinterface');
    }

    for (let p = pokemonToLoad; p <= loadedPokemons; p++) {
        await loadPokemon(p);
        await updatePokemonCounter();
    } 
        
    imLoading.innerHTML = /*html */ ``;

    await updatePokemonLoadCounts();
}

async function updatePokemonCounter() {
    document.getElementById('pokemonInArea').innerHTML = /*html */ `<span class="in-area">${aktuallLoadedPokemon} Pokemon Loaded</span>`;
}

async function updatePokemonLoadCounts() {
    if (pokemonToLoad <= 50) {
        loadedPokemons += 25;
        pokemonToLoad += 50;        
    } else if (pokemonToLoad <= 975) {
        loadedPokemons += 25;
        pokemonToLoad += 25;
    } else if (pokemonToLoad == 976) {
        loadedPokemons += 10;
        pokemonToLoad += 25;
    } else if (pokemonToLoad == 1001) {
        loadedPokemons = 1011;
        scroll = true;
        infoArea.innerHTML = /*html */ `All Pokemon loaded`;
    }
}


// Loading by Scrolling Function

document.addEventListener("DOMContentLoaded", function () {
    let content = document.getElementById("pokemonArea");
    let infoArea = document.getElementById('info');
    content.addEventListener("scroll", async function (event) {
        if (!scroll && loadedPokemons < 1011) {
            scroll = true;
            infoArea.innerHTML = /*html */ `Scroll Loading Timeout`;
            await loadPokedex();
            scroll = false;
            infoArea.innerHTML = /*html */ `Scroll Loading Aktive`;
        }
    });
});

async function loadPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    await checkURLExists(url)
        .then(async exists => {
            if (exists) {
                let response = await fetch(url);
                correntPokemon = await response.json();
                aktuallLoadedPokemon += 1;
        
                pokemonTypeAvailable();
                pokemonType();
                renderPokemonCard();
            } else {
                document.getElementById('pokemonArea').innerHTML = `Wrong Input!`;
                document.getElementById('info').innerHTML = ``;
            }
        })
        .catch(error => {
            console.error("Fehler beim Überprüfen der URL:", error);
        });
}

async function checkURLExists(url) {
    try {
      const response = await fetch(url);
      return response.ok; // Verify that the status code is 200 (OK).
    } catch (error) {
      console.error(error);
      return false; // Error getting URL
    }
}

// Pokemon Cards

function renderPokemonCard() {
    let pokemonCard = document.getElementById('pokemonArea');
    pokemonCard.innerHTML += pokeCardTemp();
}

function pokeCardTemp() {
    showAreaPokemonID();
    return /*html */ `
    <div class="pokemon-card font-source-sans-pro" style="background-image: url(${pokemonCardBG});" onclick="openPokedex(${correntPokemon['id']})">
        <div class="name-id">
            <span class="poke-name">${correntPokemon['forms'][0]['name']}</span>
            <span class="poke-id">#${pokemonID}</span>
        </div>
        <div class="types-image">
            <div id="types">
                <span class="type">${pokemonTypeONE}</span>
                <span class="type">${pokemonTypeTWO}</span>
            </div>
            <img src="${correntPokemon['sprites']['other']['official-artwork']['front_default']}" class="poke-image">
        </div>
    </div>
    `;
}

// Format number Pokedex Area

function areaPokemonID(zahl) {
    return zahl.toString().padStart(3, '0');
}

function showAreaPokemonID() {
    let zahl = correntPokemon['id'];

    pokemonID = areaPokemonID(zahl);
}

// Type available

function pokemonTypeAvailable() {
    pokemonTypeONE = correntPokemon['types'][0]['type']['name'];

    if (correntPokemon['types'][1] !== undefined) {
        if (correntPokemon['types'][1]['type'] !== undefined) {
            pokemonTypeTWO = correntPokemon['types'][1]['type']['name'];
        }
    } else {
        pokemonTypeTWO = '';
    }
}

// Type determination

function pokemonType() {
    const typeToBG = {
        'bug': 'img/bg-bug.png',
        'dark': 'img/bg-dark.png',
        'dragon': 'img/bg-dragon.png',
        'electric': 'img/bg-electric.png',
        'fairy': 'img/bg-fairy.png',
        'fighting': 'img/bg-fighting.png',
        'fire': 'img/bg-fire.png',
        'flying': 'img/bg-flying.png',
        'ghost': 'img/bg-ghost.png',
        'grass': 'img/bg-grass.png',
        'ground': 'img/bg-ground.png',
        'ice': 'img/bg-ice.png',
        'normal': 'img/bg-normal.png',
        'poison': 'img/bg-poison.png',
        'psychic': 'img/bg-psychic.png',
        'rock': 'img/bg-rock.png',
        'steel': 'img/bg-steel.png',
        'water': 'img/bg-water.png',
    };

    const correntType = correntPokemon['types'][0]['type']['name'];
    pokemonCardBG = typeToBG[correntType] || '';
}