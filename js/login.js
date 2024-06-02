document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simular autenticación básica
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin.html';
    } else if (username === 'usuario' && password === 'user123') {
        window.location.href = 'catalogo.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
