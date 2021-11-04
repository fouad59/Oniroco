let categories = []
//création de tableau pour les produits
let sectionMain = document.getElementById('sectionMain')
function get_price(price){
    var str = price.toString()
    return str.slice(0, str.length - 2) + ',' + str.slice(-2); 
}
// boucle 
function createProduct(data, section) {
    var div = document.createElement("div")
    div.innerHTML =
        '<img class="intro-img img-fluid mb-lg-0 rounded" src= " ' + data.imageUrl + ' " alt="..." />'
        + '<div class="intro-text left-0 text-center bg-faded p-5 rounded">'
        + "<h2 class='section-heading mb-4'>"
        + '<span class="section-heading-upper">' + data.name + '</span>'
        + '<span class="section-heading-lower">' + get_price(data.price) + '€</span>'
        + '</h2>'
        + '<p class="mb-3">' + data.description + '</p>'
        + '<div class="intro-button mx-auto"><a class="btn btn-primary btn-xl" href="teddies.html?id=' + data._id + '">Voir le produit!</a></div>'
        + '</div>'
    section.appendChild(div)
}
function getAllTeddies() {
    fetch('http://localhost:3000/api/teddies')
    .then(response => {
        return response.json()
    }).then(data => {
        for (let x = 0; x < data.length; x++) {
            createProduct(data[x], sectionMain)
        }
    })
}
getAllTeddies()

function displayBubble () {
    let total = 0
    for(let key of Object.keys(localStorage)) {
        total += JSON.parse(JSON.parse(localStorage[key]).quantity)
    }
    document.querySelector('#totalCount').innerHTML = total
}
displayBubble()