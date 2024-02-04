function validate() {
    var error = 0;

    // Get the input fields
    var fName = document.getElementById("fName");
    var fEmail = document.getElementById("fEmail");
    var fAddress = document.getElementById("fAddress");
    var fLastN = document.getElementById("fLastN");
    var fPassword = document.getElementById("fPassword");
    var fPhone = document.getElementById("fPhone");

    // Get the error elements
    var errorName = document.getElementById("errorName");
    var errorEmail = document.getElementById("errorEmail");
    var errorAddress = document.getElementById("errorAddress");
    var errorLastN = document.getElementById("errorLastN");
    var errorPassword = document.getElementById("errorPassword");
    var errorPhone = document.getElementById("errorPhone");


    // First Name validation
    if (fName.value.trim() === "") {
        error++;
        errorName.textContent = "Este campo es obligatorio y debe tener, al menos, 3 caracteres";
        fName.classList.add("is-invalid");
    } else if (!/^[a-zA-Z]+$/.test(fName.value)) {
        error++;
        errorName.textContent = "El nombre debe contener sólo letras";
        fName.classList.add("is-invalid");
    } else if (fName.value.length < 3) {
        error++;
        errorName.textContent = "El nombre debe tener, al menos, 3 caracteres";
        fName.classList.add("is-invalid");
    } else {
        errorName.textContent = "";
        fName.classList.remove("is-invalid");
    }

    // Email validation
    if (fEmail.value.trim() === "") {
        error++;
        errorEmail.textContent = "Este campo es obligatorio y debe contener una '@' y tener, al menos, 3 caracteres";
        fEmail.classList.add("is-invalid");
    } else if (!/\S+@\S+\.\S+/.test(fEmail.value)) {
        error++;
        errorEmail.textContent = "Formato de correo electrónico no válido";
        fEmail.classList.add("is-invalid");
    } else {
        errorEmail.textContent = "";
        fEmail.classList.remove("is-invalid");
    }

    // Address validation
    if (fAddress.value.trim() === "") {
        error++;
        errorAddress.textContent = "Este campo es obligatorio y debe tener, al menos, 3 caracteres";
        fAddress.classList.add("is-invalid");
    } else if (fAddress.value.length < 3) {
        error++;
        errorAddress.textContent = "La dirección debe tener, al menos, 3 caracteres";
        fAddress.classList.add("is-invalid");
    } else {
        errorAddress.textContent = "";
        fAddress.classList.remove("is-invalid");
    }

    // Last Name validation
    if (fLastN.value.trim() === "") {
        error++;
        errorLastN.textContent = "Este campo es obligatorio y debe tener, al menos, 3 caracteres";
        fLastN.classList.add("is-invalid");
    } else if (!/^[a-zA-Z]+$/.test(fLastN.value)) {
        error++;
        errorLastN.textContent = "El apellido debe contener sólo letras";
        fLastN.classList.add("is-invalid");
    } else if (fLastN.value.length < 3) {
        error++;
        errorLastN.textContent = "El apellido debe tener, al menos, 3 caracteres";
        fLastN.classList.add("is-invalid");
    } else {
        errorLastN.textContent = "";
        fLastN.classList.remove("is-invalid");
    }

    // Password validation
    if (fPassword.value.trim() === "") {
        error++;
        errorPassword.textContent = "Este campo es obligatorio";
        fPassword.classList.add("is-invalid");
    } else if (!/[a-zA-Z]/.test(fPassword.value) || !/\d/.test(fPassword.value)) {
        error++;
        errorPassword.textContent = "La contraseña debe incluir números y letras";
        fPassword.classList.add("is-invalid");
    } else if (fPassword.value.length < 4 || fPassword.value.length > 8) {
        error++;
        errorPassword.textContent = "La contraseña debe tener entre 4 y 8 caracteres";
        fPassword.classList.add("is-invalid");
    } else {
        errorPassword.textContent = "";
        fPassword.classList.remove("is-invalid");
    }

    // Phone Number validation
    if (fPhone.value.trim() === "") {
        error++;
        errorPhone.textContent = "Este campo es obligatorio";
        fPhone.classList.add("is-invalid");
    } else if (isNaN(fPhone.value) || fPhone.value.length !== 9) {
        error++;
        errorPhone.textContent = "¡Número de teléfono inválido! Debe tener 9 dígitos sin letras";
        fPhone.classList.add("is-invalid");
    } else {
        errorPhone.textContent = "";
        fPhone.classList.remove("is-invalid");
    }

    if (error > 0) {
        console.log("Rellene el formulario correctamente");
    } else {
        console.log("OK");
    }
}
