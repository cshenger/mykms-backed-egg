'use strict';

const Service = require('egg').Service;
const {
  pages,
  renderWhere,
  selLike,
  sqlPa
} = require('../utils/index');
const moment = require('moment');

class OperaLogService extends Service {
  async list(params) {
    let where = renderWhere(params, ["userId", "method", "action"]);
    let searchData = {
      where: where
    };
    const {
      m,
      n
    } = sqlPa(params);

    let operaDateSql = !!params.startTime ? `and operaDate>='${params.startTime}' and operaDate<='${params.endTime}'` : "";
    let sqlWhere = `${selLike(where, 'userId')} and ${selLike(where, 'method')} and ${selLike(where, 'action')} ${operaDateSql}`;
    let sql = `select * ,( SELECT count(*) FROM operaLog where ${sqlWhere} order by operaDate desc) AS total from operaLog where ${sqlWhere} order by operaDate desc limit ${m},${n}`;
    console.log(sql);
    let list = await this.app.mysql.query(sql);
    let records = list;

    const renderList = async () => {
      for (let item of records) {
        item.operaDate = moment(new Date(item.operaDate)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    }
    await renderList();

    return {
      records,
      // total: list.length > 0 ? list[0].total : 0
      // total: list.length
    }
  }
}

module.exports = OperaLogService;