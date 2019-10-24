const beerURL = 'http://localhost:3000/beers'

document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

document.addEventListener('DOMContentLoaded', ()=>{
    function getBeers(){
        fetch(beerURL)
        .then(resp => resp.json())
        .then(json => json.forEach(renderBeers))
    }

    function renderBeers(json){
        let beerList = document.querySelector('#list-group')
        let beerLi = document.createElement('li')
        beerLi.dataset.id = json.id
        beerLi.innerText = json.name
        beerList.appendChild(beerLi)
        // only dispaly last beer
        beerLi.addEventListener('click', (event) => {
            event.preventDefault()
            let beerInfo = document.getElementById('beer-detail')
            // let h1 = document.createElement('h1')
            // h1.innerText = json.name
            // let image = document.createElement('img')
            // image.src = json.image_url
            // let textArea = document.createElement()
            beerInfo.innerHTML = 
            `
            <h1>${json.name}</h1>
            <img src="${json.image_url}">
            <h3>${json.tagline}</h3>
            <textarea id=${json.id}>${json.description}</textarea>
            <button id="edit-beer" class="btn btn-info"> Save
            </button>
            `
        })
    }

    let beerDetail = document.getElementById('beer-detail')
    beerDetail.addEventListener('click', (event) =>{
        event.preventDefault()
        if(event.target.id == 'edit-beer'){
            // find the text area 
            // patch that change
            let textArea = document.getElementsByTagName('textArea')[0].value 
            let commentId = document.getElementsByTagName('textarea')[0].id
            patchComment(textArea, commentId)
        }
    })


    
    function patchComment(text, id){
        fetch(beerURL + "/" + id ,{
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                description: text
            })
        })
    }



    getBeers()
})