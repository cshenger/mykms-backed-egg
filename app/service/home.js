'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  // 获取角色
  async roles() {
    const roles = await this.app.mysql.select('roles');
    return {
      roles
    };
  }

  // 获取算法下拉
  async algors() {
    const algorithm = await this.app.mysql.select('algorithm');
    const algors = [];
    algorithm.forEach(item => {
      if (!algors.includes(item.name)) {
        algors.push(item.name);
      }
    });

    return algors
  }

  // 获取所有算法模式
  async allAlgorWays() {
    const list = await this.app.mysql.select('algorithm');
    const ways = [];
    list.forEach((algor, algorIndex) => {
      if (ways.some((way) => {
          return way.title == algor.name
        })) {
        ways.forEach(way => {
          if (way.title == algor.name && algor.status == 1) {
            way.children.push({
              title: algor.alias,
              value: algor.way,
              key: algor.way,
              algorithmName: algor.name,
              mode: algor.mode,
              length: algor.length
            })
          }
        });
      } else {
        if (algor.status == 1) {
          ways.push({
            title: algor.name,
            value: algor.name,
            key: algor.name,
            disabled: true,
            children: [{
              title: algor.alias,
              value: algor.way,
              key: algor.way,
              algorithmName: algor.name,
              mode: algor.mode,
              length: algor.length
            }]
          })
        }
      }
    });

    return ways;
  }

  // 获取所有用户
  async users() {
    let sql = `select id, userName from users`;
    const users = await this.app.mysql.query(sql);
    return users;
  }

  // 获取密钥管理员用户
  async keyAdminUsers() {
    let sql = `select id, userName from users where roles like "%keyAdmin%"`;
    const users = await this.app.mysql.query(sql);
    return users;
  }

  // 获取密钥审核员用户
  async keyAuditUsers() {
    let sql = `select id, userName from users where roles like "%keyAudit%"`;
    const users = await this.app.mysql.query(sql);
    return users;
  }
}

module.exports = HomeService;