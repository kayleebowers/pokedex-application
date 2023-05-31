//pokemon data
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Ivysaur",
      height: 3.03,
      types: ["grass", "poison"],
      id: 2,
    },

    {
      name: "Butterfree",
      height: 3.06,
      types: ["bug", "flying"],
      id: 12,
    },

    {
      name: "Ninetales",
      height: 3.07,
      types: ["fire"],
      id: 38,
    },

    {
      name: "Squirtle",
      height: 1.08,
      types: ["water"],
      id: 7,
    },

    {
      name: "Raichu",
      height: 2.07,
      types: ["electric"],
      id: 26,
    },

    {
      name: "Jigglypuff",
      height: 1.08,
      types: ["normal", "fairy"],
      id: 39,
    },
  ];

  //IIFE functions

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).length === 4) {
      pokemonList.push(pokemon);
    } else if (Object.keys(pokemon).length < 4 || Object.keys(pokemon).length > 4) {
      return 'Object needs name, height, types, id';
    } else {
      return 'Not an object';
  }
}

  //return value of IIFE
  return {
    getAll,
    add,
  };
})();

//add pokemon to repository
pokemonRepository.add({name: 'Charizard', height: 5.07, types: ['flame'], id: 6});
pokemonRepository.add({name: 'Weedle', height: 1.0, types: ['bug', 'poison'], id: 13});

//write pokemon names and heights in document
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height < 3.07) {
    document.write(
      `<div class="pokemon"><h2 class="pokemon__name">${pokemon.name}</h2> <p class="pokemon__height">Height: ${pokemon.height}</p></div>`
    );
    //add note for biggest pokemon
  } else {
    document.write(
      `<div class="pokemon"><h2 class="pokemon__name">${pokemon.name}</h2> <p class="pokemon__height--big">Height: ${pokemon.height} — Wow, that's big!</p></div>`
    );
  }
});
