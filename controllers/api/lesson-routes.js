// lesson routes
const router = require('express').Router();
const Lesson = require('../../models/Lesson');

// this route will build a lesson into whatever language you want 
router.post('/:id', async (req, res) => {
    try {
        const lessonData = await Lesson.findByPk(req.params.id);
        const language = req.body.language;

        const words = lessonData.words.split(',');

        // write code to build lesson with Watson here

        // return Watson generated words/answers pairs here
        let answerKey = [];

        // watson will be used below to fill in language and corresponding word
        for(let i = 0; i < words.length; i++) {
            answerKey.push({ en: words[i], language: ''});
        };

        res.json(answerKey);
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