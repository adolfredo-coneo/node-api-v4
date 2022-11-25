import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'dev';

let envConfig = {};

switch (stage) {
  case 'production':
    envConfig = require('./prod').default;
    break;
  case 'testing':
    envConfig = require('./testing').default;
    break;
  default:
    envConfig = require('./dev').default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'testing',
    port: process.env.PORT,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
