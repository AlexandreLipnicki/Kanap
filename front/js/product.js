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
    // vérifie que les champs sont remplis
    if (color.value == "" || quantity.value == 0) {
        alert("Veuillez chosir une couleur et une quantité");
        return;
    } else {
        alert("Le produit a été ajouté au panier");
    };

    // Créer un objet product avec les informations du produit sélectionné
    let product = {
        id: id,
        color: color.value,
        quantity: quantity.value
    };

    // Récupérer les produits stockés dans le localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // vérifie que le produit n'existe pas déjà dans le panier
    // si oui, ajoute la quantité au produit existant
    // sinon, ajoute le produit au panier
    let existingProductIndex = cart.findIndex(item => item.id === id && item.color === color.value);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + parseInt(product.quantity);
    } else {
        cart.push(product);
    };

    // Stocker les produits dans le localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(cart);
});