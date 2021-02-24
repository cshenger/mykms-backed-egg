'use strict';

const Service = require('egg').Service;
const {
  pages,
  getMd5Data,
  sqlPa
} = require('../utils/index');

class UsersService extends Service {
  // 获取列表
  async list(params) {
    let where = {}
    if (!!params && params.hasOwnProperty('loginName') && params.loginName != '') {
      where.loginName = params.loginName;
    }
    let searchData = {
      where: where,
    };
    const {
      m,
      n
    } = sqlPa(params);

    // 查询权限表
    const roles = await this.app.mysql.select("roles");

    // const records = await this.app.mysql.select('users', searchData);
    // let sql = `select id, loginName, userName, roles from users where loginName like "%${where.hasOwnProperty('loginName') ? where.loginName : ''}%" LIMIT ${searchData.offset||0}, ${searchData.limit||users.length}`;
    // let sql = `select id, loginName, userName, roles from users where loginName like "%${where.hasOwnProperty('loginName') ? where.loginName : ''}%"`;
    let sqlWhere = `loginName like "%${where.hasOwnProperty('loginName') ? where.loginName : ''}%"`;
    let sql = `select id, loginName, userName, roles, (SELECT count(*) FROM users where ${sqlWhere}) AS total from users where ${sqlWhere} limit ${m},${n}`;
    const list = await this.app.mysql.query(sql);
    let pag = pages(params);
    // let records = list.slice(pag.start, pag.end);
    let records = list;

    records.forEach(user => {
      let userRoles = user.roles.split(",");
      user.fullRoles = [];
      for (let i = 0; i < roles.length; i++) {
        if (userRoles.includes(roles[i].code)) {
          user.fullRoles.push(roles[i]);
        }
      }
    });

    return {
      records,
      // total: records.length
      total: list.length > 0 ? list[0].total : 0
    }
  }

  // 插入/修改一条数据
  async create(params) {
    const users = await this.app.mysql.select('users');
    let insertData = JSON.parse(JSON.stringify(params));
    insertData.roles = insertData.roles.join(",");
    insertData.hexPassword = getMd5Data(params.password);
    if (!params.hasOwnProperty('id')) {
      insertData.id = `user_${users.length}_${Math.random().toFixed(5)}`;
    }

    const findUsers = await this.app.mysql.select('users', {
      where: {
        loginName: params.loginName
      }
    });
    // console.log('findUsers: ', findUsers);

    if (params.hasOwnProperty('id')) {
      // 更新操作
      if (findUsers.length === 0 || (findUsers.length === 1 && findUsers[0].id === params.id)) {
        const result = await this.app.mysql.update('users', insertData);
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
        return {
          code: 4001,
          success: false,
          message: '登录名重复'
        }
      }
    } else {
      // 新增操作
      if (findUsers.length > 0) {
        return {
          code: 4001,
          success: false,
          message: '登录名已存在'
        }
      } else {
        const result = await this.app.mysql.insert('users', insertData);
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
  }

  // 查询单个数据
  async find(id) {
    const user = await this.app.mysql.get('users', {
      id: id
    });
    return {
      user
    }
  }

  // 删除
  async delete(id) {
    const user = await this.app.mysql.delete('users', {
      id: id
    });
    return {
      user
    }
  }

  // 查找审核人
  async auditList() {
    let sql = `select id, loginName, userName from users where roles like "%keyAudit%"`;
    const list = await this.app.mysql.query(sql);
    return list;
  }

  // 查找使用人
  async userList() {
    let sql = `select id, loginName, userName from users where roles like "%keyUser%"`;
    const list = await this.app.mysql.query(sql);
    return list;
  }

  // 修改密码
  async editPassword(params) {
    const user = await this.app.mysql.get('users', {
      id: params.userId
    });
    if (user.password !== params.oldPass) {
      return {
        code: 500,
        success: false,
        message: '旧密码有误'
      }
    } else {
      let insertData = {
        id: params.userId,
        password: params.newPass,
        hexPassword: getMd5Data(params.newPass)
      }
      const result = await this.app.mysql.update('users', insertData);
      if (result.affectedRows === 1) {
        return result;
      } else {
        return {
          code: 500,
          success: false,
          message: '更新失败'
        }
      }
    }
  }
}

module.exports = UsersService;