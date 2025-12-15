let currentType = ''
let currentGen = ''
let typeBoxOn = false
let genBoxOn = false
let teamMateCount = 0

//Creates Type Menu and Gen Menu//
const printTypes = () => {
  const pokemonTypes = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']
  let typeContainer = $('.type-menu')
  pokemonTypes.forEach(type => {
    typeContainer.append(`
      <div class='type-item' id='${type}'>${type}</div>
      `)
    $(`#${type}`).click(() => {
      currentType = type
      $('.pokemon-box').remove()
      $('.type-text').text(`${type}`)
      $('.type-menu').css('display', 'none')
      if (currentGen !== '') getPokemon()
    })
  })
}

const printGens = () => {
  let genMenu = $('.gen-menu')
  for (let i = 1; i < 10; i++) {
    genMenu.append(`
        <div class='gen-item' id='gen${i}'>Gen ${i}</div>
        `)
    $(`#gen${i}`).click(() => {
      currentGen = i
      $('.pokemon-box').remove()
      $('.gen-text').text(`Gen ${i}`)
      $('.gen-menu').css('display', 'none')
      if (currentType !== '') getPokemon()
    })
  }
}

//API Request Functions//
const makeRequest = async (url) => {
  let data
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error('response was not ok.')
      return
    }
    data = await response.json()

  } catch (error) {
    console.log('Error: ', error)
  }
  return data
}

const getPokemon = async () => {
  const typeUrl = "https://pokeapi.co/api/v2/type/"
  const genUrl = "https://pokeapi.co/api/v2/generation/"
  const Turl = typeUrl + currentType.toLowerCase()
  const Gurl = genUrl + currentGen
  let genData = await makeRequest(Gurl)
  let typeData = await makeRequest(Turl)
  let printablePokemon = []

  for (let i = 0; i < genData.pokemon_species.length; i++) {
    for (let j = 0; j < typeData.pokemon.length; j++)
      if (genData.pokemon_species[i].name.includes(typeData.pokemon[j].pokemon.name))
        printablePokemon.push(typeData.pokemon[j].pokemon.name)
  }

  printablePokemon.forEach(pokemon => {
    printPokemon(pokemon)
  });
}

const printPokemon = async pokemon => {
  const pokeUrl = "https://pokeapi.co/api/v2/pokemon/"
  let Purl = pokeUrl + pokemon
  let data = await makeRequest(Purl)
  let upperName = data.name.charAt(0).toUpperCase() + data.name.slice(1)
  let newPokemon = new Pokemon(upperName, currentType, data.sprites.front_default)
  newPokemon.createPokemon()
}

//Adding Pokemon to team Logic//
const newTeamMate = () => {
  teamMateCount++
  selectActiveMate()
  $('.add-mate-container').remove()
  const tempNum = teamMateCount
  $('.team-container').append(
    `<div class='team-mate active-mate box${teamMateCount}'>
        <img class="mate-pic" />
        <div class="mate-name"></div>
      </div>`)
  if (teamMateCount < 6) {
    $('.team-container').append(`<div class="add-mate-container"><svg class="add-mate" viewBox="0 0 24 24"><path d="M5 12h7m7 0h-7m0 0V5m0 7v7"/></svg></div>`)
    $('.add-mate').click(() => {
      newTeamMate()
    })
  }
  $(`.box${teamMateCount}`).click(() => {
    selectActiveMate(undefined, ('box' + tempNum))
  })
}

const selectActiveMate = (name = '', pokeClass = '') => {
  if (pokeClass !== '') {
    $(`.team-mate`).removeClass('active-mate')
    $(`.${pokeClass}`).addClass('active-mate')
  } else {
    $('.team-mate').removeClass('active-mate')
    name !== '' ? $(`#${name}`).addClass('active-mate') : null
  }
}

//Classes//
class TeamMate {
  constructor(name, type, img) {
    this.name = name
    this.type = type
    this.img = img
  }
  replaceMate() {
    $('.active-mate').empty()
    $('.active-mate').append(
      `<img class="mate-pic" src=${this.img} />
      <div class="mate-name">${this.name}</div>`
    )
    $(`#${this.name}`).click(() => selectActiveMate(this.name))
  }
}

class Pokemon extends TeamMate {
  createPokemon() {
    $('.pokemon-list').append(
      `<div class="pokemon-box" id=${this.name}-pokemon>
        <img class="pokemon-pic" src=${this.img} />
        <svg class="add-pokemon" viewBox="0 0 24 24"><path d="M5 12h7m7 0h-7m0 0V5m0 7v7"/></svg>
        <div class="pokemon-name">${this.name}</div>
      </div>`)
    $(`#${this.name}-pokemon .add-pokemon`).click(() => {
      const teamMember = new TeamMate(this.name, this.type, this.img)
      teamMember.replaceMate()
    })
  } addToTeam() {
    this.replaceMate()
    $(`#${this.name}-pokemon`).remove()
  }
}

//Event Listeners//
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

$('.gen-box').click(() => {
  let genMenu = $('.gen-menu')
  if (!genBoxOn) {
    genMenu.css("display", "flex")
    genBoxOn = true
  } else {
    genMenu.css("display", "none")
    genBoxOn = false
  }
})

//Initiate//
printTypes()
printGens()
newTeamMate()