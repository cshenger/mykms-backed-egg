'use strict';

exports.usersListModel = {
  id: {
    type: 'string'
  },
  loginName: {
    type: 'string'
  },
  roles: {
    type: 'string'
  },
  total: {
    type: 'number'
  },
  userName: {
    type: 'string'
  },
};

exports.usersAudit = {
  id: {
    type: 'string'
  },
  loginName: {
    type: 'string'
  },
  userName: {
    type: 'string'
  },
};