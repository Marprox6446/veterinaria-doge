document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".agregar-carrito");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const nombre = button.getAttribute("data-nombre");
            const precio = button.getAttribute("data-precio");
            const imagen = button.getAttribute("data-imagen");

            const producto = { id, nombre, precio, imagen };

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert(`${nombre} ha sido agregado al carrito.`);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.querySelector('.productos');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('producto');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="precio">$${product.price.toFixed(2)}</p>
                <button class="agregar-carrito" data-id="${product.id}" data-nombre="${product.name}" data-precio="${product.price}" data-imagen="${product.image}">Agregar al carrito</button>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    renderProducts();
});
