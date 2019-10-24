document.addEventListener('DOMContentLoaded', function (event){

const list_group = document.getElementById('list-group')
const beer_detail = document.getElementById('beer-detail')
const saveBtn = document.getElementById('edit-beer')

fetch('http://localhost:3000/beers')
    .then(resp => resp.json()) 
    .then(json => editPage(json))

function editPage(obj) { 
    obj.forEach(renderName)
}

function renderName(list){
list_group.innerHTML += 
    `<li class="list-group-item" data-id=${list.id}>${list.name}</li> `
}

list_group.addEventListener('click', function(event){ 
    if (event.target.dataset.id) { 
        fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(json => showBeer(json))
        }
    })

function showBeer(beerInfo){
    beer_detail.innerHTML = ''
    beer_detail.innerHTML += 
    `<h1>${beerInfo.name}</h1>
    <img src="${beerInfo.image_url}">
    <h3>${beerInfo.tagline}</h3>
    <textarea>${beerInfo.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id=${beerInfo.id}>
      Save
    </button>`
}    

document.addEventListener('click', function(event){ 
    if (event.target.className === 'btn btn-info'){ 
        let text = document.getElementsByTagName('textarea')
        fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
            method: 'PATCH', 
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: text[0].value
            })
        })
        beer_detail.innerHTML = ''
    }
})


})
