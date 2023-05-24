function loadPokedex() {
    for (let p = 0; p < pokemons.length; p++) {
        const pokemon = pokemons[p].toLowerCase();
        loadPokemon(pokemon);
    }
}

async function loadPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let correntPokemon = await response.json();
    console.log(correntPokemon);
}