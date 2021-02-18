const BaseController = require('./base');

class UsersController extends BaseController {
  // 查询列表
  async list() {
    const ctx = this.ctx;
    const params = ctx.query;
    const records = await ctx.service.users.list(params);
    this.result(records);
  }

  // 插入数据
  async create() {
    const {
      ctx,
      app
    } = this;
    const body = ctx.request.body;
    const result = await ctx.service.users.create(body);
    if (!!result.code && result.code != 200) {
      this.result(null, result.code, result.success, result.message);
    } else {
      // 发送邮件
      const {
        roles
      } = await ctx.service.home.roles();
      let title = body.id ? '修改' : '创建';
      let rolesText = "";
      let userRoles = body.roles;
      userRoles.forEach(id => {
        for (let i = 0; i < roles.length; i++) {
          if (id == roles[i].code) {
            rolesText += `${roles[i].text}, `;
            break;
          }
        }
      });
      // console.log(body.email);

      const mailresult = await app.email.sendEmail(
        `账号${title}成功`,
        `您的账号已${title}成功`,
        `${body.email}`,
        [{
          data: `<html>
            <p>您的账户已${title}成功</p>
            <p>登录名：<b>${body.loginName}</b></p>
            <p>密码：<b>${body.password}</b></p>
            <p>角色：<b>${rolesText}</b></p>
            <p>如有疑问请联系管理员</p>
            </html>`,
          alternative: true
        }]
      );
      this.result(mailresult);
    }
  }

  // 查询具体用户
  async info() {
    const ctx = this.ctx;
    const userId = ctx.query.id;
    const user = await ctx.service.users.find(userId);
    this.result(user);
  }

  // 删除用户
  async delete() {
    const user = await this.ctx.service.users.delete(this.ctx.query.id);
    this.result(null, 200, true, '删除成功');
  }

  // 查找审核人
  async auditList() {
    const users = await this.ctx.service.users.auditList();
    this.result(users);
  }

  // 查找使用人
  async userList() {
    const users = await this.ctx.service.users.userList();
    this.result(users);
  }
}

module.exports = UsersController;