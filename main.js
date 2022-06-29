/*
Allow the user to remove a pokemon from their roster.
When the user tries to remove a pokemon, make them confirm that they want to remove it before it removes that pokemon.
In the Pokemon roster section, allow the user to nickname Pokemon in their roster. The user interface (webpage) should display the nickname instead of the Pokemon name if the Pokemon has a nickname.
*/

const pokemonTeam = [
    {name:'Bulbasaur', id:'001'}, 
    {name:'Charmander', id:'004'}, 
    {name:'Squirtle', id:'007'},
    {name:'Snorlax', id:'143'}]

const containerDiv = document.querySelector('#container')
const newBtn = document.querySelector('#new-pokemon-btn')
const rosterDiv = document.querySelector('#roster')
const userRoster = []

newBtn.addEventListener('click', async () => {
    if(userRoster.length <6){
        let num = prompt('Enter National Pokedex Number')
        let apiURL = `https://pokeapi.co/api/v2/pokemon/${num}`
        let req = await fetch(apiURL)
        let res = await req.json()
        let name = res.species.name
        let h3 = document.createElement('h3')
        h3.innerText = name

        if (num.length < 3) {
            if (num < 10) { num = `00${num}` }
            else if (num < 100) { num = `0${num}` }
        }

        let imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`

        let img = document.createElement('img')
        img.setAttribute('src', imageURL)
        img.setAttribute('class', 'roster-img')
        let position = document.querySelector(`#pokemon-${userRoster.length + 1}`)

        let audioURL = `https://play.pokemonshowdown.com/audio/cries/${name}.mp3`
        let audio = document.createElement('audio')
        let source = document.createElement('source')
        source.setAttribute('src', audioURL)
        source.setAttribute('type', 'audio/mpeg')
        audio.append(source)

        position.addEventListener('click', () => {
            audio.play()
        })

        let removeBtn = document.createElement('button')
        removeBtn.innerHTML = 'X'
        removeBtn.type = 'submit'
        
        position.append(audio, img, h3, removeBtn)
        userRoster.push(num)

        removeBtn.addEventListener('click', () => {
            let rosterIndex = userRoster.indexOf(num)
            userRoster.splice(rosterIndex)

            position.removeChild(img)
            position.removeChild(h3)
            position.removeChild(audio)
            position.removeChild(removeBtn)
        })

    }
    else{
        alert('Your team is full! Transfer a pokemon to the PC to add a new one.')
    } 
})

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