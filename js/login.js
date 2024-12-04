document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === '' || password === '') {
            errorMessage.textContent = 'Username dan password harus diisi.';
            return;
        }

        // If validation passes, submit the form
        this.submit();
    });
    
    // Form Validation and Remember Me Functionality
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission for now

        if (nisnInput.value && namaInput.value && passwordInput.value) {
            // Save the credentials if "Ingat Saya" is checked
            if (rememberCheckbox.checked) {
                localStorage.setItem('remembered', 'true');
                localStorage.setItem('nisn', nisnInput.value);
                localStorage.setItem('nama', namaInput.value);
                localStorage.setItem('password', passwordInput.value);
            } else {
                localStorage.removeItem('remembered');
                localStorage.removeItem('nisn');
                localStorage.removeItem('nama');
                localStorage.removeItem('password');
            }

            // Simulate successful login and redirect
            window.location.href = '../html/dashboard.html';
        } else {
            alert('Harap isi semua kolom!');
        }
    });
});
