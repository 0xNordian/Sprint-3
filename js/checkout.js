// function validate() {
// 	var error = 0;

// 	// Get the input fields
// 	var fName = document.getElementById("fName");
// 	var fEmail = document.getElementById("fEmail");
// 	var fAddress = document.getElementById("fAddress");
// 	var fLastN = document.getElementById("fLastN");
// 	var fPassword = document.getElementById("fPassword");
// 	var fPhone = document.getElementById("fPhone");

// 	// Get the error elements
// 	var errorName = document.getElementById("errorName");
// 	var errorEmail = document.getElementById("errorEmail");
// 	var errorAddress = document.getElementById("errorAddress");
// 	var errorLastN = document.getElementById("errorLastN");
// 	var errorPassword = document.getElementById("errorPassword");
// 	var errorPhone = document.getElementById("errorPhone");

// 	// Validate fields entered by the user: name, email, address, last name, password, and phone number

// 	// First Name validation
// 	if (fName.value.trim() === "") {
// 		error++;
// 		errorTest.textContent = "This field is required and must have, at least, 3 characters";
// 	} else if (fName.value.length < 3) {
// 		error++;
// 		errorName.textContent = "Name must have, at least, 3 characters";
// 	} else {
// 		errorName.textContent = "";
// 	}

// 	// Email validation
// 	if (fEmail.value.trim() === "") {
// 		error++;
// 		errorEmail.textContent = "This field is required and must contain an '@' and have, at least, 3 characters";
// 	} else if (!fEmail.value.includes("@") || fEmail.value.length < 3) {
// 		error++;
// 		errorEmail.textContent = "Invalid email format";
// 	} else {
// 		errorEmail.textContent = "";
// 	}

// 	// Address validation
// 	if (fAddress.value.trim() === "") {
// 		error++;
// 		errorAddress.textContent = "This field is required and must have, at least, 3 characters";
// 	} else if (fAddress.value.length < 3) {
// 		error++;
// 		errorAddress.textContent = "Address must have, at least, 3 characters";
// 	} else {
// 		errorAddress.textContent = "";
// 	}

// 	// Last Name validation
// 	if (fLastN.value.trim() === "") {
// 		error++;
// 		errorLastN.textContent = "This field is required and must have, at least, 3 characters";
// 	} else if (fLastN.value.length < 3) {
// 		error++;
// 		errorLastN.textContent = "Last Name must have, at least, 3 characters";
// 	} else {
// 		errorLastN.textContent = "";
// 	}

// 	// Password validation
// 	if (fPassword.value.trim() === "") {
// 		error++;
// 		errorPassword.textContent = "This field is required";
// 	} else if (fPassword.value.length < 4 || fPassword.value.length > 8) {
// 		error++;
// 		errorPassword.textContent = "Password must be between 4 and 8 characters";
// 	} else {
// 		errorPassword.textContent = "";
// 	}

// 	// Phone Number validation
// 	if (fPhone.value.trim() === "") {
// 		error++;
// 		errorPhone.textContent = "This field is required";
// 	} else if (isNaN(fPhone.value) || fPhone.value.length !== 9) {
// 		error++;
// 		errorPhone.textContent = "Invalid phone number!! Must be 9 digits with no letters";
// 	} else {
// 		errorPhone.textContent = "";
// 	}

// 	if (error > 0) {
// 		alert("Please, fill the form correctly");
// 	} else {
// 		alert("OK");
// 	}
// }

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

    // Validate fields entered by the user: name, email, address, last name, password, and phone number

    // First Name validation
    if (fName.value.trim() === "") {
        error++;
        errorName.textContent = "This field is required and must have, at least, 3 characters";
        fName.classList.add("is-invalid");
    } else if (!/^[a-zA-Z]+$/.test(fName.value)) {
        error++;
        errorName.textContent = "Name must contain only letters";
        fName.classList.add("is-invalid");
    } else if (fName.value.length < 3) {
        error++;
        errorName.textContent = "Name must have, at least, 3 characters";
        fName.classList.add("is-invalid");
    } else {
        errorName.textContent = "";
        fName.classList.remove("is-invalid");
    }

    // Email validation
    if (fEmail.value.trim() === "") {
        error++;
        errorEmail.textContent = "This field is required and must contain an '@' and have, at least, 3 characters";
        fEmail.classList.add("is-invalid");
    } else if (!/\S+@\S+\.\S+/.test(fEmail.value)) {
        error++;
        errorEmail.textContent = "Invalid email format";
        fEmail.classList.add("is-invalid");
    } else {
        errorEmail.textContent = "";
        fEmail.classList.remove("is-invalid");
    }

    // Address validation
    if (fAddress.value.trim() === "") {
        error++;
        errorAddress.textContent = "This field is required and must have, at least, 3 characters";
        fAddress.classList.add("is-invalid");
    } else if (fAddress.value.length < 3) {
        error++;
        errorAddress.textContent = "Address must have, at least, 3 characters";
        fAddress.classList.add("is-invalid");
    } else {
        errorAddress.textContent = "";
        fAddress.classList.remove("is-invalid");
    }

    // Last Name validation
    if (fLastN.value.trim() === "") {
        error++;
        errorLastN.textContent = "This field is required and must have, at least, 3 characters";
        fLastN.classList.add("is-invalid");
    } else if (!/^[a-zA-Z]+$/.test(fLastN.value)) {
        error++;
        errorLastN.textContent = "Last Name must contain only letters";
        fLastN.classList.add("is-invalid");
    } else if (fLastN.value.length < 3) {
        error++;
        errorLastN.textContent = "Last Name must have, at least, 3 characters";
        fLastN.classList.add("is-invalid");
    } else {
        errorLastN.textContent = "";
        fLastN.classList.remove("is-invalid");
    }

    // Password validation
    if (fPassword.value.trim() === "") {
        error++;
        errorPassword.textContent = "This field is required";
        fPassword.classList.add("is-invalid");
    } else if (!/[a-zA-Z]/.test(fPassword.value) || !/\d/.test(fPassword.value)) {
        error++;
        errorPassword.textContent = "Password must include numbers and letters";
        fPassword.classList.add("is-invalid");
    } else if (fPassword.value.length < 4 || fPassword.value.length > 8) {
        error++;
        errorPassword.textContent = "Password must be between 4 and 8 characters";
        fPassword.classList.add("is-invalid");
    } else {
        errorPassword.textContent = "";
        fPassword.classList.remove("is-invalid");
    }

    // Phone Number validation
    if (fPhone.value.trim() === "") {
        error++;
        errorPhone.textContent = "This field is required";
        fPhone.classList.add("is-invalid");
    } else if (isNaN(fPhone.value) || fPhone.value.length !== 9) {
        error++;
        errorPhone.textContent = "Invalid phone number!! Must be 9 digits with no letters";
        fPhone.classList.add("is-invalid");
    } else {
        errorPhone.textContent = "";
        fPhone.classList.remove("is-invalid");
    }

    if (error > 0) {
        console.log("Please fill the form correctly");
    } else {
        console.log("OK");
    }
}
