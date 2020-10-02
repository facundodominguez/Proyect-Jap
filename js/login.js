document.addEventListener("DOMContentLoaded", function (e) {

    const backUrl = 'http://localhost:8080';
    const loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        const user = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        checkUser('/auth', {
            user,
            password
        });
    };
    document.getElementById("submitButton").addEventListener("click", function () {

        var email = document.getElementById("inputEmail");
        localStorage.setItem("inputEmail", email.value);
        
    });
});
