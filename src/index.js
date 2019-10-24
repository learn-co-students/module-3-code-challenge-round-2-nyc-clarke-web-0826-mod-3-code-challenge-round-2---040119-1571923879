document.addEventListener('DOMContentLoaded', function(){

    const beerList = document.querySelector('#list-group')
    const beerShow = document.querySelector('#beer-detail')

    fetch('http://localhost:3000/beers')
    .then( resp => resp.json())
    .then( beers => renderBeer(beers))

    function renderBeer(beers){
        beers.forEach(function(beer){
            let beerLi = document.createElement('li')
            beerLi.classList.add('list-group-item')
            beerLi.setAttribute('data-id', beer.id)
            beerLi.innerText = beer.name
            beerList.append(beerLi)
        })
    }

    beerList.addEventListener('click', function(event){
        let beerId = (event.target.dataset.id)
        beerShow.innerText=" "
        fetch(`http://localhost:3000/beers/${beerId}`)
        .then( resp => resp.json())
        .then( beer => showBeer(beer))
    })

    function showBeer(beer){
        let beerName = document.createElement('h1')
        beerName.innerText = beer.name

         
        
        let beerImg = document.createElement('img')
        beerImg.src = beer.image_url

        let beerTag =document.createElement('h3')
        beerTag.innerText = beer.tagline

        let beerDesc = document.createElement('textarea')
        beerDesc.innerText = beer.description

        let editBtn = document.createElement('button')
        editBtn.setAttribute('id', 'edit-beer')
        editBtn.classList.add('btn', 'btn-info')
        editBtn.innerText = 'Save'

        beerShow.setAttribute('id', beer.id)
        beerShow.append(beerName)
        beerShow.append(beerImg)
        beerShow.append(beerTag)
        beerShow.append(beerDesc)
        beerShow.append(editBtn)
        console.log(beerShow)
        }

    beerShow.addEventListener('click', function(event){
        // debugger
        // console.log(event.target)
        if(event.target.id === 'edit-beer'){
          
        let newBeerDescription = event.target.previousElementSibling.value
        let beerId = event.target.parentElement

        console.log(beerId.id)
        fetch(`http://localhost:3000/beers/${beerId.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: newBeerDescription 
            })
        })
        

        }
    })


})