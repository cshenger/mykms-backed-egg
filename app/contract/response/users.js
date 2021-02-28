'use strict';

module.exports = {
  usersList: {
    records: {
      type: 'array',
      itemType: 'usersListModel'
    }
  },

  usersUser: {
    id: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    hexPassword: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    loginName: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    roles: {
      type: 'string'
    },
    userName: {
      type: 'string'
    },
  },

  // usersAudits = {
  //   id: {
  //     type: 'string'
  //   },
  //   loginName: {
  //     type: 'string'
  //   },
  //   userName: {
  //     type: 'string'
  //   },
  // }
}