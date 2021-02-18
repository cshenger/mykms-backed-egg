'use strict';

const Service = require('egg').Service;
const {
  pages
} = require('../utils/index');

class AlgorService extends Service {
  async list(params) {
    let where = {}
    if (!!params && params.hasOwnProperty('name') && params.name != '') {
      where.name = params.name;
    }
    if (!!params && params.hasOwnProperty('status') && params.status != '') {
      where.status = params.status;
    }
    let searchData = {
      where: where,
    };

    const list = await this.app.mysql.select('algorithm', searchData);
    let pag = pages(params);
    let records = list.slice(pag.start, pag.end);
    records.forEach(item => {
      item.status = Boolean(item.status);
    });

    return {
      records,
      total: list.length
    }
  }

  // 修改状态
  async toggle(subData) {
    const result = await this.app.mysql.update('algorithm', subData);

    if (result.affectedRows === 1) {
      return {
        result
      };
    } else {
      return {
        code: 500,
        success: false,
        message: '更新失败'
      }
    }
  }
}

module.exports = AlgorService;