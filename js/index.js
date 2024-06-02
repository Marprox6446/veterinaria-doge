document.addEventListener('DOMContentLoaded', function() {
    // Animación de carga de la página
    const heroSection = document.querySelector('.hero');
    heroSection.style.opacity = 0;
    setTimeout(() => {
        heroSection.style.transition = 'opacity 1s';
        heroSection.style.opacity = 1;
    }, 500);

    // Hacer que el menú sea fijo en la parte superior
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    window.onscroll = function() {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    // Agregar funcionalidad para testimonios en tiempo real
    const testimonialForm = document.getElementById('testimonial-form');
    const testimonialList = document.getElementById('testimonial-list');

    testimonialForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        if (name && message) {
            const newTestimonial = document.createElement('p');
            newTestimonial.textContent = `"${message}" - ${name}`;
            testimonialList.appendChild(newTestimonial);

            // Limpiar formulario
            testimonialForm.reset();
        }
    });

    // Manejar el envío del formulario de citas
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const petName = document.getElementById('pet-name').value;
        const ownerName = document.getElementById('owner-name').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (petName && ownerName && service && date && time) {
            alert(`Cita programada para ${petName} (${ownerName}) para el servicio de ${service} el ${date} a las ${time}.`);
            appointmentForm.reset();
        }
    });
});

// Animación de entrada para el formulario al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact form');
    form.classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    function agregarAlCarrito(evento) {
        const producto = evento.target.parentElement;
        const titulo = producto.querySelector('h3').textContent;
        const precio = producto.querySelector('.precio').textContent;
        const imagen = producto.querySelector('img').src;

        const productoCarrito = {
            titulo,
            precio,
            imagen
        };

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(productoCarrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        actualizarCarrito();
    }

    function actualizarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const dropdownContent = document.querySelector('.dropdown-content');
        const carritoPagina = document.querySelector('.productos-carrito');

        dropdownContent.innerHTML = '';
        carritoPagina.innerHTML = '';

        carrito.forEach(producto => {
            const productoHTML = `
                <div class="producto-carrito">
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <p>${producto.titulo} - ${producto.precio}</p>
                </div>
            `;
            dropdownContent.innerHTML += productoHTML;
            carritoPagina.innerHTML += productoHTML;
        });

        const contadorCarrito = document.querySelector('.dropbtn span');
        contadorCarrito.textContent = carrito.length;
    }

    actualizarCarrito();
});



document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.querySelector('.catalogo-titulo');

    function animateTitle() {
        if (titulo.getBoundingClientRect().top < window.innerHeight) {
            titulo.style.animation = 'none';
            titulo.offsetHeight; // Trigger reflow
            titulo.style.animation = null;
        }
    }

    window.addEventListener('scroll', animateTitle);
    animateTitle();
});

document.addEventListener('DOMContentLoaded', () => {
    const carritoItems = document.querySelector('.carrito-items');
    const totalProductosElem = document.getElementById('total-productos');
    const precioTotalElem = document.getElementById('precio-total');
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let totalProductos = 0;
        let precioTotal = 0;

        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('carrito-item');
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio.toFixed(2)}</p>
                <input type="number" value="${producto.cantidad}" class="cantidad">
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            `;
            carritoItems.appendChild(item);

            totalProductos += producto.cantidad;
            precioTotal += producto.precio * producto.cantidad;
        });

        totalProductosElem.textContent = totalProductos;
        precioTotalElem.textContent = `$${precioTotal.toFixed(2)}`;

        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', eliminarProducto);
        });

        document.querySelectorAll('.cantidad').forEach(input => {
            input.addEventListener('change', actualizarCantidad);
        });

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function eliminarProducto(event) {
        const id = event.target.dataset.id;
        carrito = carrito.filter(producto => producto.id !== id);
        actualizarCarrito();
    }

    function actualizarCantidad(event) {
        const id = event.target.closest('.carrito-item').querySelector('.eliminar').dataset.id;
        const nuevaCantidad = parseInt(event.target.value);
        const producto = carrito.find(producto => producto.id === id);
        if (producto && nuevaCantidad > 0) {
            producto.cantidad = nuevaCantidad;
            actualizarCarrito();
        }
    }

    // Simulación de añadir productos al carrito (esto normalmente vendría de otra parte de la aplicación)
    function agregarAlCarrito(id, nombre, precio, imagen) {
        const productoExistente = carrito.find(producto => producto.id === id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
        }
        actualizarCarrito();
    }

    // Esto es solo para el propósito de la demostración de que se pueda agregar productos desde otra parte de la aplicación
    // Ejemplo:
    // agregarAlCarrito(1, 'Pienso para gatos Premium', 15.99, 'img/Pienso para gatos Premium.png');

    actualizarCarrito();
});

document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;

            agregarAlCarrito(id, nombre, precio, imagen);
        });
    });
});

function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} ha sido añadido al carrito.`);
}

document.addEventListener('DOMContentLoaded', () => {
    const carritoItems = document.querySelector('.carrito-items');
    const totalProductosElem = document.getElementById('total-productos');
    const precioTotalElem = document.getElementById('precio-total');
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let totalProductos = 0;
        let precioTotal = 0;

        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('carrito-item');
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio.toFixed(2)}</p>
                <input type="number" value="${producto.cantidad}" class="cantidad">
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            `;
            carritoItems.appendChild(item);

            totalProductos += producto.cantidad;
            precioTotal += producto.precio * producto.cantidad;
        });

        totalProductosElem.textContent = totalProductos;
        precioTotalElem.textContent = `$${precioTotal.toFixed(2)}`;

        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', eliminarProducto);
        });

        document.querySelectorAll('.cantidad').forEach(input => {
            input.addEventListener('change', actualizarCantidad);
        });

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function eliminarProducto(event) {
        const id = event.target.dataset.id;
        carrito = carrito.filter(producto => producto.id !== id);
        actualizarCarrito();
    }

    function actualizarCantidad(event) {
        const id = event.target.closest('.carrito-item').querySelector('.eliminar').dataset.id;
        const nuevaCantidad = parseInt(event.target.value);
        const producto = carrito.find(producto => producto.id === id);
        if (producto && nuevaCantidad > 0) {
            producto.cantidad = nuevaCantidad;
            actualizarCarrito();
        }
    }

    actualizarCarrito();
});
