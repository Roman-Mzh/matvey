'use strict';
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('./src/index');
} else {
  require('./dist/index');
}