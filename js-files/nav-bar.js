// Search Info Fild
let infoText = false;

function info() {

    if (!infoText) {
        document.getElementById('infoFild').classList.add('d-show');
        infoText = true;
    } else {
        document.getElementById('infoFild').classList.remove('d-show');
        infoText = false;
    }
}

// Loading with Search Function

async function searchPokemon() {
    aktuallLoadedPokemon = 0;
    loadedPokemons = 0;
    pokemonToLoad = 0;
    document.getElementById('pokemonArea').innerHTML = ``;
    document.getElementById('info').innerHTML = ``;
    let inputFild = document.getElementById('searchfild').value;
    let input = inputFild.toLowerCase();
    await loadPokemon(input);
    document.getElementById('pokemonInArea').innerHTML = /*html */ `<span class="in-area">${aktuallLoadedPokemon} Pokemon Loaded</span>`;
}

// Loading by Button

async function loadAllPokemon() {
    document.getElementById('loadAllBTN').disabled = true;
    remarksBevorLoad();

    loadedPokemons = 1010;
    pokemonToLoad = 1;

    await loadPokedex();

    loadedPokemons = 1011;

    document.getElementById('info').innerHTML = /*html */ `All Pokemon loaded`;
    document.getElementById('loadAllBTN').disabled = false;
}

// Loading by Type

async function showType(type) {
    document.getElementById(type).classList.add('disabled');
    document.getElementById('onloading').innerHTML = /*html */ `<span class="loading">Loading!</span>`;
    remarksBevorLoad();

    loadedPokemons = 0;
    pokemonToLoad = 0;

    let url = `https://pokeapi.co/api/v2/type/${type}`;
    let response = await fetch(url);
    let typedPokemon = await response.json();
    const correntTypeArray = typedPokemon['pokemon'];

    for (let pt = 0; pt < correntTypeArray.length; pt++) {
        const pokemonByType = correntTypeArray[pt];
        let pokemonByTypeURL = pokemonByType['pokemon']['url'];
        let response = await fetch(pokemonByTypeURL);
        let correntTypedPokemon = await response.json();
        let pokemonByTypeID = correntTypedPokemon['id'];

        await loadPokemon(pokemonByTypeID);
     
        document.getElementById('pokemonInArea').innerHTML = /*html */ `<span class="in-area">${aktuallLoadedPokemon} ${type} Pokemon Loaded</span>`;
    }

    document.getElementById('onloading').innerHTML = /*html */ ``;
    document.getElementById('info').innerHTML = /*html */ `All ${type} Pokemon loaded`;
    document.getElementById(type).classList.remove('disabled');
}

// Remarks

function remarksBevorLoad() {
    document.getElementById('info').innerHTML = /*html */ `Scroll Loading Timeout`;
    document.getElementById('pokemonArea').innerHTML = ``;
    scroll = true;
    aktuallLoadedPokemon = 0;
}