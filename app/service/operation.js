'use strict';
const {
  keyWrite,
  decipherKey
} = require('../utils/keys')

const Service = require('egg').Service;

class OperationService extends Service {
  async submit(params) {
    const key = await this.app.mysql.get('theKeys', {
      id: params.theKey
    });
    let result = "";

    if (params.way == '1') {
      // 加密
      result = await keyWrite(key, params.inputer);
    } else if (params.way == '0') {
      // 解密
      result = await decipherKey(key, params.inputer);
    }

    return result;
  }
}

module.exports = OperationService;