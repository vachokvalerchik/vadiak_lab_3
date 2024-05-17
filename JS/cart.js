document.addEventListener('DOMContentLoaded', (event) => {
    // Всі продукти
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
                <button class="addtobag" data-name="${product.name}" data-price="${product.price}">Купити</button>
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
        addEventListenersToButtons(); // Додаємо обробники подій до кнопок
    }

    function loadProducts(type) {
        let filteredProducts = products.filter(product => product.type === type);
        renderProducts(filteredProducts);
    }

    function loadAllProducts() {
        renderProducts(products);
    }

    // Initial loading of all products
    renderProducts(products);

    // Отримуємо елементи
    const openModalBtn = document.getElementById("openModal");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementsByClassName("close")[0];
    const orderButton = document.getElementById("orderButton");
    const cartItemsContainer = document.getElementById("cart-items");

    // Відкриття модального вікна
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Закриття модального вікна
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Клік за межами модального вікна, щоб закрити його
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Розрахунок загальної суми замовлення
    function calculateTotal() {
        const cartItems = document.querySelectorAll(".cart-item");
        let total = 0;

        cartItems.forEach(function (item) {
            const itemPrice = parseFloat(item.querySelector(".item-price").textContent);
            const quantity = parseInt(item.querySelector(".quantity-value").textContent);
            const itemTotal = itemPrice * quantity;
            item.querySelector(".item-total").textContent = `${itemTotal.toFixed(2)}`;
            total += itemTotal;
        });

        document.getElementById("total").textContent = `Загальна сума: ${total.toFixed(2)} грн`;
    }

    // Обробник кнопки замовлення
    orderButton.addEventListener("click", function () {
        // Ваш код для обробки замовлення тут
    });

    // Додавання обробника подій для кнопок "+" та "-"
    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("increase-btn")) {
            increaseQuantity(event.target);
        } else if (event.target.classList.contains("decrease-btn")) {
            decreaseQuantity(event.target);
        } else if (event.target.classList.contains("remove-btn")) {
            removeCartItem(event.target);
        }
    });

    // Функція для збільшення кількості товару на 1
    function increaseQuantity(button) {
        const quantityElement = button.parentElement.querySelector(".quantity-value");
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        calculateTotal();
    }

    // Функція для зменшення кількості товару на 1
    function decreaseQuantity(button) {
        const quantityElement = button.parentElement.querySelector(".quantity-value");
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            calculateTotal();
        }
    }

    // Функція для видалення товару з кошика
    function removeCartItem(button) {
        const cartItem = button.closest(".cart-item");
        cartItem.remove();
        calculateTotal();
    }

    function addProductToCart(product) {
        // Перевіряємо, чи товар вже є в кошику
        const existingCartItem = Array.from(cartItemsContainer.children).find(
            item => item.querySelector(".item-name").textContent === product.name
        );

        if (existingCartItem) {
            // Якщо товар вже є в кошику, збільшуємо кількість
            const quantityElement = existingCartItem.querySelector(".quantity-value");
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
        } else {
            // Створення HTML-рядка для товару у кошику
            const cartItemHTML = `
                <div class="cart-item">
                    <span class="item-name">${product.name}</span>
                    <span class="item-price">${product.price}</span>
                    <button class="decrease-btn">-</button>
                    <span class="quantity-value">${product.quantity}</span>
                    <button class="increase-btn">+</button>
                    <span class="item-total">${(product.price * product.quantity).toFixed(2)}</span>
                    <button class="remove-btn">Видалити</button>
                </div>
            `;
            // Додавання HTML-рядка до контейнера кошика
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        }
        calculateTotal(); // Обчислення загальної суми
    }

    // Додавання обробника подій для кнопок "ADD TO BAG"
    function addEventListenersToButtons() {
        const addToBagButtons = document.querySelectorAll(".addtobag");

        addToBagButtons.forEach(button => {
            button.addEventListener("click", function () {
                addToCart(this); // Передаємо кнопку як аргумент для отримання інформації про товар
            });
        });
    }

    // Функція для додавання товару до кошика
    function addToCart(button) {
        const productElement = button.closest(".product");
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = parseFloat(productElement.querySelector("h4").textContent.replace('Ціна: ', '').replace(' грн', ''));
        const quantity = 1; // Початкова кількість товару

        // Створення об'єкта товару
        const product = {
            name: productName,
            price: productPrice,
            quantity: quantity
        };

        // Зміна тексту кнопки на "У кошику"
        button.textContent = "У кошику";

        // Додавання товару до списку у кошику
        addProductToCart(product);
    }
});
