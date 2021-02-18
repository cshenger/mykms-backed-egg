const Controller = require('egg').Controller;

class BaseController extends Controller {
  result(data, code = 200, isSuccess = true, message = '操作成功') {
    this.ctx.body = {
      code: code,
      success: isSuccess,
      message: message,
      data
    }
  }
}

module.exports = BaseController;