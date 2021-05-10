let words = [
    'cat',
    'dog',
    'mouse',
    'bird',
    'rabbit',
];

console.log(JSON.stringify(words));

var string = `["cat","dog","mouse","bird","rabbit"]`;

let testArray = JSON.parse(string);

console.log(testArray[1]);