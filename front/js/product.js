const id = document.URL.split("?id=")[1];
const item__img = document.querySelector('.item__img');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const color = document.querySelector('#colors');
const addToCart = document.querySelector('#addToCart');
const quantity = document.querySelector('#quantity');

// Récupérer les informations du produit sélectionné
// et les afficher sur la page produit
// en utilisant les informations stockées dans le localStorage
fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then(data => {
    item__img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    title.innerHTML = data.name;
    price.innerHTML = data.price;
    description.innerHTML = data.description;
    for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `
        <option value="${data.colors[i]}">${data.colors[i]}</option>
        `;
    }
});

addToCart.addEventListener("click", function() {
    // Récupérer les produits stockés dans le localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // vérifie que les champs sont remplis
    if (color.value == "" || quantity.value == 0) {
        alert("Veuillez chosir une couleur et une quantité");
        return;
    } else {
        alert("Le produit a été ajouté au panier");
    }

    // Créer un objet product avec les informations du produit sélectionné
    let product = {
    id: id,
    imageUrl: item__img.querySelector('img').src,
    altTxt: item__img.querySelector('img').alt,
    title: title.innerHTML,
    price: price.innerHTML,
    description: description.innerHTML,
    color: color.value,
    quantity: quantity.value
    };

    //vérifie que le produit n'existe pas déjà dans le panier
    // et si oui, ajoute la quantité au produit existant
    // sinon, ajoute le produit au panier
    if (cart.length > 0) {
        for (i = 0; i < cart.length; i++) {
            if (cart[i].id == product.id && cart[i].color == product.color) {
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(product.quantity);
                break;
            } 
        }
    } else {
        cart.push(product);
    }

    console.log(cart);

    // Stocker les produits dans le localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

});