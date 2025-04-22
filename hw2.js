/*
Program name: Patient-form.html
Name: Matt Dsouza
Data created: Febuary 4, 2025
Data last edited: March 8, 2025
Version: 1.0
Description: Homework 2 Patient Form
*/
    // Dynamic Date
    document.getElementById("today").innerHTML = new Date().toLocaleDateString();

    // Range slider code
    let slider = document.getElementById("medRange");
    let output = document.getElementById("rangeBar");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    };

    // DOB Validation Function
    function validateDob() {
        console.log("validateDob function is running");
        let dob = document.getElementById("dob"); // calls dob id from html
        let date = new Date(dob.value);
        let maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 120);

        if (date > new Date()) {
            document.getElementById("dob-error").innerHTML = "This entered date cannot be in the future.";
            dob.value = "";
            return false;
        } else if (date < maxDate) {
            document.getElementById("dob-error").innerHTML = "Sorry, this date cannot be more than 120 years ago.";
            dob.value = "";
            return false;
        } else {
            document.getElementById("dob-error").innerHTML = "";
            return true;
        }
    }

    function validateSSN(){
        const ssn = document.getElementById("ssn").value;
        const ssnRegrex = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

        if (!ssnRegrex.test(ssn)){
            document.getElementById("ssn-error").innerHTML= "Please enter a valid SSN number."
            return false;
        } else {
            document.getElementById("ssn-error").innerHTML="";
            return true;
        }
    }

    function validateAddressline1(){
        var address1 = document.getElementById("address1").value;
        console.log(address1);
        console.log(address1.length);

        if (address1.length<2){
            document.getElementById("address1-error").innerHTML="Too short, Please enter a valid Address.";
            return false;
        } else{
            document.getElementById("address1-error").innerHTML="";
            return true;
        }
    }

    function validatePhone() {
        const userPhoneNumber = document.getElementById("phone");
        const originalInput = userPhoneNumber.value; // Store the original input
        const phoneNum = originalInput.replace(/\D/g, ""); // Remove non-numeric characters

        // Check if the input contains invalid characters
        if (originalInput !== phoneNum) {
            document.getElementById("phone-error").innerHTML = "NO DASHES, Please enter only numbers";
            return false;
        }

        if (phoneNum.length !== 10) {
            document.getElementById("phone-error").innerHTML = "Required. Please enter a valid 10-digit phone number.";
            return false;
        }

        // Format phone number
        const phoneNumberFormat = phoneNum.slice(0, 3) + "-" + phoneNum.slice(3, 6) + "-" + phoneNum.slice(6);
        userPhoneNumber.value = phoneNumberFormat;
        document.getElementById("phone-error").innerHTML = "";
        return true;
    }

    function validateZipcode() {
        const userZipNum = document.getElementById("zipcode"); // Corrected ID reference
        let zipCode = userZipNum.value.replace(/[^\d-]/g, ""); // Remove non-digit & non-hyphen characters

        if (!zipCode) {
            document.getElementById("zipcode-error").innerHTML = " Please enter a valid Zip code.";
            return false;
        }

        if (zipCode.length > 5) {
            zipCode = zipCode.slice(0, 5); // Limit to 5 characters
        }

        userZipNum.value = zipCode; // Corrected value assignment
        document.getElementById("zipcode-error").innerHTML = ""; // Clear error message
        return true;
    }
    function validateEmailAddress() {
        let userEmail = document.getElementById("emailaddress").value.trim(); // Trim to remove spaces
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Corrected variable name

        if (userEmail === "") {
            document.getElementById("emailaddress-error").innerHTML = " This field cannot be blank.";
            return false;
        } else if (!userEmail.match(emailRegex)) {
            document.getElementById("emailaddress-error").innerHTML = "Please enter a valid email address.";
            return false;
        } else {
            document.getElementById("emailaddress-error").innerHTML = "";
            return true;
        }
    }
    function validateUserID() {
        let userID = document.getElementById("userID").value.trim(); // Trim spaces

        userID = userID.toLowerCase(); // Converts to lowercase
        document.getElementById("userID").value = userID; // Update input field

        if (userID.length === 0) {
            document.getElementById("userID-error").innerHTML = "User ID field cannot be empty.";
            return false;
        }

        // Check if the first character is a number
        if (!isNaN(userID.charAt(0))) {
            document.getElementById("userID-error").innerHTML = "User ID cannot start with a number.";
            return false;
        }

        // Allow only letters, numbers, and underscores
        let userRegex = /^[a-zA-Z0-9_]+$/;
        if (!userRegex.test(userID)) {  // FIXED: Now correctly checking for invalid input
            document.getElementById("userID-error").innerHTML = "User ID must only contain letters, numbers, and underscores.";
            return false;
        }

        // Length validation
        if (userID.length < 5) {
            document.getElementById("userID-error").innerHTML = "User ID must be at least 5 characters.";
            return false;
        } else if (userID.length > 30) {
            document.getElementById("userID-error").innerHTML = "User ID cannot be more than 30 characters.";
            return false;
        }

        // If everything is correct, clear error and return true
        document.getElementById("userID-error").innerHTML = "";
        return true;
    }

    function validatePassword(){
        const password = document.getElementById("password").value;
        const userID = document.getElementById("userID").value;

        const errorMessage = [];

        if (!password.match(/[a-z]/)){
            errorMessage.push("Enter at least one lowercase letter.");
        }

        if (!password.match(/[A-Z]/)){
            errorMessage.push("Enter at least one Uppercase letter.");
        }

        if (!password.match(/[0-9]/)){
            errorMessage.push("Enter at least one number.");
        }

        if (!password.match(/[!@#$%&*\-_.+()]/)) {
            errorMessage.push("Enter at least one special character");
        }

        if (password == userID || password.includes(userID)){
            errorMessage.push("Password cannot contain UserID.");
        }

        const pErrorContainer = document.querySelector(".password-message");
        pErrorContainer.innerHTML = errorMessage
            .map(message => `<span>${message}</span><br/>`)
            .join("");
    }

    function validateEnterpass(){
        password1= document.getElementById("password").value;
        password2= document.getElementById("re-enterPass").value;

        if (password1 != password2){
            document.getElementById("password2-error").innerHTML= "Passwords do not match.";
            return false;
        } else {
            document.getElementById("password2-error").innerHTML= "Passwords match! ";
            return true;
        }
    }

    function reviewInput() {
        // Get the form content by ID 'review-button'
        var formcontent = document.getElementById("review-button");

        // Initialize a variable to store the HTML table structure for displaying the form content
        var formoutput = "<table class='output'><th colspan = '3'> Please Review Your Information:</th>";

        // Loop through each form element
        for (let i = 0; i < formcontent.length; i++) {
            // Check if the element has a value (it's not empty)
            if (formcontent.elements[i].value !== "") {
                // Switch based on the element type (checkbox, radio, or others)
                switch (formcontent.elements[i].type) {
                    case "checkbox":
                        // If it's a checkbox and it is checked, add the checkbox to the output table
                        if (formcontent.elements[i].checked) {
                            formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>&#x2713;</td></tr>`;
                        }
                        break;
                    case "radio":
                        // If it's a radio button and it's selected, add the radio choice to the output table
                        if (formcontent.elements[i].checked) {
                            formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                        }
                        break;
                    default:
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                }
            }
        }

        // Close the table tag after all the form content is added
        formoutput += "</table>";

        // Insert the generated table into the HTML element with ID 'showInput'
        document.getElementById("showInput").innerHTML = formoutput;
    }


    function removeReview(){
        document.getElementById("showInput").innerHTML="";
    }



