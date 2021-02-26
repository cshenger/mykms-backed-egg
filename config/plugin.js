'use strict';

const mysql = {
  enable: true,
  package: 'egg-mysql'
};

const jwt = {
  enable: true,
  package: 'egg-jwt'
};

const email = {
  enable: true,
  package: 'egg-mail',
};

const swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};

/** @type Egg.EggPlugin */
module.exports = {
  mysql,
  jwt,
  email,
  swaggerdoc
};