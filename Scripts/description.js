const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

async function loadPokemon() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    if (!response.ok) {
      throw new Error("Pokemon not found!");
    }
    const data = await response.json();

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
    typesEl.textContent =
      "Type : " + data.types.map((t) => t.type.name).join(", ");

    const abilitiesEl = document.createElement("div");
    abilitiesEl.className = "fact";
    abilitiesEl.textContent =
      "Abilities: " + data.abilities.map((a) => a.ability.name).join(", ");

    facts.append(id, heightEl, weightEl, typesEl, abilitiesEl);

    return data;
  } catch (error) {
    document.querySelector(".h").textContent = "Error";
    document.querySelector(".p").textContent = "Could not load Pokemon";
  }
}
loadPokemon();
