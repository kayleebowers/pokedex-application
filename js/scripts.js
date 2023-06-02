//pokemon data
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //IIFE functions

  //get full list of pokemon
  function getAll() {
    return pokemonList;
  }

  //add new pokemon to list
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      return "Not an object";
    }
  }

  //add pokemon HTML to webpage
  function addListItem(pokemon) {
    let pokemonPageList = document.querySelector(".pokemon-list");

    //add list item
    let pageListItem = document.createElement("li");
    pageListItem.classList.add("pokemonList__item");

    //add pokemon button
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon__name");

    //append new elements
    pokemonPageList.appendChild(pageListItem);
    pageListItem.appendChild(button);

    //add event listener
    addButtonEventListener(button, pokemon);
  }

  //event handler
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //function to call button event listener
  function addButtonEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //get api info
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json(); 
    }).then(hideLoadingMessage())
    .then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(hideLoadingMessage())
    .catch(function (e) {
      console.error(e);
    })
  }

  //get pokemon details 
  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  //loading message function
  function showLoadingMessage() {
    window.addEventListener("DOMContentLoaded", function () {
      console.log('Data is loading');
    })
  }

  //loaded message function
  function hideLoadingMessage() {
    if (showLoadingMessage) {
      removeEventListener("DOMContentLoaded", showLoadingMessage);
      console.log('Data is ready');
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
    addListItem,
    showDetails,
    loadList,
    loadDetails, 
    showLoadingMessage
    // findName
  };
})();

pokemonRepository.loadList().then(function() {
  //data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})

// console.log(pokemonRepository.findName(pokemonRepository.getAll(), 'Weedle'));


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
