'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 登录
 */

class LoginController extends Controller {
  /**
   * @summary 登录
   * @description 密钥系统登录
   * @Router post /api/login
   * @Request body theLogin * body
   * @Response 200 theLogin 返回结果
   */

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

      let insertData = {
        token: token,
        userId: user[0].id,
        loginName: user[0].loginName,
        userName: user[0].userName,
        userRole: user[0].roles.split(",")
      }

      let userTokenData = JSON.parse(JSON.stringify(insertData));
      userTokenData.id = userTokenData.userId;
      delete userTokenData.userId;
      userTokenData.userRole = userTokenData.userRole.join(",");

      await ctx.service.login.changeUserToken(userTokenData);

      // 插入操作文档
      await ctx.service.home.addOperaLog({
        loginName: user[0].loginName,
        userName: user[0].userName,
        userId: user[0].id,
        url: '/app/login',
        method: 'POST',
        action: '登录',
        status: 1
      });

      ctx.body = {
        code: 200,
        success: true,
        message: '登陆成功',
        data: insertData,
      }
    } else {
      // 插入操作文档
      await ctx.service.home.addOperaLog({
        loginName: loginName,
        userName: "",
        userId: "",
        url: '/app/login',
        method: 'POST',
        action: '登录',
        status: 0
      });

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