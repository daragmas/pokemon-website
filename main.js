const pokemonTeam = [
    {name:'Bulbasaur', id:'001'}, 
    {name:'Charmander', id:'004'}, 
    {name:'Squirtle', id:'007'},
    {name:'Snorlax', id:'143'}]

const containerDiv = document.querySelector('#container')
const newBtn = document.querySelector('#new-pokemon-btn')
const rosterDiv = document.querySelector('#roster')
const userRoster = []

newBtn.addEventListener('click', () => {
    let num = prompt('Enter National Pokedex Number')
    if (num<10){num = `00${num}`}
    else if(num<100){num = `0${num}`}
    console.log(num)
    let imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
    let img = document.createElement('img')
    img.setAttribute('src', imageURL)
    img.setAttribute('class', 'roster-img')
    let position = document.querySelector(`#pokemon-${userRoster.length+1}`)
    position.append(img)
    userRoster.push(num)
})

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

    let audioURL = `https://play.pokemonshowdown.com/audio/cries/${element.name.toLowerCase()}.mp3`
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.setAttribute('src', audioURL)
    source.setAttribute('type', 'audio/mpeg')
    audio.append(source)
    
    div.addEventListener('click', () => {
        audio.play()
    })

    div.append(audio, img, h3)
    containerDiv.append(div)
})