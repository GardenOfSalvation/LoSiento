async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json'  },
    });

    if (response.ok) {
        location.reload();
    }
    else {
        document.getElementById('login_message').innerHTML = 'Error. Could not log out.';
    }
}

if(document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', logout);
}