const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: 'a3cd8b6a-5c30-45b9-8b75-527b1b618ac1',
  }),
  url: 'https://api.us-south.language-translator.watson.cloud.ibm.com',
});

module.exports = function(app) {