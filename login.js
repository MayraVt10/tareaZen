document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "12345") {
            window.location.href = "index.html";
        } else {
            alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    });
});
