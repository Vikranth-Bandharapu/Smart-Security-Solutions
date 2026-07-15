// Authentication and Form Validation Logic

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Utility: Show Error
    const showError = (input, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-msg');
        if(errorMsg) errorMsg.innerText = message;
    };

    // Utility: Clear Error
    const clearError = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    };

    // Utility: Validate Email
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Login Handling
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const role = document.getElementById('role');
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            [email, password].forEach(clearError);

            if (!email.value.trim() || !isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                valid = false;
            }

            if (!password.value.trim() || password.value.length < 6) {
                showError(password, 'Password must be at least 6 characters.');
                valid = false;
            }

            if (valid) {
                // Simulate Login Role Redirect
                const selectedRole = role.value;
                localStorage.setItem('loggedInEmail', email.value.trim());
                
                if (selectedRole === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else if (selectedRole === 'manager') {
                    window.location.href = 'manager-dashboard.html';
                } else {
                    window.location.href = 'client-dashboard.html';
                }
            }
        });
    }

    // Signup Handling
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const fullname = document.getElementById('fullname');
            const company = document.getElementById('company');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');

            [fullname, company, email, phone, password, confirmPassword].forEach(clearError);

            if (!fullname.value.trim()) {
                showError(fullname, 'Full name is required.');
                valid = false;
            }

            if (!email.value.trim() || !isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                valid = false;
            }

            if (!phone.value.trim() || phone.value.length < 10) {
                showError(phone, 'Please enter a valid phone number.');
                valid = false;
            }

            if (!password.value.trim() || password.value.length < 6) {
                showError(password, 'Password must be at least 6 characters.');
                valid = false;
            }

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match.');
                valid = false;
            }

            if (valid) {
                alert('Account created successfully! Redirecting to login...');
                window.location.href = 'login.html';
            }
        });
    }
});
