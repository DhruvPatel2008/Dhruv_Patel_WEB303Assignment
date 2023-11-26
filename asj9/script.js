document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const country = document.getElementById('country');
    const submitButton = document.getElementById('submitButton');
    const message = document.getElementById('message');
    const form = document.getElementById('registrationForm');

    const validateForm = () => {
        const isUsernameValid = username.value.trim() !== '';
        const isPasswordValid = password.value.length >= 12;
        const isPasswordMatch = password.value === confirmPassword.value;
        const isTermsChecked = terms.checked;
        const isCountrySelected = country.value !== '';

        submitButton.disabled = !(isUsernameValid && isPasswordValid && isPasswordMatch && isTermsChecked && isCountrySelected);
    };

    [username, password, confirmPassword, terms, country].forEach(element => {
        element.addEventListener('input', validateForm);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        message.textContent = `Welcome ${username.value}! The country code you selected is ${country.value}`;
    });
});
