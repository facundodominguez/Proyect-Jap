document.addEventListener("DOMContentLoaded", function (e) {
      document.getElementById("submitButton").addEventListener("click", function () {

        var email = document.getElementById("inputEmail");
        localStorage.setItem("inputEmail", email.value);
        
    });
});
