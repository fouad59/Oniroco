//création de tableau pour les produits
let categories = ['Teddy']

//affichage du prix au bon format
let sectionMain = document.getElementById('sectionMain')
function get_price(price){
    var str = price.toString()
    return str.slice(0, str.length - 2) + ',' + str.slice(-2); 
}
// boucle pour la création des card de produit
function createProduct(data, section) {
    var div = document.createElement("div")
    div.innerHTML =
        '<img class="intro-img img-fluid mb-3 mb-lg-0 rounded" src= " ' + data.imageUrl + ' " alt="..." />'
        + '<div class="intro-text left-0 text-center bg-faded p-5 rounded">'
        + "<h2 class='section-heading mb-4'>"
        + '<span class="section-heading-upper">' + data.name + '</span>'
        + '<span class="section-heading-lower">' + get_price(data.price) + '€</span>'
        + '</h2>'
        + '<p class="mb-3">' + data.description + '</p>'
        + '<div class="loc">'
        + '<label for="colors">couleur : </label>'
        + '<select id="colors" name="c">'
        + '</select>'
        + '</div>'
        + '<div class="loc">'
        + '<label for="quantity">Quantité : </label>'
        + '<select id="qt" name="q">'
        + '</select>'
        + '</div>'
        +'<div>'
        +'<button id="btnEnvoi" class="intro-button mx-auto btn btn-primary btn-xl">Ajoutez au panier!</a></button>'
        +'</div>'
        + '</div>'
    section.appendChild(div)
    
    let select = document.getElementById('qt')
    let options = ''
    for (let i =1; i < 6; i++) {
        options += '<option value="'+i.toString()+'">'+i.toString()+'</option>'
    }
    select.innerHTML = options

    select = document.getElementById('colors')
    options = ''
    for (let j =0; j < data.colors.length; j++) {
        options += '<option value="'+data.colors[j]+'">'+data.colors[j]+'</option>'
    }
    select.innerHTML = options
}

// récupération des données depuis l'API
function getOneTeddy(id) {
    fetch('http://localhost:3000/api/teddies/' + id )
    .then(response => {
        return response.json()
    }).then(data => {
        createProduct(data, sectionMain)
        let btnEnvoiPanier = document.getElementById("btnEnvoi")
        btnEnvoiPanier.addEventListener("click", (event)=>{
            let quantite = document.getElementById('qt').value
            event.preventDefault()
            updateCart(quantite, data, true)
        })
    })
}
let id = new URL(window.location.href).searchParams.get('id')
getOneTeddy(id)

//Ajouter les élements sélectionnés dans le localStorage
function updateCart(quantite, produit, add) {
    let presenceCart = localStorage.getItem(produit._id)
    quantite = parseInt(quantite)
    if(presenceCart){
        let item = JSON.parse(presenceCart)
        let myCart = {
            image:produit.imageUrl,
            name:produit.name,
            description:produit.description,
            price:produit.price, 
            quantity:item.quantity + quantite
        }
        if(add){
            localStorage.setItem(produit._id, JSON.stringify(myCart))
        }else{
            localStorage.setItem(produit._id, JSON.stringify({
                image:produit.imageUrl,
                name:produit.name,
                description:produit.description,
                price:produit.price, 
                quantity:item.quantity - quantite
            }))
                if(item.quantite - quantite <= 0) {
                    localStorage.removeItem(produit._id)
                }
            
            }
    }else{
        if(add){
            localStorage.setItem(produit._id, JSON.stringify({
                image:produit.imageUrl,
                name:produit.name,
                description:produit.description,
                price:produit.price, 
                quantity:quantite
            }))
        }
    }
    displayTotalPanier()
}

//Mettre à jours la quantité de produit dans la bulle
function displayTotalPanier () {
    let total = 0
    for(let key of Object.keys(localStorage)) {
        total += JSON.parse(JSON.parse(localStorage[key]).quantity)
    }
    document.querySelector('#totalCount').innerHTML = total
}
displayTotalPanier()