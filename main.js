const searchInput = document.getElementById("search");
searchInput.placeholder="Search a pokemon...";
const searchButton = document.getElementById("searchButton");
const containerDiv = document.getElementById("containerDiv");


function createContainer(data)
{
  containerDiv.innerHTML="";
 const tempPoke = [ document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('img')
                  
                  ];
  tempPoke[0].innerHTML = `Name of the pokemon :   ${data.name}`; 
  tempPoke[1].innerHTML = `Height of the pokemon :  ${data.height}` ; 
  tempPoke[2].innerHTML = `Weight of the pokemon :   ${data.weight}`; 
  tempPoke[3].src = data.sprites.front_default;
  tempPoke[3].addEventListener('mouseover',()=>{tempPoke[3].src=data.sprites.back_default});
  tempPoke[3].addEventListener('mouseout',()=>{tempPoke[3].src=data.sprites.front_default})
  
  //types:
  for(let i=0;i<data.types.length; i++){
    let divType       = document.createElement('div');
    let typeNameLabel = document.createElement('label');
    let booleanTemp = false;
    typeNameLabel.innerHTML = `${data.types[i].type.name}`;
    typeNameLabel.addEventListener('click',()=>{
      if(!booleanTemp)
      {
        getPokemonWithSameType(data.types[i].type.name)
        .then((res) => typeNameLabel.appendChild(res));
        booleanTemp = true;
      }
      else
      {
        typeNameLabel.innerHTML = `${data.types[i].type.name}`;
        booleanTemp = false;
      }
      

       
      
    });
    divType.innerText = `The ${i+1} type of the pokemon :  `;
    divType.appendChild(typeNameLabel);
    tempPoke.push(divType);
  }
  tempPoke.forEach(element=>{containerDiv.appendChild(element)});
  let hr = document.createElement('hr');
  containerDiv.appendChild(hr);
  
}


/*
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
*/

const searchPokemon = (id) => {
  return fetch(`http://pokeapi.co/api/v2/pokemon/${id}`)
  .then(res =>  res.json())
  .then(data => 
    {createContainer(data)})
  .catch(er => console.log(er));
}

async function getPokemonWithSameType(typeNameLabel)
{
  
  let pokemonList = document.createElement('ul');
 
    try{
      const{ data } = await axios.get(`http://pokeapi.co/api/v2/type/${typeNameLabel}`);
      console.log(data);
      data.pokemon.forEach((pokemons)=>{
      let liPoke = document.createElement('li');
      liPoke.innerText = pokemons.pokemon.name;
      liPoke.addEventListener('click',()=>
      {
        searchPokemon(pokemons.pokemon.name);
      })
      pokemonList.appendChild(liPoke);
    });
    return pokemonList;
    }
  
  catch(e){
    alert(`You get an Error : ${e.message}`);
    return e;
  }
}

//searchPokemon();
searchButton.addEventListener('click',()=>{searchPokemon((searchInput.value))
});





