let pokemonId = Number(localStorage.getItem("selectedPokemonId"));
const MAX_POKEMON = 1025;

const savePokemonId = (id) => {
  localStorage.setItem("selectedPokemonId", id);
};

async function loadSpecies() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    if (!response.ok) {
      throw new Error("Species data not found!");
    }
    const data = await response.json();

    const entry = data.flavor_text_entries.find(
      (item) => item.language.name === "en"
    );

    document.querySelector(".p").textContent = entry.flavor_text;
  } catch (error) {
    document.querySelector(".p").textContent =
      "Could not load Pokemon description";
  }
}

async function loadPokemon() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    if (!response.ok) {
      throw new Error("Pokemon not found!");
    }
    const data = await response.json();

    document.querySelector(".h").textContent =
      data.name[0].toUpperCase() + data.name.slice(1);
    document.querySelector(".p").textContent = "Loading description...";
    document.querySelector(".pokemon-img").src =
      data.sprites.other["official-artwork"].front_default;

    loadSpecies();

    const heightMeter = data.height / 10;
    const weightKg = data.weight / 10;

    const facts = document.querySelector(".facts");
    facts.innerHTML = "";

    const id = document.createElement("div");
    id.className = "fact";
    id.textContent = "Pokédex : " + data.id;

    const heightEl = document.createElement("div");
    heightEl.className = "fact";
    heightEl.textContent = "Height: " + heightMeter + " m";

    const weightEl = document.createElement("div");
    weightEl.className = "fact";
    weightEl.textContent = "Weight: " + weightKg + " kg";

    const typesEl = document.createElement("div");
    typesEl.className = "fact";
    const typeNames = [];

    data.types.forEach((typeObj) => {
      typeNames.push(typeObj.type.name);
    });
    typesEl.textContent = "Type : " + typeNames.join(", ");

    const abilitiesEl = document.createElement("div");
    abilitiesEl.className = "fact";

    const abilityNames = [];

    data.abilities.forEach((abilityObj) => {
      abilityNames.push(abilityObj.ability.name);
    });
    abilitiesEl.textContent = "Abilities : " + abilityNames.join(", ");

    facts.appendChild(id);
    facts.appendChild(heightEl);
    facts.appendChild(weightEl);
    facts.appendChild(typesEl);
    facts.appendChild(abilitiesEl);

  } catch (error) {
    document.querySelector(".h").textContent = "Error";
    document.querySelector(".p").textContent = "Could not load Pokemon";
  }
}
document.querySelector(".loadPokemon").addEventListener("click", () => {
  const randomPokemonId = Math.floor(Math.random() * MAX_POKEMON) + 1;
  pokemonId = randomPokemonId;
  savePokemonId(pokemonId);
  loadPokemon();
});

if (pokemonId) {
  loadPokemon();
} else {
  document.querySelector(".p").textContent =
    "Click the button generate a random Pokémon!";
}

document.querySelector(".arrow-prev").onclick = () => {
  const currentId = Number(pokemonId);
  if (currentId > 1) {
    pokemonId = currentId - 1;
    savePokemonId(pokemonId);
    loadPokemon();
  }
};

document.querySelector(".arrow-next").onclick = () => {
  const currentId = Number(pokemonId);
  pokemonId = currentId + 1;
  savePokemonId(pokemonId);
  loadPokemon();
};
