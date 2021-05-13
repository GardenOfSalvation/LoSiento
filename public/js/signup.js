async function signupUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const email = document.getElementById('email').value;

    if(password !== password2) {
      document.getElementById('error_message').innerHTML = 'Passwords need to match!';
      
      return;
    }

    const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        document.location.replace('/');
      } else {
        // display error message 
        document.getElementById('error_message').innerHTML = 'Error creating user!';
      }
}

document.getElementById('signup_form').addEventListener('click', signupUser);