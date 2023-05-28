// Global Variables Show Pokemon Stats



// Functions Show Pokemon Stats

async function showPokemon(clickedPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`;
    let response = await fetch(url);
    let showPokemon = await response.json();

    let selectetPokemon = document.getElementById('display');
    let selectetPokemonName = document.getElementById('green-display');
    let pokemonStats = document.getElementById('pokemonStats');
    pokemonStats.classList.add('d-show');
    pokemonNameAnimation(showPokemon);

    selectetPokemon.innerHTML = /*html */ `<img src="${showPokemon['sprites']['other']['official-artwork']['front_default']}" class="selectet-pokemon">`;
    // pokemonStats.innerHTML = showPokemonTemp(showPokemon);
}

function showPokemonTemp(showPokemon) {
    return /*html */ `
    `;
}

function goBack() {
    document.getElementById('pokemonStats').classList.remove('d-show');
}

function pokemonNameAnimation(showPokemon) {
    let pokemonGDName = `${showPokemon['forms'][0]['name']}`;
    let gdPokeName = document.getElementById('pokemonGDName');
    gdPokeName.textContent = pokemonGDName;
}