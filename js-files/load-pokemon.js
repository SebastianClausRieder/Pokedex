// Global Variables for load Pokemons

let correntPokemon;
let pokemonID;
let pokemonCardBG;
let pokemonTypeONE;
let pokemonTypeTWO;

// Functions for load Pokemons

async function loadPokedex() {
    for (let p = 1; p < 151; p++) { // 1011
        const pokemon = p;
        await loadPokemon(pokemon);
    }
}

async function loadPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    correntPokemon = await response.json();

    pokemonTypeAvailable();
    pokemonType();
    renderPokemonCard();
}

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
    }
    if (correntType == 'dark') {
        pokemonCardBG = 'img/bg-dark.png';
    }
    if (correntType == 'dragon') {
        pokemonCardBG = '../img/bg-dragon.png';
    }
    if (correntType == 'electric') {
        pokemonCardBG = 'img/bg-electric.png';
    }
    if (correntType == 'fairy') {
        pokemonCardBG = 'img/bg-fairy.png';
    }
    if (correntType == 'fighting') {
        pokemonCardBG = 'img/bg-fighting.png';
    }
    if (correntType == 'fire') {
        pokemonCardBG = 'img/bg-fire.png';
    }
    if (correntType == 'flying') {
        pokemonCardBG = 'img/bg-flying.png';
    }
    if (correntType == 'ghost') {
        pokemonCardBG = 'img/bg-ghost.png';
    }
    if (correntType == 'grass') {
        pokemonCardBG = 'img/bg-grass.png';
    }
    if (correntType == 'ground') {
        pokemonCardBG = 'img/bg-ground.png';
    }
    if (correntType == 'ice') {
        pokemonCardBG = 'img/bg-ice.png';
    }
    if (correntType == 'normal') {
        pokemonCardBG = 'img/bg-normal.png';
    }
    if (correntType == 'poison') {
        pokemonCardBG = 'img/bg-poison.png';
    }
    if (correntType == 'psychic') {
        pokemonCardBG = 'img/bg-psychic.png';
    }
    if (correntType == 'rock') {
        pokemonCardBG = 'img/bg-rock.png';
    }
    if (correntType == 'steel') {
        pokemonCardBG = 'img/bg-steel.png';
    }
    if (correntType == 'water') {
        pokemonCardBG = 'img/bg-water.png';
    }
}

// Dark and Light Mode

document.addEventListener("DOMContentLoaded", function () {
    const btn1_ctn = document.getElementsByClassName("btn-container")[0];
    const one = document.querySelector(".fas");
    btn1_ctn.addEventListener("click", () => {
        one.classList.toggle("fa-circle");
        one.classList.toggle("fa-moon");
        one.classList.toggle("active");
        btn1_ctn.classList.toggle("changeBg");
    });
});

let mode = 'light';

function nightDay() {
    let nightDayMode1 = document.getElementById('pokedex-BG');
    let nightDayMode2 = document.getElementById('pokemonStats');
    let fontColor = document.getElementById('title');

    if (mode == 'light') {
        nightDayMode1.style = 'background-image: url(img/bg-darkmode.png)';
        nightDayMode2.style = 'background-image: url(img/bg-darkmode.png)';
        fontColor.classList.add('font-color-white');
        mode = 'dark';
    } else {
        nightDayMode1.style = 'background-image: url(img/bg-lightmode.png)';
        nightDayMode2.style = 'background-image: url(img/bg-lightmode.png)';
        fontColor.classList.remove('font-color-white');
        mode = 'light'
    }
}