// Get DOM elements
let emaildom = document.getElementById('email');
let passworddom = document.getElementById('password');
let passwordconfirmdom = document.getElementById('passwordconfirm');
let form = document.getElementById('registerForm');

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload on submit

  // Get and trim input values
  const email = emaildom.value.trim();
  const password = passworddom.value.trim();
  const passwordconfirm = passwordconfirmdom.value.trim();

  console.log('Submit clicked:', { email, password, passwordconfirm });

  // Check if passwords match
  if (password !== passwordconfirm) {
    alert('Passwords do not match!');
    return;
  }

  try {
    // Send registration data to backend
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        passwordconfirm
      })
    });

    // Parse the response
    const result = await response.json();
    console.log('Server Response:', result);

    // Show success or error message
    if (result.success) {
      alert('User registered successfully!');
    } else {
      alert('Registration failed: ' + result.message);
    }
  } catch (err) {
    console.error('Error while registering:', err);
    alert('Something went wrong. See console.');
  }
});
