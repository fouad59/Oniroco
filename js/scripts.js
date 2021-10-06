function get_price(price){
    var str = price.toString()
    return str.slice(0, str.length - 2) + ',' + str.slice(-2) +'€'; 
}


/*function cartSum () {
    let total = 0
    let priceU = 0
    let codePromo = 0
    let totalPrice = 0
    for(let key of Object.keys(localStorage)) {
        let product = JSON.parse(JSON.parse(localStorage[key]).quantity)*(JSON.parse(localStorage[key]).price)
        total = product
        totalPrice += total
        console.log('total')
        console.log(total)
    }
    document.querySelector('.subTotal').innerHTML = get_price(totalPrice)
    document.querySelector('.lastTotal').innerHTML = get_price(totalPrice + codePromo)
}
cartSum()*/



// convertir en objet javaScript
//let dataLS = JSON.parse(dataLocalStorage)
//Mettre la quantité dans la bulle

//document.querySelector('#n').setAttribute('name', dataLS.name)



