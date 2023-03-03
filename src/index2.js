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

const toyCollection = document.getElementById('toy-collection');
const toyForm = document.querySelector('.add-toy-form');

fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toysArr => toysArr.forEach(toyObj => renderToys(toyObj)));

function renderToys(toy) {
    const toyDiv = document.createElement('div');
    const toyH2 = document.createElement('h2');
    const toyImg = document.createElement('img');
    const toyP = document.createElement('p');
    const toyButton = document.createElement('button');
    toyDiv.className = 'card';
    toyImg.className = 'toy-avatar';
    toyButton.className = 'like-btn';
    toyCollection.append(toyDiv);
    toyDiv.append(toyH2, toyImg, toyImg, toyP, toyButton);
    toyH2.innerText = toy.name;
    toyImg.src = toy.image;
    toyP.innerText = toy.likes;
    toyButton.innerText = 'like';

    toyButton.addEventListener('click', () => {
        toyP.innerText = ++toy.likes;
    })
}

toyForm.addEventListener('submit', (e) => renderForm(e));

function renderForm(e) {
    e.preventDefault();
    const formName = e.target.name;
    const formImg = e.target.image;
    const toyObj = {
        name: formName.value,
        image: formImg.value,
        likes: 0
    }
    renderToys(toyObj);
    toyForm.reset();
}