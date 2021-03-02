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
  },

  usersEdit: {
    id: {
      type: 'string',
      required: true
    },
    ...this.usersAdd
  },

  editPassword: {
    userId: {
      type: 'string',
      required: true
    },
    oldPass: {
      type: 'string',
      required: true
    },
    newPass: {
      type: 'string',
      required: true
    },
    checkPass: {
      type: 'string',
      required: true
    },
  }
}