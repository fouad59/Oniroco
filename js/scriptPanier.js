let categories = ['Teddies']
//création de tableau pour les produits
let tableau = document.getElementById('tableau')
function get_price(price){
    if(price == 0){
        return '00,00€'
    }else{
        var str = price.toString()
        return str.slice(0, str.length - 2) + ',' + str.slice(-2) +'€';
    }
}

function createProductPanier(table) {
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
createProductPanier(tableau)

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

function AddProductRow (table, element, key) {
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

function displayTotalPanier () {
    if (localStorage.length == 0) {
        emptyCart(tableau)
    }else {
        for(let key of Object.keys(localStorage)) {
            AddProductRow (tableau, JSON.parse(localStorage[key]), key)
        }
        let plus = document.getElementsByClassName('plus')
        let minus = document.getElementsByClassName('minus')
        let erase = document.getElementsByClassName('erase')
        for(let button of plus) {
            button.addEventListener('click', function(){
                let key = button.dataset.id
                button.previousSibling.value = parseInt(button.previousSibling.value) +1
                let quantity = button.previousSibling.value
                addQuantityProduct (key, quantity)
                let parent = button.parentElement.parentElement.parentElement
                let tdTotal = parent.getElementsByClassName('total-amount')[0]
                tdTotal.innerHTML = get_price(quantity*JSON.parse(localStorage[key]).price)
                document.querySelector('.inputNumber').setAttribute('value', quantity)
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
                document.querySelector('.inputNumber').setAttribute('value', quantity)
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
}
cartSum ()

function postName(e) {
    e.preventDefault();
    let submit = document.querySelector("#submit");
    let inputName = document.querySelector("#lastName");
    let inputfirstName = document.querySelector("#firstName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");

    let contact = {
        'firstName': inputfirstName.value,
        'lastName': inputName.value,
        'address': inputAdress.value,
        'city': inputCity.value,
        'email': inputMail.value
    }
    console.log('contact')
    console.log(contact)

    var cat = Object.keys(localStorage);
    var products = [];
    cat.forEach(function(i){
        products.push(i);
    });

    console.log('products')
    console.log(products)

    fetch("http://localhost:3000/api/teddies/order", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(products, contact)
    }).then(response => response.json())
    .then(response => alert(JSON.stringify(response)))
    .catch(error => alert("Erreur : " + error));
}

let envoiFormulaire = document.querySelector('.buttons')
envoiFormulaire.addEventListener("click", postName);