'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login(loginName, hexPassword) {
    const user = await this.app.mysql.select('users', {
      where: {
        loginName: loginName,
        hexPassword: hexPassword
      }
    });

    return {
      user
    }
  }
}

module.exports = LoginService;