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
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  //add modalContainer as global IIFE variable
  let modalContainer = document.querySelector('.modal');

  // add showModal function

  function showModal(pokemon) {
    //clear modals
    modalContainer.innerHTML = '';

    //create img element
    let modalImage = document.createElement('img');
    modalImage.classList.add('modal__photo');
    modalImage.innerText = pokemonRepository.showDetails(pokemon).imageUrl;

    //create info div
    let modalInfo = document.createElement('div');
    modalInfo.classList.add('modal__info');

    //create info div parts
    let modalInfoName = document.createElement('h1');
    modalInfoName.classList.add('modal__info--name');
    modalInfoName.innerText = pokemonRepository.loadDetails(pokemon).name;

    let modalInfoHeight = document.createElement('p');
    modalInfoHeight.classList.add('modal__info--height');
    modalInfoHeight.innerText = pokemonRepository.loadDetails(pokemon).height;

    let modalInfoTypes = document.createElement('p');
    modalInfoTypes.classList.add('modal__info--types');
    modalInfoTypes.innerText = pokemonRepository.loadDetails(pokemon).types;

    //append new sections
    modalInfo.appendChild(modalInfoName);
    modalInfo.appendChild(modalInfoHeight);
    modalInfo.appendChild(modalInfoTypes);

    modalContainer.appendChild(modalImage);
    modalContainer.appendChild(modalInfo);
  }

  
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
    showModal,
    showLoadingMessage, 
    hideLoadingMessage
    // findName
  };
})();

pokemonRepository.loadList().then(function() {
  //data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})
