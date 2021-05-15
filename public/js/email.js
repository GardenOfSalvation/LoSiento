async function changeEmail(event) {
    event.preventDefault();

    const userId = document.getElementById('user_id').value;
    const password = document.getElementById('current_password').value;
    const newEmail = document.getElementById('new_email').value;
    const confirmEmail = document.getElementById('confirm_email').value;

    // make sure emails match
    if(newEmail !== confirmEmail) {
        document.getElementById('error').innerHTML = "Email addresses don't match! Try again.";
        return;
    }

    // if passes...update email
    const response = await fetch('/api/user/email', {
        method: 'PUT',
        body: JSON.stringify({
          id: userId,
          password: password,
          email: newEmail
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

document.getElementById('email_form').addEventListener('submit', changeEmail);