function get_price(price){
    var str = price.toString()
    return str.slice(0, str.length - 2) + ',' + str.slice(-2) +'€'; 
}

let summary = document.getElementById('summary')

function textFinal(tab) {
    let div = document.createElement("div")
    
    let lastName = localStorage.Name
    let id = localStorage.orderId
    let price = get_price(localStorage.totalPrice)

    div.innerHTML =
        '<div class="bg-faded p-5 text-center rounded">'
        +'<h2 class="section-heading">'
        +'<span class="section-heading-upper">MERCI '+ lastName +',</span>'
        +'</h2>'
        +'<p class=""> Nous sommes ravis pour votre commande, <br> numéro de commande : <span class="red">'+ id +'</span>, coût total: <span class="red">'+ price +'</span>. <br>'
        +'Nous mettons tout en oeuvre pour vous faire parvenir votre colis dans les plus brefs delais.</p>'
        +'<p>À bientôt sur notre site</p>'
        +'</div>'
    tab.appendChild(div)

    localStorage.clear()
}

textFinal(summary)

function pageAccueil(e) {
    e.preventDefault();
    document.location.href = "index.html"
}

let retourAccueil = document.querySelector('.buttons')
retourAccueil.addEventListener("click", pageAccueil )




