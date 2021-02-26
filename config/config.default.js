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

  // swaggerdoc
  config.swaggerdoc = {
    dirScanner: "./app/controller", // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: "密钥管理接口文档", // 接口文档的标题。
      description: "通过egg-swagger-doc生成", // 接口文档描述。
      version: "1.0.0", // 接口文档版本。
    },
    schemes: ["http"], // 配置支持的协议。
    consumes: ["application/json"], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: ["application/json"], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: {
      // apikey: {type: "apiKey", name: "clientkey", in: "header",},
      // oauth2: {
      //     type: "oauth2", tokenUrl: "http://petstore.swagger.io/oauth/dialog", flow: "password",
      //     scopes: {
      //         "write:access_token": "write access_token",
      //         "read:access_token": "read access_token",
      //     },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    enableValidate: false, // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  }

  // add your user config here
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};