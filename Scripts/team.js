const pokemonTypes = ['water', 'fire', 'grass', 'rock', 'ground', 'flying', 'normal', 'fighting', 'psychic', 'fairy', 'dark', 'ghost', 'steel', 'dragon', 'poison', 'bug', 'electric']
let currentType = ''

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

const addNewMember = () => {
  teamMates = $()
}