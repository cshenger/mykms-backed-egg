'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const {
      ctx,
      app
    } = this;
    const {
      loginName,
      hexPassword
    } = ctx.request.body;
    const {
      user
    } = await ctx.service.login.login(loginName, hexPassword);

    if (user.length === 1 && user[0].loginName === loginName && user[0].hexPassword === hexPassword) {
      const token = ctx.app.jwt.sign({
        ...ctx.request.body
      }, app.config.jwt.secret, {
        expiresIn: '60m'
      });

      ctx.body = {
        code: 200,
        success: true,
        message: '登陆成功',
        data: {
          token: token,
          userId: user[0].id,
          loginName: user[0].loginName,
          userName: user[0].userName,
          userRole: user[0].roles.split(",")
        },
      }
    } else {
      ctx.body = {
        code: 4001,
        success: false,
        message: '登录失败',
        data: null,
      }
    }
  }
}

module.exports = LoginController;