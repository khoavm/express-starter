const middlewares = [require('./parser'),require('./i18n'),require('./security'), require('./router') ];


module.exports = app => middlewares.forEach( middleware => middleware(app));