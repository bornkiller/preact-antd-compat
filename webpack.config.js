/**
 * @description - webpack config entry
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

module.exports = function (env) {
  switch (env.NODE_ENV) {
    case 'production':
    case 'prod':
      return require('./conf/webpack.prod');
    case 'dev':
    case 'develop':
      return require('./conf/webpack.dev');
  }
};
