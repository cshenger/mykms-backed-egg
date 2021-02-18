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

/** @type Egg.EggPlugin */
module.exports = {
  mysql,
  jwt,
  email
};