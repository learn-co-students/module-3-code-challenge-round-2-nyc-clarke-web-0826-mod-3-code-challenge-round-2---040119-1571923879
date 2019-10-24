document.addEventListener("DOMContentLoaded", () => {
    fetchBeers();
})

const beersURL = 'http://localhost:3000/beers/';
const beerContainer = document.getElementById("list-group");
const beerShowPage = document.getElementById("beer-detail");
// let editButton = document.getElementById('edit-beer');
// console.log(beerContainer)

function fetchBeers() {
    fetch(beersURL)
        .then(resp => resp.json())
        .then(beers => showAllBeers(beers))
}

function showAllBeers(beers) {
    beers.forEach( beer => {
        // console.log(beer)
        beerContainer.innerHTML += `
            <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
        `
    })
}

beerContainer.addEventListener('click', (event) => {
    // console.log(event.target);
    // debugger
    let beer_id = event.target.dataset.id
    fetch(beersURL + beer_id)
        .then(resp => resp.json())
        .then(beer => showSingleBeer(beer))
})

function showSingleBeer(beer) {
    // console.log(beer);
    beerShowPage.innerHTML = `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button data-id='${beer.id}' id="edit-beer" class="btn btn-info">
        Save
        </button>
   `
    let editButton = document.getElementById('edit-beer')
    // console.log(editButton)
    editButton.addEventListener('click', (event) => {
    //    console.log(event.target.dataset.id)
       updateBeer(event.target.dataset.id);

    })        
}

function updateBeer(id) {
    // debugger
    let newDescription = document.getElementsByTagName('TEXTAREA')[0].value
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            description: newDescription
        })
    })

}


