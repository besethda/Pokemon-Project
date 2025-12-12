const pokemonTypes = ['water', 'fire', 'grass', 'rock', 'ground', 'flying', 'normal', 'fighting', 'psychic', 'fairy', 'dark', 'ghost', 'steel', 'dragon', 'poison', 'bug', 'electric']
let currentType = ''
let currentGen = 1
let typeBoxOn = false
let teamPokemon = []
let typeUrl = "https://pokeapi.co/api/v2/type/"
let genUrl = "https://pokeapi.co/api/v2/generation/"

const getPokemon = async () => {
  const Turl = typeUrl + currentType
  const Gurl = genUrl + currentGen
  let genData
  let typeData
  try {
    const response = await fetch(Turl)
    if (!response.ok) {
      console.error('response was not ok.')
      return
    }
    typeData = await response.json()
    console.log(typeData.pokemon)

  } catch (error) {
    console.log('Error: ', error)
  }

  try {
    const response = await fetch(Gurl)
    if (!response.ok) {
      console.error('response was not ok.')
      return
    }
    genData = await response.json()
    console.log(genData.pokemon_species)

  } catch (error) {
    console.log('Error: ', error)
  }

  let printablePokemon = []

  typeData.pokemon.forEach(testPokemon, index => {
    if (genData.pokemon_species[index].name.includes(typeData.pokemon[index].pokemon.name))
      printablePokemon.push(typeData.pokemon[index].pokemon.name)
  })

  console.log(printablePokemon)
}

const printTypes = () => {
  let typeContainer = $('.type-menu')
  pokemonTypes.forEach(type => {
    typeContainer.append(`
      <div class='type-item' id='${type}'>${type}</div>
      `)
    $(`#${type}`).click(() => {
      currentType = type
      $('.type-text').text(`${type}`)
      $('.type-menu').css('display', 'none')
      getPokemon()
    })
  })
}

const createPokemon = () => {

}

class TeamMate {
  constructor(name, type, img) {
    this.name = name
    this.type = type
    this.img = img
  }
  removeMate() {
    $(`#${this.name}`).remove()
  }
  createMate() {
    $('.team-container').append(
      `<div class='team-mate active-mate' id="${this.name}">
          <img class="mate-pic" src=${this.img}/>
          <svg class="minus" viewBox="0 0 24 24"><path d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/></svg>
          <div class="mate-name">${this.name}</div>
        </div>`)
    $(`#${this.name} .minus`).click(() => this.removeMate())
  }
}

class Pokemon extends TeamMate {
  createPokemon() {
    $('.pokemon-list').append(
      `<div class="pokemon-box" id=${this.name}-pokemon>
        <img class="pokemon-pic" src=${this.img}/>
        <svg class="add-pokemon" viewBox="0 0 24 24"><path d="M5 12h7m7 0h-7m0 0V5m0 7v7"/></svg>
        <div class="pokemon-name">${this.name}</div>
      </div>`)
    $(`#${this.name}-pokemon`).click(() => {
      const teamMember = new TeamMate(this.name, this.type, this.img)
      teamMember.createMate()
    })
  } addToTeam() {
    this.createMate()
    $(`#${this.name}-pokemon`).remove()
  }
}

const addNewMember = () => {
  teamMates = $()
}

$('.type-box').click(() => {
  let typeMenu = $('.type-menu')
  if (!typeBoxOn) {
    typeMenu.css("display", "flex")
    typeBoxOn = true
  } else {
    typeMenu.css("display", "none")
    typeBoxOn = false
  }
})

printTypes()