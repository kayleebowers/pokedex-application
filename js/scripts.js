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

  //attempts at bonus filter task

  // function findName(pokemon, name) {
  //   pokemon.forEach(function(index) {
  //     pokemon.filter(function (inputName) {
  //       if (inputName === pokemon[index].name) {
  //         console.log(inputName);
  //       } else {
  //         return 'Pokemon not found';
  //       }
  //     })
  //   })
  //   };
  
  // function findName(name) {
  //   let results = pokemonList.filter(function(name) {
  //     if (name === pokemonList.name) {
  //       return name;
  //   } else {
  //     return 'Pokemon not found';
  //   }
  //   });
  // }

  //return value of IIFE
  return {
    getAll,
    add,
    // findName
  };
})();

//add pokemon to repository
pokemonRepository.add({name: 'Charizard', height: 5.07, types: ['flame'], id: 6});
pokemonRepository.add({name: 'Weedle', height: 1.0, types: ['bug', 'poison'], id: 13});

// console.log(pokemonRepository.findName(pokemonRepository.getAll(), 'Weedle'));

//write pokemon names and heights in document
pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonPageList = document.querySelector('.pokemon-list');

  //add list item
  let pageListItem = document.createElement('li');
  pageListItem.classList.add('pokemonList__item');

  //add pokemon button
  let button = document.createElement('button');
  button.innerText = pokemon.name
  button.classList.add('pokemon__name');

  //append new elements
  pokemonPageList.appendChild(pageListItem);
  pageListItem.appendChild(button);
});

//forEach loop before Exercise 1.6 (for earlier task reference)

// pokemonRepository.getAll().forEach(function (pokemon) {
//   if (pokemon.height < 3.07) {
//     document.write(
//       `<div class="pokemon"><h2 class="pokemon__name">${pokemon.name}</h2> <p class="pokemon__height">Height: ${pokemon.height}</p></div>`
//     );
//     //add note for biggest pokemon
//   } else {
//     document.write(
//       `<div class="pokemon"><h2 class="pokemon__name">${pokemon.name}</h2> <p class="pokemon__height--big">Height: ${pokemon.height} — Wow, that's big!</p></div>`
//     );
//   }
// });