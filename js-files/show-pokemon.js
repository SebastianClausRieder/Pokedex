async function showPokemon(clickedPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`;
    let response = await fetch(url);
    let showPokemon = await response.json();

    let pokemonStats = document.getElementById('pokemonStats');
    pokemonStats.classList.add('d-show');

    pokemonStats.innerHTML = showPokemonTemp(showPokemon);
}

function showPokemonTemp(showPokemon) {
    return /*html */ `
        <div class="status-area"></div>
    `;
}