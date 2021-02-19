'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const baseURL = '/api'

module.exports = app => {
  const {
    router,
    controller,
    middleware,
    config
  } = app;
  const jwt = middleware.jwt(config.jwt);

  router.get('/', controller.home.index);

  // 一些查询
  router.get(`${baseURL}/dict/roles`, controller.home.roles);
  router.get(`${baseURL}/dict/algors`, controller.home.algors);
  router.get(`${baseURL}/dict/allAlgorWays`, controller.home.allAlgorWays);
  router.get(`${baseURL}/dict/users`, controller.home.users);
  router.get(`${baseURL}/dict/keyAdminUsers`, controller.home.keyAdminUsers);
  router.get(`${baseURL}/dict/keyAuditUsers`, controller.home.keyAuditUsers);

  // 登录
  router.post(`${baseURL}/login`, controller.login.login);

  // 首页
  router.get(`${baseURL}/dashboard/userroles`, jwt, controller.dashboard.userroles);
  router.get(`${baseURL}/dashboard/todoList`, jwt, controller.dashboard.todoList);
  router.get(`${baseURL}/dashboard/algorKeys`, jwt, controller.dashboard.algorKeys);
  router.get(`${baseURL}/dashboard/statusKeys`, jwt, controller.dashboard.statusKeys);
  router.get(`${baseURL}/dashboard/keysMonth`, jwt, controller.dashboard.keysMonth);

  // 账户管理
  router.get(`${baseURL}/users/list`, jwt, controller.users.list);
  router.get(`${baseURL}/users/user`, jwt, controller.users.info);
  router.post(`${baseURL}/users/add`, jwt, controller.users.create);
  router.put(`${baseURL}/users/update`, jwt, controller.users.create);
  router.delete(`${baseURL}/users/delete`, jwt, controller.users.delete);
  router.get(`${baseURL}/users/auditList`, jwt, controller.users.auditList);
  router.get(`${baseURL}/users/userList`, jwt, controller.users.userList);

  // 算法管理
  router.get(`${baseURL}/algor/list`, jwt, controller.algor.list);
  router.put(`${baseURL}/algor/toggle`, jwt, controller.algor.toggle);

  // 密钥管理
  router.get(`${baseURL}/keys/status`, controller.keys.status);
  router.get(`${baseURL}/keys/list`, jwt, controller.keys.list);
  router.get(`${baseURL}/keys/key`, jwt, controller.keys.info);
  router.post(`${baseURL}/keys/add`, jwt, controller.keys.create);
  router.put(`${baseURL}/keys/update`, jwt, controller.keys.create);
  router.delete(`${baseURL}/keys/delete`, jwt, controller.keys.delete);
  router.put(`${baseURL}/keys/send`, jwt, controller.keys.send);
  router.put(`${baseURL}/keys/audit`, jwt, controller.keys.audit);
  router.get(`${baseURL}/keys/userKeys`, jwt, controller.keys.userKeys);

  // 操作使用
  router.post(`${baseURL}/operation/submit`, jwt, controller.operation.submit);
};