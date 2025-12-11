const pokemonTypes = ['water', 'fire', 'grass', 'rock', 'ground', 'flying', 'normal', 'fighting', 'psychic', 'fairy', 'dark', 'ghost', 'steel', 'dragon', 'poison', 'bug', 'electric']
let currentType = ''

const printTypes = () => {
  let typeContainer = $('.type-menu')
  setTimeout( ()=> {
  pokemonTypes.forEach(type => {
    typeContainer.append(`
      <div class='type-item' id='${type}'>${type}</div>
      `)
    $(`#${type}`).click(()=> {
      currentType = type
      $('.type-text').text(`${type}`)
      $('.type-menu').css('display', 'none')
    })
})}, 200)
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
        $(`#${this.name} .minus`).click(()=> this.removeMate())
    }
}

// class Pokemon extends TeamMate {
//   createPokemon {

//   }
// }

const addNewMember = () => {
  teamMates = $()
}

$(`.type-box`).click(()=> {
   let menu = $('.type-menu')
$(`.type-menu`).css('display', 'flex'))
})

printTypes()