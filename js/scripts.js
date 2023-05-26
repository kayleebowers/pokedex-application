alert('Hello world');

let favoriteFood = 'red curry';
let protein = 'tofu';
let num = 2;
document.write('My favorite food is ' + favoriteFood + ' but it\'s hard to make.');
document.write(`My favorite food is ${favoriteFood} with ${num} ${protein}.`);

document.write(2 + 2);
document.write('2' + 2);
document.write('2' + '2');


let annesAge = 27;
let anne = {
  name: 'Anne',
  age: annesAge,
  child: {
    name: 'Joe',
    age: [2, 4, 5]
  }
};

delete anne.age;

anne.name = 'Cool Anne';
anne.child.age[0] = 10;
anne.favFood = 'pineapple';

console.log(anne.name);
console.log(anne.favFood);
console.log(anne.child.age[0]);

console.log(anne);