let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// fetch url
fetch('http://localhost:3000/toys')
// use .json() on our return value 
  .then(resp => resp.json())
// itterate through our toys using a forEach
// call toyList() and pass in toys object
  .then(toys => toys.forEach(toy => toyList(toy)));

// declare function toyList passing in a toy object
function toyList(toy) {
// grab toy-collection div
const toyCollection = document.getElementById('toy-collection');
// make a div element 
const toyBox = document.createElement('div');
// create h2, img, p, button
const h2 = document.createElement('h2');
const img = document.createElement('img');
const p = document.createElement('p');
const button = document.createElement('button');
// populate elements
h2.textContent = toy.name;
img.src = toy.image
p.textContent = toy.likes;
button.textContent = 'like';
// give it a class of card
toyBox.className = 'card';
// give button a class name of like-btn
button.className = 'like-btn';
// give button an id of the toys id number 
button.id = toy.id;
// give image a class of toy-avatar
img.className = 'toy-avatar';
// console.log(button);
// append the new div to the old div
toyCollection.append(toyBox);
// append all elements to toyBox div
toyBox.append(h2, img, p, button);
}

const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // call on a function
  newToy();
})
// create function newToy 
function newToy() {
const inputName = document.getElementsByClassName('input-text')[0];
const inputImage = document.getElementsByClassName('input-text')[1];

// create a post request 
fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: inputName.value,
    image: inputImage.value,
    likes: 0
  })
})
  .then(resp => resp.json())
  .then(obj =>  toyList(obj));
}

