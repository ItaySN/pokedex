const searchInput = document.getElementById("search");
searchInput.placeholder="Search...";
const searchButton = document.getElementById("searchButton");
const containerDiv = document.getElementById("containerDiv");


function createContainer(data)
{
 const tempPoke = [ document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('img')
                  
                  ];
  tempPoke[0].innerHTML = `name :   ${data.name}`; 
  tempPoke[1].innerHTML = `height :  ${data.height}` ; 
  tempPoke[2].innerHTML = `weight :   ${data.weight}`; 
  tempPoke[3].src = data.sprites.front_default;
  tempPoke[3].addEventListener('mouseover',()=>{tempPoke[3].src=data.sprites.back_default});
  tempPoke[3].addEventListener('mouseout',()=>{tempPoke[3].src=data.sprites.front_default})

  //types:
  for(let i=0;i<data.types.length; i++){
    let divType = document.createElement('div');
    divType.innerHTML = `type ${i+1} :  ${data.types[i].type.name}`;
    tempPoke.push(divType);
  }
  tempPoke.forEach(element=>{containerDiv.appendChild(element)});
  let hr = document.createElement('hr');
  containerDiv.appendChild(hr);
  
  
}


const searchPokemon = async (pokemonId) => {
  try{
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    console.log(data);
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





