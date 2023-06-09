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
    button.classList.add("pokemon__name", "btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    //append new elements
    pokemonPageList.appendChild(pageListItem);
    pageListItem.appendChild(button);

    //add event listener
    addButtonEventListener(button, pokemon);
  }

  //event handler
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //function to call button event listener
  function addButtonEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      //show details on page
      showDetails(pokemon);
    });
  }

  //get api info
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(hideLoadingMessage())
    .then(function (response) {
      return response.json(); 
    }).then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(hideLoadingMessage)
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
      item.types = '';

      //get types from object in object array
      if (details.types.length >= 1) {
        for (let i = 0; i < details.types.length; i++) {
          item.types = item.types + '  ' + details.types[i].type.name;
        }
       }
    }).catch(function(e) {
      console.error(e);
    });
  }

  //add modalContainer as IIFE variable
  let modalContainer = document.querySelector('#pokemonModal');

  // add showModal function
  function showModal(pokemon) {
    //declare jQuery variables
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    //clear modals
    modalTitle.empty();
    modalBody.empty();

    //create content elements
    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    let pokemonImage = $("<img class='modal-image' width='50%'>");
    pokemonImage.attr("src", pokemon.imgUrl);
    let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>");
    let pokemonTypes = $("<p>" + "Types: " + pokemon.types + "</p>");

    //append to modal
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
  }

  //hide modal function
  function hideModal() {
    modalContainer.classList.remove('visible');
  }

  //esc button event listener
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('visible')) {
      hideModal();
    }
  })
  
  //attempts at bonus loading messages

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

  //search for pokemon
  let searchInput = document.querySelector('.search-bar__input');
  let currentValue = searchInput.value;

  function getSearchInput() {
    currentValue = searchInput.value;
  }

  searchInput.addEventListener("input", getSearchInput);

  function searchForInput() {
    currentValue = searchInput.value;
    pokemonList.filter(function (pokemon) {
      if (pokemon.name.toUpperCase() === currentValue.toUpperCase()) {
        showDetails(pokemon);
      }
    })
  }

  document.querySelector('.search-bar__button').addEventListener("click", searchForInput);

  //to do: get return/enter key to work for search bar
  
  // document.querySelector('.search-bar__button').addEventListener("keydown", function (e) {
  //   if (e.key === 'Return') {
  //     searchForInput();
  //   }
  // })

  //return value of IIFE
  return {
    getAll,
    add,
    addListItem,
    showDetails,
    loadList,
    loadDetails, 
    showModal,
    showLoadingMessage, 
    hideLoadingMessage, 
    hideModal,
    getSearchInput,
    searchForInput
  };
})();

pokemonRepository.loadList().then(function() {
  //data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})
