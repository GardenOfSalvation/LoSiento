async function changeUsername(event) {
    event.preventDefault();

    const userId = document.getElementById('user_id').value;
    const password = document.getElementById('current_password').value;
    const newUsername = document.getElementById('new_username').value;

    // if passes...update Username
    const response = await fetch('/api/user/name', {
        method: 'PUT',
        body: JSON.stringify({
          id: userId,
          password: password,
          username: newUsername
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/user');
      } else {
        // change this later 
        document.getElementById('error').innerHTML = "There was a problem. Try again.";
      }
}

document.getElementById('username_form').addEventListener('submit', changeUsername);