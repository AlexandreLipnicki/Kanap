// Affiche tous les produits de l'API sur la page d'accueil
fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then(data => {
    const items = document.getElementById('items');
    for(i=0;i<data.length;i++){
        let newItem = document.createElement('a');
        newItem.href = "./product.html?id="+data[i]._id;
        newItem.innerHTML = `
            <article>
                <img src="`+data[i].imageUrl+`" alt="`+data[i].altTxt+`">
                <h3 class="productName">`+data[i].name+`</h3>
                <p class="productDescription">`+data[i].description+`</p>
            </article>`;
        items.appendChild(newItem);
    };
});