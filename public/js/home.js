// display history on homepage

async function displayHomePage() {
    const response = await fetch('/api/history');

    if (response.ok) {
        let history = await response.json();
        let insertData = '';
        console.log(history)
        history.forEach((entry) => {
            const card = 
            `   
                <div class="bg-white flex m-5">
                <div class="m-4">
                <h2 class="text-l">${entry.user.username}</h2>
                </div>
                <div class="m-4">
                Completed <b>${entry.lesson.title}</b> on ${new Date(entry.date_completed).toLocaleString('en-US', { timeZone: 'EST' })}
                </div>
                </div>
            `;

            insertData += card;
        });

        document.getElementById('insert_content').innerHTML = insertData;

    }
    else {
        document.getElementById('login_message').innerHTML = 'Error. Could not log out.';
    }
}

// call it
displayHomePage();