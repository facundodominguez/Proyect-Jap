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
    
    const checkUser = function(endpoint, userData){
        let url = `${backUrl}${endpoint}`;

        fetch(url, {
          method: 'POST', 
          body: JSON.stringify(userData),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => {
            console.error('Error: ', error)
            alert('Usuario y/o contraseña incorrecta')
        })
        .then(response => {
            console.log('Success:', response)
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        });
    }
    document.getElementById("submitButton").addEventListener("click", function () {

        var email = document.getElementById("inputEmail");
        localStorage.setItem("inputEmail", email.value);
        
    });
});