// Search Info Fild
let correntTypeArray;
let infoText = false;
let disabled = false;

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
    remarksBevorLoad();
    disableButtons();

    loadedPokemons = 1010;
    pokemonToLoad = 1;

    await loadPokedex();

    loadedPokemons = 1011;

    document.getElementById('info').innerHTML = /*html */ `All Pokemon loaded`;
    disableButtons();
}

// Loading by Type

async function showType(type) {
    let onLoading = document.getElementById('onloading');
    onLoading.innerHTML = /*html */ `<span class="loading">Loading!</span>`;
    remarks();
    disableButtons();

    loadedPokemons = 0;
    pokemonToLoad = 0;

    let url = `https://pokeapi.co/api/v2/type/${type}`;
    let typedPokemon = await fetchData(url);
    correntTypeArray = typedPokemon['pokemon'];

    await loadCorrentType(type);

    onLoading.innerHTML = /*html */ ``;
    document.getElementById('info').innerHTML = /*html */ `All ${type} Pokemon loaded`;
    disableButtons();
}

async function loadCorrentType(type) {
    for (let pt = 0; pt < correntTypeArray.length; pt++) {
        const pokemonByType = correntTypeArray[pt];
        let pokemonByTypeURL = pokemonByType['pokemon']['url'];
        let response = await fetch(pokemonByTypeURL);
        let correntTypedPokemon = await response.json();
        let pokemonByTypeID = correntTypedPokemon['id'];

        await loadPokemon(pokemonByTypeID);

        document.getElementById('pokemonInArea').innerHTML = /*html */ `<span class="in-area">${aktuallLoadedPokemon} ${type} Pokemon Loaded</span>`;
    }
}

// Remarks and disables

function remarks() {
    document.getElementById('info').innerHTML = /*html */ `Scroll Loading Timeout`;
    document.getElementById('pokemonArea').innerHTML = ``;
    scroll = true;
    aktuallLoadedPokemon = 0;
}

function disableButtons() {
    let containers = document.getElementsByClassName('button');

    if (!disabled) {
        document.getElementById('loadAllBTN').disabled = true;
        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.add('disabled');
        }
        disabled = true;
    } else {
        document.getElementById('loadAllBTN').disabled = false;
        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove('disabled');
        }
        disabled = false;
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
    let navBG = document.getElementById('navinterface');
    let fontColor = document.getElementById('title');

    if (mode == 'light') {
        nightDayMode1.style = 'background-image: url(img/bg-darkmode.png)';
        nightDayMode2.style = 'background-image: url(img/bg-darkmode.png)';
        navBG.classList.add('bg-dark');
        fontColor.classList.add('font-color-white');
        mode = 'dark';
    } else {
        nightDayMode1.style = 'background-image: url(img/bg-lightmode.png)';
        nightDayMode2.style = 'background-image: url(img/bg-lightmode.png)';
        navBG.classList.remove('bg-dark');
        fontColor.classList.remove('font-color-white');
        mode = 'light'
    }
}