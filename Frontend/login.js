let login_email = document.getElementById('email-login');
let login_password = document.getElementById("password-login");
let login_submit_button = document.getElementById("login-submit-button");

login_submit_button.addEventListener('click', async () => {
	let email_value = login_email.value.trim();
	let password_value = login_password.value;

	const response = await fetch('http://127.0.0.1:3000/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: email_value, password: password_value})
	});

	const data = await response.json();

	if (response.ok){
	console.log("SUCCESS");
	console.log("Token:", data.token);
	console.log("Redirecting...");
	localStorage.setItem('token', data.token);
	alert("Login Successful");
	window.location.href = 'profile';
	} else {
	console.warn("Login failed:", data);
	alert("Login Failed: " + (data.message || "Unknown error"));
}

})
