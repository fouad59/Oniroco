//récuperer la quantité de produit
//const idQuantite = document.getElementById("qt");

//const quantitTeddie = idQuantite.value;

//const btnEnvoiPanier = document.querySelector(".btn-primary");

//ecouter le bouton et envoyer au panier
//btnEnvoiPanier.addEventListener("click", (event)=>{
//   event.preventDefault()
//})
let teddy = {name:"charle", price:30, _id:1}
updateCart(1, teddy, true)
console.log(localStorage)
function updateCart(quantite, produit, add) {
    let presenceCart = localStorage.getItem(produit._id)
    if(presenceCart){
        let item = JSON.parse(presenceCart)
        if(add){
            localStorage.setItem(produit._id, JSON.stringify({
                name:produit.name, 
                price:produit.price, 
                quantity:item.quantity + quantite
            }))
        }
    }else{
        if(add){
            localStorage.setItem(produit._id, JSON.stringify({
                name:produit.name, 
                price:produit.price, 
                quantity:quantite
            }))
        }
    }
}
