//création de tableau pour les produits
let categories = ['Teddies']
let tableau = document.getElementById('tableau')

//Affichage du prix
function get_price(price){
    if(price == 0){
        return '00,00€'
    }else{
        var str = price.toString()
        return str.slice(0, str.length - 2) + ',' + str.slice(-2) +'€';
    }
}

//Mise en place de l'en-tête du tableau de produit
function createHeadTable(table) {
    let thead = document.createElement("thead")
    thead.innerHTML =
        '<tr class="main-hading">'
        +'<th>IMAGE</th>'
        +'<th>DESCRIPTIF</th>'
        +'<th class="text-center">TARIF</th>'
        +'<th class="text-center quantitePanier">QUANTITÉ</th>'
        +'<th class="text-center">TOTAL</th>'
        +'<th class="text-center"><i class="ti-trash remove-icon"></i></th>'
        +'</tr>'
    table.appendChild(thead)
}
createHeadTable(tableau)

//le panier est vide
function emptyCart (table) {
    let tbody = document.createElement("tbody")
    tbody.innerHTML =
        '<tr>'
        +'<td data-title="Description">'
        +'Votre panier est vide'
        +'</td>'
        +'</tr>'
    table.appendChild(tbody)
}

//ligne produit du tabeau
function addProductRow (table, element, key) {
    let tbody = document.createElement("tbody")
    let totalPriceProduct = get_price(element.quantity * element.price)
    tbody.innerHTML =
        '<tr  data-id="'+ key +'">'
        +'<td class="image" data-title="No"><img class="dn" src="'+ element.image +'" alt="teddy"></td>'
        +'<td class="product-des" data-title="Description">'
        +'<p class="n">'+ element.name +'</p>'
        +'<p class="w">'+ element.description +'</p>'
        +'</td>'
        +'<td class="price" data-title="Price"><span>'+ get_price(element.price) +'</span></td>'
        +'<td class="qty" data-title="Qty">'
        +'<div class="input-group">'
        +'<div class="button minus" data-id="'+ key +'">'
        +'<button type="button" class="btn btn-primary btn-number" /*disabled="disabled"*/ data-type="minus" data-field="quant[1]">'
        +'<i class="ti-minus"></i>'
        +'</button>'
        +'</div>'
        +'<input type="text" class="inputNumber"  data-min="1" data-max="100" value="'+ element.quantity +'">'
        +'<div class="button plus" data-id="'+ key +'">'
        +'<button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">'
        +'<i class="ti-plus"></i>'
        +'</button>'
        +'</div>'
        +'</div>'
        +'</td>'
        +'<td class="total-amount" data-title="Total"><span>'+ totalPriceProduct +'</span></td>'
        +'<td class="action"><button class="erase" data-id="'+ key +'"><i class="ti-trash"></i></button></td>'
        +'</tr>'
    table.appendChild(tbody)
}

//Mise en place du tableau
function displayTotalPanier () {
    if (localStorage.length == 0) {
        emptyCart(tableau)
    }else {
        for(let key of Object.keys(localStorage)) {
            addProductRow (tableau, JSON.parse(localStorage[key]), key)
        }
        let plus = document.getElementsByClassName('plus')
        let minus = document.getElementsByClassName('minus')
        let erase = document.getElementsByClassName('erase')
        for(let button of plus) {
            button.addEventListener('click', function(){
                let key = this.dataset.id
                this.previousSibling.value = parseInt(this.previousSibling.value) +1
                let quantity = this.previousSibling.value
                addQuantityProduct (key, quantity)
                let parent = this.parentElement.parentElement.parentElement
                let tdTotal = parent.getElementsByClassName('total-amount')[0]
                tdTotal.innerHTML = get_price(quantity*JSON.parse(localStorage[key]).price)
            })
        }
        for(let button of minus) {
            button.addEventListener('click', function(){
                if (button.nextSibling.value == 1) {
                    document.querySelector('.minus button').setAttribute('disabled', 'disabled')
                }else{
                let key = button.dataset.id
                button.nextSibling.value = parseInt(button.nextSibling.value) -1
                let quantity = button.nextSibling.value
                removeProduct (key, quantity)
                let parent = button.parentElement.parentElement.parentElement
                let tdTot = parent.getElementsByClassName('total-amount')[0]
                tdTot.innerHTML = get_price(quantity*JSON.parse(localStorage[key]).price)
                }
            })
        }
        for(let button of erase) {
            button.addEventListener('click', function(){
                let key = button.dataset.id
                let selectionSupp = localStorage[key]
                if ( confirm("ce produit va être retiré du panier") ) {
                    eraseProduct(key)
                    window.location.reload()
                }else{}            
            })
        }
    }
}
displayTotalPanier()

function addQuantityProduct (key, quantity) {
    let product = JSON.parse(localStorage[key])
    product.quantity = quantity
    localStorage.setItem(key, JSON.stringify(product))
    cartSum ()
}
function removeProduct (key, quantity) {
    let product = JSON.parse(localStorage[key])
    product.quantity = quantity
    localStorage.setItem(key, JSON.stringify(product))
    cartSum ()
}
function eraseProduct (key) {
    localStorage.removeItem(key)
    cartSum ()
}
function cartSum () {
    let total = 0
    let priceU = 0
    let codePromo = 0
    let totalPrice = 0
    for(let key of Object.keys(localStorage)) {
        let product = JSON.parse(JSON.parse(localStorage[key]).quantity)*(JSON.parse(localStorage[key]).price)
        total = product
        totalPrice += total
    }
    document.querySelector('.subTotal').innerHTML = get_price(totalPrice)
    document.querySelector('.lastTotal').innerHTML = get_price(totalPrice + codePromo)
    return totalPrice
}
cartSum ()

function postName(e) {
    let submit = document.querySelector("#submit");
    let inputName = document.querySelector("#lastName");
    let inputfirstName = document.querySelector("#firstName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");

    //validation du formulaire
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

    let contact = {
        'firstName': inputfirstName.value,
        'lastName': inputName.value,
        'address': inputAdress.value,
        'city': inputCity.value,
        'email': inputMail.value
    }

    if (
        (regexMail.test(contact.email) == true) &
        (regexName.test(contact.firstName) == true) &
        (regexName.test(contact.lastName) == true) &
        (regexCity.test(contact.city) == true) &
        (regexAddress.test(contact.address) == true)
    ) {
        e.preventDefault();

        var cat = Object.keys(localStorage);
        var products = [];
        cat.forEach(function(i){
            products.push(i);
        });

        let envoiRequest = fetch("http://localhost:3000/api/teddies/order", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({products, contact})
        }).then(response => response.json())
        .then(response => {
            localStorage.setItem('totalPrice', cartSum())
            localStorage.setItem('orderId',response.orderId)
            localStorage.setItem('Name',inputfirstName.value)
            window.location.href = 'confirmation.html'
        })
        .catch(error => alert("Erreur : " + error));
    } else {
    }
}

let envoiFormulaire = document.querySelector('.buttons')
envoiFormulaire.addEventListener("click", postName);