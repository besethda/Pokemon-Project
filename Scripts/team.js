const pokemonTypes = ['Water', 'Fire', 'Grass', 'Rock', 'Ground', 'Flying', 'Normal', 'Fighting', 'Psychic', 'Fairy', 'Dark', 'Ghost', 'Steel', 'Dragon', 'Poison', 'Bug', 'Electric']
let currentType = ''
let currentGen = ''
let typeBoxOn = false
let genBoxOn = false
let teamPokemon = []
let typeUrl = "https://pokeapi.co/api/v2/type/"
let genUrl = "https://pokeapi.co/api/v2/generation/"
let pokeUrl = "https://pokeapi.co/api/v2/pokemon/"
let teamMateCount = 0

const getPokemon = async () => {
  const Turl = typeUrl + currentType.toLowerCase()
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

  } catch (error) {
    console.log('Error: ', error)
  }

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

const printPokemon = async (pokemon) => {
  let Purl = pokeUrl + pokemon
  let data
  try {
    const response = await fetch(Purl)
    if (!response.ok) {
      console.error('response was not ok.')
      return
    }
    data = await response.json()

  } catch (error) {
    console.log('Error: ', error)
  }

  let upperName = data.name.charAt(0).toUpperCase() + data.name.slice(1)
  let newPokemon = new Pokemon(upperName, currentType, data.sprites.front_default)
  newPokemon.createPokemon()
}

const printTypes = () => {
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

const selectActiveMate = (name = '', pokeClass = '') => {
  if (pokeClass !== '') {
    $(`.team-mate`).removeClass('active-mate')
    console.log(pokeClass)
    $(`.${pokeClass}`).addClass('active-mate')
    console.log('ran')
  } else {
    $('.team-mate').removeClass('active-mate')
    name !== '' ? $(`#${name}`).addClass('active-mate') : null
  }
}

const newTeamMate = () => {
  teamMateCount++
  selectActiveMate()
  $('.add-mate-container').remove()
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
    console.log('clicked')
    const tempNum = teamMateCount
    selectActiveMate(undefined, ('box' + tempNum))
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

class TeamMate {
  constructor(name, type, img) {
    this.name = name
    this.type = type
    this.img = img
  }
  removeMate() {
    $(`#${this.name}`).remove()
    teamMateCount--
  }
  createMate() {
    $('.team-container').append(
      `<div class='team-mate active-mate' id="${this.name}">
          <img class="mate-pic" src=${this.img} />
          <svg class="minus" viewBox="0 0 24 24"><path d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/></svg>
          <div class="mate-name">${this.name}</div>
        </div>`)
    $(`#${this.name}`).click(() => selectActiveMate(this.name))
    $(`#${this.name} .minus`).click(() => this.removeMate())
  }
  replaceMate() {
    $('.active-mate').empty()
    $('.active-mate').append(
      `<img class="mate-pic" src=${this.img} />
      <svg class="minus" viewBox="0 0 24 24"><path d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/></svg>
      <div class="mate-name">${this.name}</div>`
    )
    $(`#${this.name}`).click(() => selectActiveMate(this.name))
    $(`#${this.name} .minus`).click(() => this.removeMate())
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

printTypes()
printGens()
newTeamMate()