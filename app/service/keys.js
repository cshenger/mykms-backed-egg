'use strict';
const Service = require('egg').Service;
const {
  createKey
} = require('../utils/keys');
const {
  pages,
  renderWhere,
  selLike
} = require('../utils/index');
const moment = require('moment');

const statusData = [{
    code: 0,
    text: '草稿'
  },
  {
    code: 1,
    text: '待审核'
  },
  {
    code: 2,
    text: '审核通过'
  },
  {
    code: 3,
    text: '审核不通过'
  },
  {
    code: 4,
    text: '已过期'
  }
];

class KeysService extends Service {
  // 密钥状态下拉
  async status() {
    const status = JSON.parse(JSON.stringify(statusData));
    status.pop();
    return status;
  }

  // 密钥列表
  async list(params) {
    let where = renderWhere(params, ["id", "keyName", "algorithmName", "status"]);
    let searchData = {
      where: where
    }
    let list = null;

    if (params.type == 'using') {
      let sql = `select * from theKeys where ${selLike(where, 'id')} and ${selLike(where, 'keyName')} and ${selLike(where, 'algorithmName')} and status <> 4`;
      list = await this.app.mysql.query(sql);
    } else if (params.type == 'history') {
      let sql = `select * from theKeys where ${selLike(where, 'id')} and ${selLike(where, 'keyName')} and ${selLike(where, 'algorithmName')} and ${selLike(where, 'status')}`;
      list = await this.app.mysql.query(sql);
    }

    let pag = pages(params);
    let records = list.slice(pag.start, pag.end);

    const renderList = async () => {
      for (let item of records) {
        for (let i = 0; i < statusData.length; i++) {
          if (item.status == statusData[i].code) {
            item.status = {
              code: statusData[i].code,
              value: statusData[i].text
            }
            break;
          }
        }
        item.createUser = JSON.parse(item.createUser);
        item.createDate = moment(new Date(item.createDate)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        item.deadDate = moment(new Date(item.deadDate)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (item.auditUser) {
          item.auditUser = JSON.parse(item.auditUser);
        }
        if (item.auditDate) {
          item.auditDate = moment(new Date(item.auditDate)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        delete item.mykey;
        delete item.iv;

        let keyUsers = item.keyUser.split(",");
        item.keyUser = [];
        for (let userId of keyUsers) {
          const user = await this.app.mysql.get('users', {
            id: userId
          });
          if (user) {
            item.keyUser.push({
              code: user.id,
              value: user.userName
            });
          }
        }
      }
    }

    await renderList();

    return {
      records,
      total: list.length
    }
  }

  // 查询一个密钥
  async find(id) {
    const key = await this.app.mysql.get('theKeys', {
      id: id
    });

    return {
      key
    }
  }

  // 新增/编辑一个密钥
  async create(params) {
    const keys = await this.app.mysql.select('theKeys');

    let insertData = JSON.parse(JSON.stringify(params));
    if (!params.hasOwnProperty('id')) {
      insertData.id = `keys_${keys.length}_${Math.random().toFixed(8)}`;
      insertData.status = 0;

      const user = await this.app.mysql.get('users', {
        loginName: params.createUser
      });
      insertData.createUser = JSON.stringify({
        code: user.id,
        value: user.userName
      });

      insertData.createDate = this.app.mysql.literals.now;
      let myKey = await createKey(params);
      insertData.mykey = myKey.key;
      insertData.iv = myKey.iv;
    } else {
      const skey = await this.app.mysql.select('theKeys', {
        where: {
          id: insertData.id
        }
      });
      if (skey.way === insertData.way) {
        insertData.mykey = skey.key;
        insertData.iv = skey.iv;
      } else {
        let myKey = await createKey(params);
        insertData.mykey = myKey.key;
        insertData.iv = myKey.iv;
      }
    }

    if (params.hasOwnProperty('id')) {
      // 更新
      const result = await this.app.mysql.update('theKeys', insertData);
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
    } else {
      // 新增
      const result = await this.app.mysql.insert('theKeys', insertData);
      if (result.protocol41) {
        return {
          result
        };
      } else {
        return {
          code: 500,
          success: false,
          message: '添加失败'
        }
      }
    }
  }

  // 删除
  async delete(id) {
    const key = await this.app.mysql.delete('theKeys', {
      id: id
    });
    return {
      key
    }
  }

  // 提交
  async send(params) {
    let subData = {
      id: params.sendId,
      status: 1
    }
    const user = await this.app.mysql.get('users', {
      id: params.auditer
    });
    if (user) {
      subData.auditUser = JSON.stringify({
        code: user.id,
        value: user.userName
      });
    }

    const result = await this.app.mysql.update('theKeys', subData);

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

  // 审核
  async audit(params) {
    const {
      app
    } = this;
    let subData = {
      id: params.id,
      status: params.result,
      reason: params.reason,
      auditDate: app.mysql.literals.now
    }

    const result = await this.app.mysql.update('theKeys', subData);

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

  // 用户可操作性密钥
  async userKeys(params) {
    const user = await this.app.mysql.get('users', {
      loginName: params.loginName
    });
    // console.log('user: ', user);
    let sql = `select id,keyName from theKeys where keyUser like "%${user.id}%" and status=2`;
    const list = await this.app.mysql.query(sql);
    return list;
  }
}

module.exports = KeysService;