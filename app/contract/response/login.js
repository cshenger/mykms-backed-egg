'use strict';
module.exports = {
  theLogin: {
    loginName: {
      type: 'string',
    },
    token: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    userName: {
      type: 'string'
    },
    userRole: {
      type: "array",
      itemType: "string"
    },
  }
};