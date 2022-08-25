let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    }
    else
    {
      toyFormContainer.style.display = "none";
    }
  });
} );



// document.addEventListener( "DOMContentLoaded", () =>
// {
//   const createBtn = document.querySelector( ".submit" );
//   createBtn.addEventListener( "click", ( eventFn ) =>
//   {
    
//   })
// })

const toyForm = document.querySelector( ".add-toy-form" );
toyForm.addEventListener( "submit", ( eventFn ) =>
{
  eventFn.preventDefault();
  let toyName = eventFn.target.elements[ "name" ].value;
  let toyImage = eventFn.target.elements[ "image" ].value;
  let toyObject = { name: toyName, image: toyImage, likes: 0 };
  newToy( toyObject )
  toyForm.reset()
} )
setTimeout( () =>
{
  const btns = document.getElementsByClassName( ".like-btn" );
  Array.from( btns ).forEach( btn =>
  {
    btns.addEventListener( "click", ( eventFn ) =>
    {
      const id = eventFn.target.id;
      const likesNumber = parseInt( eventFn.target.previousSibling.innerText.replace( "likes", "" ) );
      likesNumber += 1
      updateToy(id, likesNumber)
      
    })
  })
}, 1000 )

allToy();
function allToy ()
{
  fetch( "http://localhost:3000/toys" )
  .then( reponse => reponse.json() )
    .then( toyData =>
    {
      Array.from(toyData).forEach(toy => createToy(toy))
    })
}

function createToy ( toy )
{
  const toyCollection = document.getElementById("toy-collection");
  const newToy = document.createElement( "div" );
  newToy.classList.add( "card" )
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const btn = document.createElement( "button" );
  
  h2.innerText = toy.name
  img.src = toy.image
  p.innerText = `${toy.likes} likes`
  btn.className = "like-btn"
  btn.innerText = "Like"
  btn.id = toy.id

  newToy.append(h2,img,p,btn)
  toyCollection.appendChild( newToy )
}

function newToy ( toyObject )
{
  fetch( "http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify( toyObject ),
  } )
    .then( response => response.json() )
  .then(toyData => createToy(toyData))
}

function updateToy ( id, likes )
{
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: likes }),
  } )
    .then( response => response.json() )
    .then( data =>
    {
      const btn = document.getElementById( `${id}` );
      btn.previousSibling.innerText = `${data.likes} likes`;
  })
}
