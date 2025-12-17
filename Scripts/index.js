
async function fetchData(){

    try{

        const pokemonName = document.querySelector(".pokemon-input").value.toLowerCase();
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

        firstCry = new Audio(data.cries.latest);
        secondCry = new Audio(data.cries.legacy);

        document.querySelector(".pokemon").style.visibility = "visible";
        document.querySelector(".intro-wrapper").style.display = "none";
    }
    catch(error){
        console.error(error);
    }
}

document.querySelector(".first-cry").addEventListener("click", () => {
    if (firstCry) {
        firstCry.currentTime = 0;
        firstCry.volume = 0.2;
        firstCry.play();
    }
});

document.querySelector(".second-cry").addEventListener("click", () => {
    if (secondCry) {
        secondCry.currentTime = 0;
        secondCry.volume = 0.2;
        secondCry.play();
    }
});