// IBM WATSON LANGUAGE TRANSLATOR MODEL
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: 'oi1Lv4bmtyQ8AO88j4JOLVE6QeqxDj90kYBcUJctO2hk',
  }),
  url: 'https://api.us-east.language-translator.watson.cloud.ibm.com/instances/e4c66911-df66-44c5-abfa-cf19068d7d4c',
});

module.exports = function(app) {


  // START ALL VOCAB/LANGUAGE RELATED CALLS
 //SET UP NEEDED = VOCAB JS PEND ?
 // NEED ONCLICK TRANSLATE TO STORE FORM VALUES IN OBJECT TO POST TO DB -INDEX?
  app.get('/api/???', (req, res) => {
    db.vocab.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [db.language],
    }).then((data) => {
      res.json(data);
    });
  });

  app.get('/api/???', (req, res) => {
    db.vocab.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [['orig_phrase', 'ASC']],
    }).then((data)=> {
      res.json(data);
    });
  });

  app.get('/api/???', (req, res) => {
    db.language.findAll({}).then((data) => {
      res.json(data);
    });
  });

  app.post('/api/???', (req, res)=> {
    const translateParams = {
      text: req.body.orig_phrase,
      modelId: `${req.body.lang_from}-${req.body.lang_to}`,
    };

    languageTranslator.translate(translateParams)
        .then((translationResult) => {
          db.vocab.create({
            orig_phrase: req.body.orig_phrase,
            translation: translationResult.result.translations[0].translation,
            word_count: translationResult.result.word_count,
            character_count: translationResult.result.character_count,
            from_id: req.body.from_id,
            target_id: req.body.target_id,
            user_id: req.user.id,
          }).then((data)=> {
            res.json(data);
          });
          console.log(JSON.stringify(translationResult, null, 2));
        })
        .catch((err) => {
          console.log('error:', err);
        });
  });

  app.put('api/???', (req, res) => {
    db.vocab.update({
      eng_phrase: req.body.newPhrase,
      translation: req.body.newTranslation,
    }, {
      where: {
        id: req.body.id,
      },
    },
    );
  })}
