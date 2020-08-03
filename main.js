const searchInput = document.getElementById("search");
searchInput.placeholder="Search...";
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
  tempPoke[0].innerHTML = `name :   ${data.name}`; 
  tempPoke[1].innerHTML = `height :  ${data.height}` ; 
  tempPoke[2].innerHTML = `weight :   ${data.weight}`; 
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
    divType.innerText = `type ${i+1} :  `;
    divType.appendChild(typeNameLabel);
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

/*
async function createListOfSameTypePoke(typeNameLabel)
{
  
  let pokemonList = document.createElement('ul');
 
    try{
      const{ data } = await axios.get(`http://pokeapi.co/api/v2/type/${typeNameLabel}`);
      console.log(data);
      data.pokemon.forEach((pokemons)=>{
      let liPoke = document.createElement('li');
      liPoke.innerText = pokemons.pokemon.name;
      pokemonList.appendChild(liPoke);
    });
    return pokemonList;
    }
  
  catch(e){
    alert(`You get an Error : ${e.message}`);
    return e;
  }
}
*/



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





