let login_email = document.getElementById('email-login');
let login_password = document.getElementById("password-login");
let login_submit_button = document.getElementById("login-submit-button");

login_submit_button.addEventListener('click', async (e) => {
	e.preventDefault();

	let email_value = login_email.value.trim();
	let password_value = login_password.value;

	console.log("Submitting login", email_value, password_value);

	try {
		const response = await fetch('http://127.0.0.1:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email_value, password: password_value })
		});

		console.log("Received response", response);

		const data = await response.json();
		console.log("Parsed JSON:", data);

		if (response.ok) {
			console.log("Login success. Saving token and redirecting...");
			localStorage.setItem('token', data.token);
			alert("Login Successful");
			window.location.href = 'profile.html'; // <- Does this file exist?
		} else {
			console.warn("Login failed:", data);
			alert("Login Failed: " + (data.message || "Unknown error"));
		}
	} catch (err) {
		console.error("Error in login flow:", err);
		alert("Something went wrong during login");
	}
});
