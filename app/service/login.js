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

  async changeUserToken(params) {
    const user = await this.app.mysql.get('usertokens', {
      id: params.id
    });

    let result = null;

    if (user) {
      result = await this.app.mysql.update('usertokens', params);
    } else {
      result = await this.app.mysql.insert('usertokens', params);
    }

    return result;
  }
}

module.exports = LoginService;