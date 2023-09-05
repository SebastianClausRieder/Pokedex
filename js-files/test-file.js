

let POKEDEX = [];

async function loadPokemonInfosToArray() {
    for (let PM = 1; PM <= 1010; PM++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${PM}`;
        await checkURLExists(url)
            .then(async exists => {
                if (exists) {
                    let response = await fetch(url);
                    correntPokemon = await response.json();

                    const PMName = correntPokemon['forms'][0]['name'];
                    const PMID = areaPokemonID(correntPokemon['id']);
                    const PMTypeOne = correntPokemon['types'][0]['type']['name'];
                    const PMTypeTwo = correntPokemon['types'][1]?.['type']['name'] || '';
                    const PMImage = correntPokemon['sprites']['other']['official-artwork']['front_default'];

                    POKEDEX.push({
                        pokeName: PMName,
                        pokeID: PMID,
                        pokeTypeOne: PMTypeOne,
                        pokeTypeTwo: PMTypeTwo,
                        pokeImage: PMImage
                    })

                    console.log(POKEDEX.length);
                } else {
                    document.getElementById('pokemonArea').innerHTML = `Wrong Input!`;
                    document.getElementById('info').innerHTML = ``;
                }
            })
            .catch(error => {
                console.error("Fehler beim Überprüfen der URL:", error);
            });
    }
}