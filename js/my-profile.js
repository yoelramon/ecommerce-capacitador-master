//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let myProfile = localStorage.getItem('My-Profile');

  if (myProfile) {
    myProfile = JSON.parse(myProfile);
    document.getElementById("firstName").value = myProfile.firstName;
    document.getElementById("secondName").value = myProfile.secondName;
    document.getElementById("firstLastName").value = myProfile.firstLastName;
    document.getElementById("secondLastName").value = myProfile.secondLastName;
    document.getElementById("email").value = myProfile.email;
    document.getElementById("phoneNumber").value = myProfile.phoneNumber;
  }

  document.getElementById("saveChanges").addEventListener("click", function (e) {
    let passedValidation = true;
    let firstName = document.getElementById("firstName");
    let secondName = document.getElementById("secondName");
    let firstLastName = document.getElementById("firstLastName");
    let secondLastName = document.getElementById("secondLastName");
    let email = document.getElementById("email");
    let phoneNumber = document.getElementById("phoneNumber");

    if (firstName.value === '') {
      firstName.classList.add("is-invalid");
      passedValidation = false;
    } else {
      firstName.classList.remove("is-invalid");
    }

    if (firstLastName.value === '') {
      firstLastName.classList.add("is-invalid");
      passedValidation = false;
    } else {
      firstLastName.classList.remove("is-invalid");
    }

    if (phoneNumber.value === '') {
      phoneNumber.classList.add("is-invalid");
      passedValidation = false;
    } else {
      phoneNumber.classList.remove("is-invalid");
    }

    if (passedValidation) {
      localStorage.setItem('My-Profile', JSON.stringify({
        firstName: firstName.value,
        secondName: secondName.value,
        firstLastName: firstLastName.value,
        secondLastName: secondLastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value
      }));

      let msgToShowHTML = document.getElementById("resultSpan");
      msgToShowHTML.innerHTML = 'Cambios guardados con éxito!';

      document.getElementById("alertResult").classList.add("show");
    }
  });
});