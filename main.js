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
    let divType   = document.createElement('div');
    let typeNameLabel = document.createElement('label');
    typeNameLabel.innerHTML = `${data.types[i].type.name}`;
    typeNameLabel.addEventListener('click',()=>{
      getPokemonWithSameType(typeNameLabel.innerText)
      .then((res) => typeNameLabel.appendChild(res));
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

async function getPokemonWithSameType(typeNameLabel)
{
  
  let pokemonList = document.createElement('ul');
 
    debugger;
    const{ data } = await axios.get(`http://pokeapi.co/api/v2/type/${typeNameLabel}`);
    console.log(data);
    data.pokemon.forEach((pokemons)=>{
      let liPoke = document.createElement('li');
      liPoke.innerText = pokemons.pokemon.name;
      pokemonList.appendChild(liPoke);
    });
    debugger;
    return pokemonList;
  
  /*
  catch(e){
    alert(`You get an Error : ${e.message}`);
    return e;
  }
  */

}
//searchPokemon();
searchButton.addEventListener('click',()=>{searchPokemon((searchInput.value))
});





