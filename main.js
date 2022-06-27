const pokemon = ['bulbasaur', 'charmander', 'squirtle', 'snorlax']
const pokemonIDs = ['001', '004', '007','143']

//loop over all ids, 
//create html element, 
//set html element values, 
//append to DOM

pokemonIDs.map((id) => {
    let imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
    console.log(imageURL)
    let img = document.createElement('img')
    img.src = imageURL
    img.setAttribute('height', '100')
    img.setAttribute('width', '100')
    document.body.append(img)
})