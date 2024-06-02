document.addEventListener("DOMContentLoaded", () => {
    const carritoProductos = document.getElementById("carrito-productos");
    const totalElement = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderCarrito = () => {
        carritoProductos.innerHTML = "";
        let total = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto-carrito");

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.precio}</p>
                </div>
                <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
            `;

            carritoProductos.appendChild(productoDiv);

            total += parseFloat(producto.precio);
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
    };

    const eliminarProducto = (id) => {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    };

    carritoProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar-producto")) {
            const id = e.target.getAttribute("data-id");
            eliminarProducto(id);
        }
    });

    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    });

    renderCarrito();
});
