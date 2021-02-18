/* eslint valid-jsdoc: "off" */
'use strict';

const {
  secret
} = require('./others');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612513248734_2913';

  // add your middleware config here
  config.middleware = [];

  // mysql
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '1234567',
      database: 'MYKMS',
    },
    app: true,
    agent: false,
  }

  // jwt
  config.jwt = {
    secret: secret
  }

  // email
  config.email = {
    user: '1534739331@qq.com',
    password: 'qaurwlgawczubace',
    host: 'smtp.qq.com',
    sender: '陈晟 <1534739331@qq.com>'
  }

  // 临时关闭token
  config.security = {
    csrf: {
      enable: false
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};