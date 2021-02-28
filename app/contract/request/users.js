'use strict';

module.exports = {
  usersAdd: {
    loginName: {
      type: 'string',
      required: true
    },
    userName: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    roles: {
      type: 'array',
      itemType: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
  }
}