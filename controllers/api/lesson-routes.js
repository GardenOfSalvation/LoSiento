// lesson routes

const router = require('express').Router();
const Lesson = require('../../models/Lesson');

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
        ];

        res.json(test);
    }
    catch(error) {
        res.json(error);
    }
});

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