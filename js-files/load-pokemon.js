async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    let correntPokemon = await response.json();
    console.log(correntPokemon);
}