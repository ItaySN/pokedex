const searchInput = document.getElementById("search");
searchInput.placeholder="Search...";
const searchButton = document.getElementById("searchButton");
const containerDiv = document.getElementById("containerDiv");


function createContainer(data)
{
  
 const tempPoke = [ document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('img')];
  tempPoke[0].innerHTML = `name :   ${data.name}`; 
  tempPoke[1].innerHTML = `height :  ${data.height}` ; 
  tempPoke[2].innerHTML = `weight :   ${data.weight}`; 
  tempPoke[3].src = data.sprites.front_default;
  tempPoke[3].addEventListener('mouseover',()=>{tempPoke[3].src=data.sprites.back_default});
  tempPoke[3].addEventListener('mouseout',()=>{tempPoke[3].src=data.sprites.front_default})
  tempPoke.forEach(element=>{containerDiv.appendChild(element)});
}


const searchPokemon = async (pokemonId) => {
  try{
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  createContainer(data);
  }
  catch(e){
    alert(`You get an Error : ${e.message}`);
    return e;
  }
};

//searchPokemon();
searchButton.addEventListener('click',()=>{searchPokemon((searchInput.value))
});





