async function showPokemon(clickedPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`;
    let response = await fetch(url);
    let showPokemon = await response.json();

    let selectetPokemon = document.getElementById('display');
    let selectetPokemonName = document.getElementById('green-display');
    let pokemonStats = document.getElementById('pokemonStats');
    pokemonStats.classList.add('d-show');

    selectetPokemon.innerHTML = /*html */ `<img src="${showPokemon['sprites']['other']['official-artwork']['front_default']}" class="selectet-pokemon">`;
    selectetPokemonName.innerHTML = /*html */ `<span class="gd-poke-name font-source-sans-pro">${showPokemon['forms'][0]['name']}`;
    // pokemonStats.innerHTML = showPokemonTemp(showPokemon);
}

function showPokemonTemp(showPokemon) {
    return /*html */ `
    `;
}

function goBack() {
    document.getElementById('pokemonStats').classList.remove('d-show');
}