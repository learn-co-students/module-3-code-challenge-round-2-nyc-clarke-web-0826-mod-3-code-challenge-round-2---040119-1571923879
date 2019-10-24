
let beerUrl = `http://localhost:3000/beers`
let beerList = document.querySelector('#list-group')
let beerDetail = document.querySelector('#beer-detail')

document.addEventListener('DOMContentLoaded', function(){

    fetch(beerUrl)
        .then(resp => resp.json())
        .then(resp => renderBeer(resp)).then(resp => showBeerDetails())

    function renderBeer(beers){
        beers.forEach(beer => {
            let li = document.createElement('li')
            li.classList.add('list-group-item')
            li.innerText = beer.name
            li.id = beer.id
            li.tagline = beer.tagline
            beerList.append(li)
        })
        console.log(beers)
    }

    function showBeerDetails(){
        document.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', function(){
                fetch(`http://localhost:3000/beers/${item.id}`)
                .then(resp => resp.json())
                .then(beer => {
                    beerDetail.innerHTML = `
                    <h1>${beer.name}</h1>
                    <img src="${beer.image_url}">
                    <h3>${beer.tagline}</h3>
                    <textarea>${beer.description}</textarea>
                    <button id="edit-beer" data-id="${beer.id}" class="btn btn-info">
                       Save
                    </button>
                    `
                    let editBtn = document.querySelector('button')
                    editBtn.addEventListener('click', function(){
                        editBeer(beer)
                    })
                })
            })
        })
    }
    function editBeer(beer){
        let beerDesc = document.querySelector('textarea').value
        console.log(beer)
            fetch(`http://localhost:3000/beers/${beer.id}`,{
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                },
                body: JSON.stringify({
                        description: beerDesc
                    })
                })
                .then(resp => resp.json())
                .then(beer => console.log(beer))   
    }
})