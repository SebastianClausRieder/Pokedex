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
        const pokemon = p;
        await loadPokemon(pokemon);
        document.getElementById('pokemonInArea').innerHTML = /*html */ `<span class="in-area">${aktuallLoadedPokemon} Pokemon Loaded</span>`;
    } 
        
    imLoading.innerHTML = /*html */ ``;

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
    let correntType = correntPokemon['types'][0]['type']['name'];

      if (correntType == 'bug') {
        pokemonCardBG = 'img/bg-bug.png';
    } if (correntType == 'dark') {
        pokemonCardBG = 'img/bg-dark.png';
    } if (correntType == 'dragon') {
        pokemonCardBG = 'img/bg-dragon.png';
    } if (correntType == 'electric') {
        pokemonCardBG = 'img/bg-electric.png';
    } if (correntType == 'fairy') {
        pokemonCardBG = 'img/bg-fairy.png';
    } if (correntType == 'fighting') {
        pokemonCardBG = 'img/bg-fighting.png';
    } if (correntType == 'fire') {
        pokemonCardBG = 'img/bg-fire.png';
    } if (correntType == 'flying') {
        pokemonCardBG = 'img/bg-flying.png';
    } if (correntType == 'ghost') {
        pokemonCardBG = 'img/bg-ghost.png';
    } if (correntType == 'grass') {
        pokemonCardBG = 'img/bg-grass.png';
    } if (correntType == 'ground') {
        pokemonCardBG = 'img/bg-ground.png';
    } if (correntType == 'ice') {
        pokemonCardBG = 'img/bg-ice.png';
    } if (correntType == 'normal') {
        pokemonCardBG = 'img/bg-normal.png';
    } if (correntType == 'poison') {
        pokemonCardBG = 'img/bg-poison.png';
    } if (correntType == 'psychic') {
        pokemonCardBG = 'img/bg-psychic.png';
    } if (correntType == 'rock') {
        pokemonCardBG = 'img/bg-rock.png';
    } if (correntType == 'steel') {
        pokemonCardBG = 'img/bg-steel.png';
    } if (correntType == 'water') {
        pokemonCardBG = 'img/bg-water.png';
    }
}