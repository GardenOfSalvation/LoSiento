
fetch('https://api.us-east.language-translator.watson.cloud.ibm.com/instances/e4c66911-df66-44c5-abfa-cf19068d7d4c')
.then(response => response.json())
.then(data => console.log(data));