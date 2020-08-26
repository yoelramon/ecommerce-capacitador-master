//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitBtn").addEventListener("click", function(e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let passedValidation = true;
        
        if (inputEmail.value === '') {
            inputEmail.classList.add("is-invalid");
            passedValidation = false;
        } else {
            inputEmail.classList.remove("is-invalid");
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("is-invalid");
            passedValidation = false;
        } else {
            inputPassword.classList.remove("is-invalid");
        }

        if (passedValidation) {
            localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value}));
            window.location = 'index.html';
        }
    });
});