const pokemonSelect = document.getElementById('pokemon-select');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonHeight= document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonType = document.getElementById('pokemon-type');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const pokemonImage = document.getElementById('pokemon-image');

async function fetchPokemonData(pokemon: string) {
    if (!pokemon) {
        pokemonName.textContent = 'Selecciona un pokemon';
        pokemonId.toString().textContent = 'Selecciona un pokemon';
        pokemonHeight.textContent = 'Selecciona un pokemon';
        pokemonWeight.textContent = 'Selecciona un pokemon';
        pokemonType.textContent = 'Selecciona un pokemon';
        pokemonAbilities.textContent = 'Selecciona un pokemon';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        pokemonName.textContent = `Nombre: ${data.name}`;
        if (pokemonId && data.id) {
        if (data.id < 10) {
            pokemonId.textContent = `#00${data.id}`;
        } else if (data.id < 100) {
            pokemonId.textContent = `#0${data.id}`;
        } else {
            pokemonId.textContent = `#${data.id}`;
        }
        }
        pokemonHeight.textContent = `Altura: ${(data.height * 0.1).toFixed(2)} m`;
        pokemonWeight.textContent = `Peso: ${(data.weight / 2).toFixed(2)} kg`;
        pokemonType.textContent = `${data.types.map((typePokemon) => typePokemon.type.name)} `;
        pokemonAbilities.textContent = `${data.abilities.map((item) => item.ability.name)}`;
        pokemonImage.style.display = 'block';
        pokemonImage.src = data.sprites.front_default;
    } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
        pokemonName.textContent = 'Error al cargar datos';
    }
}

pokemonSelect.addEventListener('change', (event) => {
    const selectedPokemon: string = event.target!.value;
    fetchPokemonData(selectedPokemon);
});