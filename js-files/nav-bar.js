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
    resetPokemonCounts();
    clearPokemonArea();

    const inputField = document.getElementById('searchfild').value.toLowerCase();
    await loadPokemon(inputField);

    updatePokemonCounter();
}

function resetPokemonCounts() {
    aktuallLoadedPokemon = 0;
    loadedPokemons = 0;
    pokemonToLoad = 0;
}

function clearPokemonArea() {
    document.getElementById('pokemonArea').innerHTML = '';
    document.getElementById('info').innerHTML = '';
}

function updatePokemonCounter() {
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

    resetPokemonCounts();

    let url = `https://pokeapi.co/api/v2/type/${type}`;
    let typedPokemon = await fetchData(url);
    correntTypeArray = typedPokemon['pokemon'];

    await loadCorrentType(type);

    onLoading.innerHTML = /*html */ ``;
    displayInfoMessage(`All ${type} Pokemon loaded`);
    disableButtons();
}

function displayInfoMessage(message) {
    document.getElementById('info').innerHTML = /*html */ message;
}

async function loadCorrentType(type) {
    for (let pt = 0; pt < correntTypeArray.length; pt++) {
        const pokemonByType = correntTypeArray[pt];
        let pokemonByTypeURL = pokemonByType['pokemon']['url'];
        let response = await fetch(pokemonByTypeURL);
        let correntTypedPokemon = await response.json();
        let pokemonByTypeID = correntTypedPokemon['id'];

        await loadPokemon(pokemonByTypeID);

        updatePokemonCounterWith(type);
    }
}

function updatePokemonCounterWith(type) {
    document.getElementById('pokemonInArea').innerHTML = /*html */ `<span class="in-area">${aktuallLoadedPokemon} ${type} Pokemon Loaded</span>`;
}

// Remarks and disables

function remarks() {
    document.getElementById('info').innerHTML = /*html */ `Scroll Loading Timeout`;
    document.getElementById('pokemonArea').innerHTML = ``;
    scroll = true;
    aktuallLoadedPokemon = 0;
}

function disableButtons() {
    const containers = document.getElementsByClassName('button');
    const loadAllBTN = document.getElementById('loadAllBTN');
    const isDisabled = !loadAllBTN.disabled;

    loadAllBTN.disabled = isDisabled;

    for (const container of containers) {
        if (isDisabled) {
            container.classList.add('disabled');
        } else {
            container.classList.remove('disabled');
        }
    }
}

// Dark and Light Mode

function checkWindowWidth() {
    let windowWidth = this.window.innerWidth;
    let darkLightMain = document.getElementById('dark-light-mode-main');
    let darkLightResponsive = document.getElementById('dark-light-mode-responsive');
    
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';
    btnContainer.onclick = nightDay;
    
    const circleIcon = document.createElement('i');
    circleIcon.className = 'fas fa-circle';
    
    btnContainer.appendChild(circleIcon);
    
    darkLightResponsive.innerHTML = '';
    darkLightMain.innerHTML = '';
    
    if (windowWidth < 601) {
        darkLightResponsive.appendChild(btnContainer);
    } else {
        darkLightMain.appendChild(btnContainer);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    checkWindowWidth()
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
    const nightDayMode1 = document.getElementById('pokedex-BG');
    const nightDayMode2 = document.getElementById('pokemonStats');
    const navBG = document.getElementById('navinterface');
    const fontColor = document.getElementById('title');

    function applyDarkMode() {
        nightDayMode1.style.backgroundImage = 'url(img/bg-darkmode.png)';
        nightDayMode2.style.backgroundImage = 'url(img/bg-darkmode.png)';
        navBG.classList.add('bg-dark');
        fontColor.classList.add('font-color-white');
        if (window.innerWidth <= 600) {
            statsBarChart();
        } else {
            statsRadarChart();
        }
    }

    function applyLightMode() {
        nightDayMode1.style.backgroundImage = 'url(img/bg-lightmode.png)';
        nightDayMode2.style.backgroundImage = 'url(img/bg-lightmode.png)';
        navBG.classList.remove('bg-dark');
        fontColor.classList.remove('font-color-white');
        if (window.innerWidth <= 600) {
            statsBarChart();
        } else {
            statsRadarChart();
        }
    }

    // Überprüfen und Umschalten des Modus
    if (mode === 'light') {
        applyDarkMode();
        mode = 'dark';
    } else {
        applyLightMode();
        mode = 'light';
    }
}

// Type Menu

let menuOpen = false;

function showTypeBTN() {
    const pokeballClose = document.getElementById('menu-btn-close');
    const pokeballOpen = document.getElementById('menu-btn-open');
    const typeBTNMenu = document.getElementById('button-area');

    pokeballClose.classList.toggle('d-none');
    pokeballOpen.classList.toggle('d-none');
    typeBTNMenu.classList.toggle('d-show');
    menuOpen = !menuOpen;
}