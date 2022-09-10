const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const URL = 'http://localhost:3000/toys'
//div to put the toys inside
const toyCollection = document.getElementById('toy-collection')
//Get
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    toyCollection.innerHTML = ""
    data.forEach(function (toy) {

    toyCollection.innerHTML += `
     <div class="card" data-id=${toy.id}>
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn">Like <3</button>
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>
     </div>
    `
      }
    )}
);

const addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener('submit', function (event) {


  fetch(`http://localhost:3000/toys/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`,
      image: `${event.target.image.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(renderToys)
})


toyCollection.addEventListener('click', function (event) {

  let likeButtonIsPressed = event.target.className === "like-btn"
  let delButtonIsPressed = event.target.className === "delete-btn"
  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(response => response.json())

  } else if (delButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(fetchToys)
  }
})

//update
toyCollection.addEventListener('click', function (event) {
  let editButtonIsPressed = event.target.className === "edit-btn"
  if (editButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    console.log(id)
    fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: 'Bo Peep',
      image: 'http://4.bp.blogspot.com/_OZHbJ8c71OM/Sog43CMFX2I/AAAAAAAADEs/0AKX0XslD4g/s400/bo.png',
      likes: 2
    })
  })
  .then(response => response.json())}})
