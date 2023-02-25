const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart)
const cart__items = document.querySelector('#cart__items');
const cart__total = document.querySelector('.cart__total');
let cart__total__quantity = document.querySelector('#totalQuantity');
let cart__total__price = document.querySelector('#totalPrice');
const cart__btn = document.querySelector('#order');
let firstNameOK = false;
let lastNameOK = false;
let addressOK = false;
let cityOK = false;
let emailOK = false;

if (cart.length > 0) {
    // Récupère les données du localStorage et les affiche dans le panier
    // Afficher les produits ajoutés au panier en utilisant les informations stockées dans le localStorage
    for (i = 0; i < cart.length; i++) {
        cart__items.innerHTML += `
        <article class="cart__item" data-id="`+cart[i].id+`" data-color="`+cart[i].color+`">
            <div class="cart__item__img">
                <img src="`+cart[i].imageUrl+`" alt="`+cart[i].altTxt+`">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>`+cart[i].title+`</h2>
                    <p>`+cart[i].color+`</p>
                    <p>`+cart[i].price+` €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="`+cart[i].quantity+`">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
    }
}

// Supprimer un produit du panier
cart__items.addEventListener("click", function(e) {
    if (e.target.classList.contains("deleteItem")) {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        for (i = 0; i < cart.length; i++) {
            if (cart[i].id == e.target.parentElement.parentElement.parentElement.parentElement.dataset.id && cart[i].color == e.target.parentElement.parentElement.parentElement.parentElement.dataset.color) {
                cart.splice(i, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
    }
});

// Modifier la quantité d'un produit du panier et mettre à jour le localStorage en mettant à jour la value de l'input correspondant
cart__items.addEventListener("change", function(e) {
    if (e.target.classList.contains("itemQuantity")) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        for (i = 0; i < cart.length; i++) {
            if (cart[i].id == e.target.parentElement.parentElement.parentElement.parentElement.dataset.id && cart[i].color == e.target.parentElement.parentElement.parentElement.parentElement.dataset.color) {
                cart[i].quantity = e.target.value;
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
    }
});

// Afficher le prix total du panier
function totalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    for (i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].quantity;
    }
    cart__total__price.textContent = totalPrice;
}

// Afficher la quantité totale de produits dans le panier
function totalQuantity() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;
    for (i = 0; i < cart.length; i++) {
        totalQuantity += parseInt(cart[i].quantity);
    }
    cart__total__quantity.textContent = totalQuantity;
}

// Afficher le prix total du panier et la quantité totale de produits dans le panier
function total() {
    totalPrice();
    totalQuantity();
}

// Mettre à jour la quantité totale de produits dans le panier et le prix total du panier lorsque l'on clique sur le bouton "Supprimer"
cart__items.addEventListener("click", function() {
    total();
});
total();


// Vérifie chaque champs du formulaire
function checkForm() {
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let address = document.querySelector('#address').value;
    let city = document.querySelector('#city').value;
    let email = document.querySelector('#email').value;
    let firstNameError = document.querySelector('#firstNameErrorMsg');
    let lastNameError = document.querySelector('#lastNameErrorMsg');
    let addressError = document.querySelector('#addressErrorMsg');
    let cityError = document.querySelector('#cityErrorMsg');
    let emailError = document.querySelector('#emailErrorMsg');
    let regexName = /^[a-zA-ZÀ-ÿ]+([-'\s][a-zA-ZÀ-ÿ]+)?$/;
    let regexAddress = /^[a-zA-Z0-9À-ÿ\s]+$/;
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (firstName == "" || firstName.length < 2) {
        firstNameError.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    } else if (!regexName.test(firstName)) {
        firstNameError.textContent = "Les caractères spéciaux ne sont pas autorisés.";
    } else {
        firstNameError.textContent = "";
        firstNameOK = true;
    }
    if (lastName == "" || lastName.length < 2) {
        lastNameError.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    } else if (!regexName.test(lastName)) {
        lastNameError.textContent = "Les caractères spéciaux ne sont pas autorisés.";
    } else {
        lastNameError.textContent = "";
        lastNameOK = true;
    }
    if (address == "" || address.length < 5) {
        addressError.textContent = "Veuillez entrer 5 caractères ou plus pour le champ de l'adresse.";
    } else if (!regexAddress.test(address)) {
        addressError.textContent = "Les caractères spéciaux ne sont pas autorisés.";
    } else {
        addressError.textContent = "";
        addressOK = true;
    }
    if (city == "" || city.length < 2) {
        cityError.textContent = "Veuillez entrer 2 caractères ou plus pour le champ de la ville.";
    } else if (!regexName.test(city)) {
        cityError.textContent = "Les caractères spéciaux ne sont pas autorisés.";
    } else {
        cityError.textContent = "";
        cityOK = true;
    }
    if (email == "" || email.length < 5) {
        emailError.textContent = "Veuillez entrer 5 caractères ou plus pour le champ de l'email.";
    } else if (!regexEmail.test(email)) {
        emailError.textContent = "Veuillez entrer une adresse email valide.";
    } else {
        emailError.textContent = "";
        emailOK = true;
    }
}

cart__btn.addEventListener("click", function(e) {
    e.preventDefault();
    // Vérifie chaque champs du formulaire
    checkForm();

    // Enregistre les données du formulaire dans le localStorage
    let contactInfo = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value
    }
    localStorage.setItem("contact", JSON.stringify(contactInfo));

    // si tous les champs du formulaire sont remplis
    if (cart.length > 0 && firstNameOK && lastNameOK && addressOK && cityOK && emailOK) {
        // Récupère les id des produits du panier
        let getId = cart.map(product => product.id);

        // Envoie les données du formulaire et les id des produits du panier au serveur
        const result = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("email").value
                    },
                products : getId
            })
        });
        // Récupère l'id de la commande et l'envoie à la page confirmation.html
        // et vide le localStorage
        result.then(async (answer) => {
            try {
                const data = await answer.json();
                window.location.href = `confirmation.html?id=${data.orderId}`;
                localStorage.clear();
            } catch (error) {
                console.log(error);
            }
        });
    }
});
