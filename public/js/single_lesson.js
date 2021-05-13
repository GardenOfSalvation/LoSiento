async function watsonAnswer(event) {
    event.preventDefault();
    const selectedLesson = 1;
    const response = await fetch(`/api/lesson/${selectedLesson}`, {
        method: 'POST'
        });

    if (response.status === 200) {
        console.log('authenticated...');
        document.location.replace('/');
    }
}

