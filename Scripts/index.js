
async function fetchData(){

    try{

        const pokemonName = document.querySelector(".pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data)
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.querySelector(".pokemonSprite");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "inline-block";

        const pokemonSpriteShiny = data.sprites.front_shiny;
        const imgElementShiny = document.querySelector(".pokemonSpriteShiny");

        imgElementShiny.src = pokemonSpriteShiny;
        imgElementShiny.style.display = "inline-block";

        document.querySelector(".pokemon-name").textContent = data.name;
        document.querySelector(".pokemon-height").textContent = `Height: ${data.height}`;
        document.querySelector(".pokemon-weight").textContent = `Weight: ${data.weight}`;
    }
    catch(error){
        console.error(error);
    }
}