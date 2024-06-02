document.addEventListener('DOMContentLoaded', function() {
    const productTableBody = document.querySelector('#product-table tbody');
    const productModal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.close');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    const saveProductBtn = document.getElementById('save-product-btn');
    const addProductBtn = document.getElementById('add-product-btn');
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let isEditMode = false;
    let editProductId = null;

    function renderProducts() {
        productTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Editar</button>
                    <button class="delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            productTableBody.appendChild(tr);
        });
    }

    function openModal(editMode = false, product = null) {
        isEditMode = editMode;
        if (editMode && product) {
            modalTitle.textContent = 'Editar Producto';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-image').value = product.image;
        } else {
            modalTitle.textContent = 'Agregar Producto';
            productForm.reset();
        }
        productModal.style.display = 'block';
    }

    function closeModal() {
        productModal.style.display = 'none';
    }

    function saveProduct(event) {
        event.preventDefault();
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('product-name').value;
        const description = document.getElementById('product-description').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const image = document.getElementById('product-image').value;

        if (isEditMode) {
            const productIndex = products.findIndex(product => product.id === id);
            products[productIndex] = { id, name, description, price, image };
        } else {
            const newProduct = { id: Date.now().toString(), name, description, price, image };
            products.push(newProduct);
        }

        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        closeModal();
    }

    function deleteProduct(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    productTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const index = event.target.dataset.index;
            openModal(true, products[index]);
        } else if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            deleteProduct(index);
        }
    });

    addProductBtn.addEventListener('click', function() {
        openModal();
    });

    productForm.addEventListener('submit', saveProduct);
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            closeModal();
        }
    });

    renderProducts();
});
