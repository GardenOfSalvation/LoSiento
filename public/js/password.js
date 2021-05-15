async function changePassword(event) {
    event.preventDefault();

    const userId = document.getElementById('user_id').value;
    const currentPassword = document.getElementById('current_password').value;
    const newPassword = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // make sure passwords match
    if(newPassword !== confirmPassword) {
        document.getElementById('error').innerHTML = "Passwords don't match! Try again.";
        return;
    }

    // if passes...update password
    const response = await fetch('/api/user/password', {
        method: 'PUT',
        body: JSON.stringify({
          id: userId,
          current_password: currentPassword,
          new_password: newPassword
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

document.getElementById('password_form').addEventListener('submit', changePassword);