const i18next = require("i18next");
const path = require('path');
const middleware = require("i18next-http-middleware");
const {ALOWED_LANGUAGE} = require('../constants/GeneralConstant')
const Backend =  require('i18next-fs-backend');
  i18next.use(middleware.LanguageDetector)
  .use(Backend)
  .init({
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}.json')
    },
    preload: [...Object.values(ALOWED_LANGUAGE)],
    detection: {
      order: ['header']
    }
    
});
module.exports = (app) => {
  app.use(
    middleware.handle(i18next)
  );
}