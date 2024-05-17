let products = [
    { id: 1, name: 'NEW BALANCE 530 GREY', price: 2969, type: 'NewB', image: '../Images/1.jpg' },
    { id: 2, name: 'JORDAN 1 RETRO BLACK WHITE', price: 3899, type: 'Nike', image: '../Images/2.jpg' },
    { id: 3, name: 'NIKE AIR MAX 270 BLACK WHITE', price: 3270, type: 'Nike', image: '../Images/3.jpg' },
    { id: 4, name: 'ADIDAS HUMANRACE SAMBA BLACK WHITE', price: 3099, type: 'Adid', image: '../Images/4.jpg' },
    { id: 5, name: 'Nike Air Force 107', price: 5069, type: 'Nike', image: '../Images/5.11.jpg' },
    { id: 6, name: 'Jordan One Take 4', price: 4159, type: 'Nike', image: '../Images/6.webp' },
    { id: 7, name: 'Adidas Originals Ozrah', price: 3699, type: 'Adid', image: '../Images/7.webp' },
    { id: 8, name: 'Adidas Niteball', price: 1890, type: 'Adid', image: '../Images/8.1.jpg' }
];

function generateProductHTML(product) {
    return `
        <section class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>Ціна: ${product.price} грн</h4>
            <button>Купити</button>
        </section>
    `;
}

function renderProducts(productsToShow) {
    let shopSection = document.getElementById('product-list');
    let productElements = '';

    productsToShow.forEach(product => {
        productElements += generateProductHTML(product);
    });

    shopSection.innerHTML = productElements;
}

function loadProducts(type) {
    let filteredProducts = products.filter(product => product.type === type);
    renderProducts(filteredProducts);
}

// Initial loading of all products
renderProducts(products);

function loadAllProducts() {
    renderProducts(products);
}
