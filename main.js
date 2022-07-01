const pokemonTeam = [
    {name:'Bulbasaur', id:'001'}, 
    {name:'Charmander', id:'004'}, 
    {name:'Squirtle', id:'007'},
    {name:'Snorlax', id:'143'}]

const containerDiv = document.querySelector('#container')
const newBtn = document.querySelector('#new-pokemon-btn')
const rosterDiv = document.querySelector('#roster')
const userRoster = []

const whosThatPokemon= async (pokemon,infoNeeded) => {
    let apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let req = await fetch(apiURL)
    let res = await (req.json())
    //console.log(res)
    let dataReturn = res[`${infoNeeded}`]
    //console.log(typeof dataReturn, dataReturn, ' dataReturn')
    return dataReturn
}


newBtn.addEventListener('click', async () => {
    if(userRoster.length <6 || userRoster.includes('')){
        let userInput = prompt('Enter National Pokedex Number or Pokemon Name') // get user input\
        let data
        if (!(parseInt(userInput))){ //if user entered a word, get the pokemon's pokedex number
            let pokemonName = userInput.toLowerCase() 
            data = await whosThatPokemon(pokemonName, 'id')
                console.log(data)
            }
        else if(parseInt(userInput)){ //if the user entered a number, get the pokemon's name
            num = parseInt(userInput)
            data = await whosThatPokemon(num,'name')
            if(data){
                let h3 = document.createElement('h3')
                h3.innerText = data
                h3.className = 'pokemon-name'

                if (`${num}`.length < 3) {
                    if (num < 10) { num = `00${num}` }
                    else if (num < 100) { num = `0${num}` }
                }

                let imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`

                let img = document.createElement('img')
                img.setAttribute('src', imageURL)
                img.setAttribute('class', 'roster-img')

                let position
                if (userRoster.length < 6){position = document.querySelector(`#pokemon-${userRoster.length + 1}`)}
                else {position = document.querySelector(`#pokemon-${userRoster.indexOf('')+1}`)}
                // console.log(position)
                let audioURL = `https://play.pokemonshowdown.com/audio/cries/${data}.mp3`
                let audio = document.createElement('audio')
                let source = document.createElement('source')
                source.setAttribute('src', audioURL)
                source.setAttribute('type', 'audio/mpeg')
                audio.append(source)

                function cry() {
                    audio.play()
                }
                

                position.addEventListener('click', cry)
                
                let removeBtn = document.createElement('button')
                removeBtn.innerHTML = 'X'
                removeBtn.type = 'submit'
                removeBtn.className = 'remove-pokemon-btn'
                
                position.append(audio, img, h3, removeBtn)

                if (userRoster.length<6){userRoster.push(num)}
                else{userRoster[userRoster.indexOf('')] = num}

                removeBtn.addEventListener('click', () => {
                    if (confirm(`Are you sure you want to remove ${h3.innerText}?`))
                    {
                        let rosterIndex = `${position.id}`
                        rosterIndex = rosterIndex.split('-')[1]-1
                        // console.log(rosterIndex)
                        userRoster[rosterIndex] = ''

                        position.removeChild(img)
                        position.removeChild(h3)
                        position.removeChild(audio)
                        position.removeEventListener('click', cry)
                        position.removeChild(removeBtn)
                }})

                h3.addEventListener('click', ()=>{
                    let currentName = h3.innerText
                    h3.innerText = prompt("Enter nickname ", `${h3.innerText}`)
                    if (h3.innerText == ''){h3.innerText = currentName}
                })}
        }
    }
    else{
        alert('Your team is full! Transfer a pokemon to the PC to add a new one.')
    } 
})

/*
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
})*/