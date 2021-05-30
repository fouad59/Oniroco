let categories = ['Teddie']
//création de tableau pour les produits
let sectionMain = document.getElementById('sectionMain')
// boucle  

    fetch('http://localhost:3000/api/teddies')
    .then(response => {
        return response.json()
    }).then(data =>{
        let div = document.createElement("div")
        for(let x=0; x<data.length; x++){
            div.appendChild (
                '<img class="intro-img img-fluid mb-3 mb-lg-0 rounded" src="assets/img/intro.jpg" alt="..." />'
                    + '<div class="intro-text left-0 text-center bg-faded p-5 rounded">'
                        + "<h2 class='section-heading mb-4'>"
                            +'<span class="section-heading-upper">' + data[x].name + '</span>'
                            +'<span class="section-heading-lower">' + data[x].price + '</span>'
                        + '</h2>'
                        + '<p class="mb-3">' + data[x].description + '</p>'
                        + '<div class="intro-button mx-auto"><a class="btn btn-primary btn-xl" href="teddies.html?id='+ data[x]._id +'">Voir le produit!</a></div>'
                    + '</div>'
            )}
    }).then( () => {
        sectionMain.innerHTML = div
    }) 