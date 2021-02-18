const BaseController = require('./base');
const {
  secret
} = require('../../config/others');

class KeysController extends BaseController {
  // 状态列表
  async status() {
    const result = await this.ctx.service.keys.status();
    this.result(result);
  }

  // 数据列表
  async list() {
    const ctx = this.ctx;
    const params = ctx.query;
    const records = await ctx.service.keys.list(params);
    this.result(records);
  }

  // 查询一个密钥
  async info() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const key = await ctx.service.keys.find(id);
    this.result(key);
  }

  // 新增/编辑
  async create() {
    const ctx = this.ctx;
    const token = ctx.request.header.authorization;
    const decode = ctx.app.jwt.verify(token, secret);
    const body = ctx.request.body;
    if (!body.id) {
      body.createUser = decode.loginName;
    }
    const result = await ctx.service.keys.create(body);
    if (!!result.code && result.code != 200) {
      this.result(null, result.code, result.success, result.message);
    } else {
      this.result(result);
    }
  }

  // 删除
  async delete() {
    const key = await this.ctx.service.keys.delete(this.ctx.query.id);
    this.result(null, 200, true, '删除成功');
  }

  // 提交
  async send() {
    const body = this.ctx.request.body;
    const result = await this.ctx.service.keys.send(body);
    if (!!result.code && result.code != 200) {
      this.result(null, result.code, result.success, result.message);
    } else {
      this.result(result);
    }
  }

  // 审核
  async audit() {
    const body = this.ctx.request.body;
    const result = await this.ctx.service.keys.audit(body);
    if (!!result.code && result.code != 200) {
      this.result(null, result.code, result.success, result.message);
    } else {
      this.result(result);
    }
  }

  // 用户可操作密钥
  async userKeys() {
    const ctx = this.ctx;
    const token = ctx.request.header.authorization;
    const decode = ctx.app.jwt.verify(token, secret);
    let params = {
      loginName: decode.loginName
    }
    const result = await this.ctx.service.keys.userKeys(params);
    this.result(result);
  }
}

module.exports = KeysController;