const router = require('express').Router();
const authorizeHelper = require('../utils/auth');
const Lesson = require('../models/Lesson');
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

router.get('/lessons', authorizeHelper, async (req, res) => {
    
    try {
        const dbLessons = await Lesson.findAll();
        const lessons = dbLessons.map((lessonPlans)=>{return {title:lessonPlans.title, id:lessonPlans.id}});
        res.render('all_lessons', {lessons});
    }
    catch(error) {
        res.render('all_lessons', {error});
    }
    });

router.get('/lesson/:id', authorizeHelper, async (req, res) => {
    
   
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
                res.render('single_lesson', {cards:answerKey});
            })
            .catch(err => {
                console.log('error:', err);
                res.render('single_lesson', {error:err});
            });
    }
    catch(error) {
        res.render('single_lesson', {error});
    }
});

module.exports = router;