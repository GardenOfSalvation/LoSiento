// lesson routes
const router = require('express').Router();
const Lesson = require('../../models/Lesson');

// this route will build a lesson into whatever language you want 
router.post('/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id);
        const language = req.body.language;

        // write code to build lesson with Watson here

        // return Watson generated words/answers pairs here
        let test = [
            {message: `${language} quiz generated using IBM's Watson!`},
            {english: "cat", spanish: "el gato"},
            {english: "dog", spanish: "el perro"},
            {english: "mouse", spanish: "el gato"},
            {english: "bird", spanish: "el perro"},
            {english: "rabbit", spanish: "el perro"}
        ];

        res.json(test);
    }
    catch(error) {
        res.json(error);
    }
});

// this route returns all lessons
router.get('/', async (req, res) => {
    try {
        const lesson = await Lesson.findAll();

        res.json(lesson);
    }
    catch(error) {
        res.json(error);
    }
});

module.exports = router;