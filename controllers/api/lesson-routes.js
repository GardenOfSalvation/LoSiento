// lesson routes
const router = require('express').Router();
const Lesson = require('../../models/Lesson');

// import Watson
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

// bring in environment variables
require('dotenv').config();

// configure Watson
const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.LANGUAGE_TRANSLATOR_APIKEY,
  }),
  serviceUrl: process.env.LANGUAGE_TRANSLATOR_URL,
});

// this route will build a lesson into whatever language you want (right now hardcoded to Spanish) http://localhost:3001/lesson/1
router.post('/:id', async (req, res) => {
    try {
        //const language = req.body.language; -- NOT USED RIGHT NOW

        // get lesson data from database
        const lessonData = await Lesson.findByPk(req.params.id);
        const wordsString = lessonData.words;

        console.log(wordsString)

        // send lesson to Watson in JSON format
        const translate = {
            text: JSON.stringify(wordsString),
            modelId: 'en-es',
          };
          
        // query watson, handle response (this took some trial and error)
        languageTranslator.translate(translate)
            .then(translationResult => {
                let results = JSON.parse(translationResult.result.translations[0].translation);
                let formattedResults = results.split(', ');

                // console.log(formattedResults)

                // return Watson generated words/answers pairs here
                let answerKey = [];
                let wordsArray = wordsString.split(',');

                // watson will be used below to fill in language and corresponding word
                for(let i = 0; i < wordsArray.length; i++) {
                    answerKey.push({ en: wordsArray[i], es: formattedResults[i]});
                };

                // send complete lesson back to front end 
                res.json(answerKey);
            })
            .catch(err => {
                console.log('error:', err);
            });
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