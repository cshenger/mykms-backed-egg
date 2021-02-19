'use strict';
const Service = require('egg').Service;
const moment = require('moment');

const statusDict = {
  0: '草稿',
  1: '待审核',
  2: '审核通过',
  3: '审核不通过',
  4: '已过期',
};

// 每月密钥趋势
function getMonthDays(year, month) {
  var thisDate = new Date(year, month, 0); //当天数为0 js自动处理为上一月的最后一天
  return thisDate.getDate();
}

class DashboardService extends Service {
  // 获取用户分布
  async userroles() {
    const roles = await this.app.mysql.select("roles");
    const users = await this.app.mysql.select("users");

    let roleData = {};
    roles.forEach(role => {
      roleData[role.code] = role.text;
    });

    let data = [];
    users.forEach(user => {
      let userRoles = user.roles.split(",");
      userRoles.forEach(roleId => {
        if (data.some((site) => {
            return site.code == roleId
          })) {
          for (let site of data) {
            if (site.code == roleId) {
              site.value += 1;
              break;
            }
          }
        } else {
          data.push({
            value: 1,
            name: roleData[roleId],
            code: roleId
          });
        }
      });
    });

    return data;
  }

  // 待办事项
  async todoList(params) {
    const user = await this.app.mysql.get('users', {
      loginName: params.loginName
    });
    const roles = user.roles.split(',');
    const todos = [];

    // 密钥管理员
    const getAdminTodo = async () => {
      let sql = `select * from theKeys where createUser like "%${user.id}%"`;
      let keys = await this.app.mysql.query(sql);
      let now = Date.now();

      keys = keys.filter((key) => {
        let deadTime = new Date(key.deadDate).getTime();
        let jet = parseInt(deadTime) - parseInt(now);
        return jet >= 0 && jet <= 1000 * 60 * 60 * 24;
      });

      keys.forEach(key => {
        todos.push({
          id: key.id,
          text: `${key.keyName} 密钥还有一天就要过期了，请尽快处理。`,
          activeKey: 'using',
        })
      });
    };

    // 密钥审核员
    const getAuditTodo = async () => {
      let sql = `select * from theKeys where auditUser like "%${user.id}%" and status=1`;
      let keys = await this.app.mysql.query(sql);
      keys.forEach(key => {
        todos.push({
          id: key.id,
          text: `${key.keyName} 密钥尚未审核，请尽快审核。`,
          activeKey: 'using',
        });
      });
    };
    const getUserTodo = async () => {
      let sql = `select * from theKeys where keyUser like "%${user.id}%" and status=4`;
      let keys = await this.app.mysql.query(sql);
      keys.forEach(key => {
        todos.push({
          id: key.id,
          text: `${key.keyName} 密钥已过期不可使用。`,
          activeKey: 'history',
        });
      });
    };

    // 根据不同角色获取不同列表
    for (let role of roles) {
      if (role == 'keyAdmin') {
        await getAdminTodo();
      } else if (role == 'keyAudit') {
        await getAuditTodo();
      } else if (role == 'keyUser') {
        await getUserTodo();
      }
    }

    return todos;
  }

  // 算法密钥分布
  async algorKeys(params) {
    let keys = null;

    if (params && !!params.createUser) {
      let sql = `select * from theKeys where createUser like "%${params.createUser}%"`;
      keys = await this.app.mysql.query(sql);
    } else {
      keys = await this.app.mysql.select("theKeys");
    }

    let data = [];
    keys.forEach(key => {
      if (data.some((site) => {
          return site.name == key.way
        })) {
        for (let site of data) {
          if (site.name == key.way) {
            site.value += 1;
            break;
          }
        }
      } else {
        data.push({
          value: 1,
          name: key.way
        });
      }
    });

    return data;
  }

  // 密钥状态统计
  async statusKeys(params) {
    let keys = null;

    if (params && !!params.auditUser) {
      let sql = `select * from theKeys where auditUser like "%${params.auditUser}%"`;
      keys = await this.app.mysql.query(sql);
    } else {
      keys = await this.app.mysql.select("theKeys");
    }

    let data = [];
    keys.forEach(key => {
      if (data.some((site) => {
          return site.status == key.status
        })) {
        for (let site of data) {
          if (site.status == key.status) {
            site.value += 1;
            break;
          }
        }
      } else {
        data.push({
          value: 1,
          name: statusDict[key.status],
          status: key.status
        });
      }
    });

    return data;
  }

  // 密钥日期趋势
  async keysMonth(params) {
    let days = getMonthDays(parseInt(params.year), parseInt(params.month));
    let xData = [];
    for (let i = 0; i < days; i++) {
      xData.push(`${params.year}-${params.month}-${i+1 > 9 ? i+1 : '0'+(i+1)}`);
    }

    let yData = [];
    for (let i = 0; i < days; i++) {
      yData.push(0);
    }

    let keys = null;
    if (params && !!params.createUser) {
      let sql = `select * from theKeys where createUser like "%${params.createUser}%"`;
      keys = await this.app.mysql.query(sql);
    } else {
      keys = await this.app.mysql.select("theKeys");
    }

    keys.forEach(key => {
      let date = moment(new Date(key.createDate)).format("YYYY-MM-DD");
      if (xData.indexOf(date) != -1) {
        yData[xData.indexOf(date)] += 1;
      }
    });

    return {
      xData,
      yData
    };
  }
}

module.exports = DashboardService;