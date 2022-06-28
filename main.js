// const pokemon = ['bulbasaur', 'charmander', 'squirtle', 'snorlax']
// const pokemonIDs = ['001', '004', '007','143']
const pokemonTeam = [
    {name:'Bulbasaur', id:'001'}, 
    {name:'Charmander', id:'004'}, 
    {name:'Squirtle', id:'007'},
    {name:'Snorlax', id:'143'}]

const containerDiv = document.querySelector('#container')

//loop over all ids, 
//create html element, 
//set html element values, 
//append to DOM

pokemonTeam.map((element,index) => {
    let imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${element.id}.png`
    // console.log(pokemon[index])
    
    let div = document.createElement('div')
    div.setAttribute('class', 'pokemon-card')

    let h3 = document.createElement('h3')
    h3.innerText = element.name

    let img = document.createElement('img')
    img.src = imageURL
    div.append(img, h3)
    containerDiv.append(div)
})