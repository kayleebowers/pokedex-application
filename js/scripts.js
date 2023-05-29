//pokemon data
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

//write pokemon names and heights in document
for (let i = 0; i < pokemonList.length; i++) {
  //normal pokemon size
  if (pokemonList[i].height < 3.07) {
    document.write(`<div class="pokemon"><h2 class="pokemon__name">${pokemonList[i].name}</h2> <p class="pokemon__height">Height: ${pokemonList[i].height}</p></div>`);
  //add note for biggest pokemon
  } else {
    document.write(`<div class="pokemon"><h2 class="pokemon__name">${pokemonList[i].name}</h2> <p class="pokemon__height--big">Height: ${pokemonList[i].height} — Wow, that's big!</p></div>`);
  }
}