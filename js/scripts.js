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
    height: 3.07,
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
  document.write(`<div class="pokemon"> ${pokemonList[i].name} (height: ${pokemonList[i].height})</div>`);
}