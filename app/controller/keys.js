const BaseController = require('./base');
const {
  secret
} = require('../../config/others');

/**
 * @controller 密钥管理
 */
class KeysController extends BaseController {
  // 状态列表
  /**
   * @summary 状态列表
   * @description 密钥状态下拉
   * @router get /api/keys/status
   * @request path
   * @response 200 keysStatus 返回结果
   */
  async status() {
    const result = await this.ctx.service.keys.status();
    this.result(result);
  }

  // 数据列表
  /**
   * @summary 数据列表
   * @description 获取密钥数据列表
   * @router get /api/keys/list
   ** @request query string keyName 密钥名称
   ** @request query string status 密钥状态
   ** @request query string algorithmName 使用算法
   ** @request query string type 当前库还是历史库
   * @response 200 keysList 返回结果
   */
  async list() {
    const ctx = this.ctx;
    const params = ctx.query;
    const records = await ctx.service.keys.list(params);
    this.result(records);
  }

  // 查询一个密钥
  /**
   * @summary 密钥查询
   * @description 单个密钥信息查询
   * @router get /api/keys/key
   * @request query string * id 密钥ID
   * @response 200 resultKey 返回结果
   */
  async info() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const key = await ctx.service.keys.find(id);
    this.result(key);
  }

  // 新增/编辑
  /**
   * @summary 新增密钥
   * @description 新增一条密钥
   * @Router post /api/keys/add
   * @Request body keysAdd * body
   * @Response 200 baseRespnse 返回结果
   */
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

  /**
   * @summary 编辑密钥
   * @description 编辑一条密钥
   * @Router put /api/keys/update
   * @Request body keysEdit * body
   * @Response 200 baseRespnse 返回结果
   */
  async _update() {}

  // 删除
  /**
   * @summary 删除密钥
   * @description 删除一条密钥
   * @Router delete /api/keys/delete
   * @Request body string id * 删除密钥的id
   * @Response 200 baseRespnse 返回结果
   */
  async delete() {
    const key = await this.ctx.service.keys.delete(this.ctx.query.id);
    this.result(null, 200, true, '删除成功');
  }

  // 提交
  /**
   * @summary 提交密钥
   * @description 提交一条密钥
   * @Router put /api/keys/send
   * @Request body keysSend * body
   * @Response 200 baseRespnse 返回结果
   */
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
  /**
   * @summary 审核密钥
   * @description 审核一条密钥
   * @Router put /api/keys/audit
   * @Request body keysAudit * body
   * @Response 200 baseRespnse 返回结果
   */
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
  /**
   * @summary 用户可操作密钥
   * @description 查询密钥使用人用户可操作密钥列表
   * @router get /api/keys/userKeys
   * @request path
   * @response 200 userKeys 返回结果
   */
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