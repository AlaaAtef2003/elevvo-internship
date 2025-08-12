     const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");
        const successMessage = document.getElementById("success");
        const form = document.getElementById("contactForm");

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            if (validateForm()) {
                successMessage.innerHTML = "Form submitted successfully!";
                successMessage.style.color = "green";
                clearForm();
            }
        });

        function validateForm() {
            let valid = true;
            successMessage.innerHTML = ""; // Clear previous success message
            // Full Name
            if (fullName.value.trim() === "") {
                fullName.nextElementSibling.innerHTML = "Name is required.";
                valid = false;
            } else {
                fullName.nextElementSibling.innerHTML = "";
            }

            // Email
            if (email.value.trim() === "") {
                email.nextElementSibling.innerHTML = "Email is required.";
                valid = false;
            } else if (!email.value.includes("@")) {
                email.nextElementSibling.innerHTML = "Please enter a valid email address.";
                valid = false;
            } else {
                email.nextElementSibling.innerHTML = "";
            }

            // Subject
            if (subject.value.trim() === "") {
                subject.nextElementSibling.innerHTML = "Subject is required.";
                valid = false;
            } else {
                subject.nextElementSibling.innerHTML = "";
            }

            // Message
            if (message.value.trim() === "") {
                message.nextElementSibling.innerHTML = "Message is required.";
                valid = false;
            } else {
                message.nextElementSibling.innerHTML = "";
            }

            return valid;
        }

        function clearForm() {
            fullName.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        }