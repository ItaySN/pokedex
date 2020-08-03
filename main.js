const searchInput = document.getElementById("search");
searchInput.placeholder="Search..."
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click',()=> searchButton(searchInput.value));



const searchPokemon = async (pokemonId) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
};

searchPokemon();

