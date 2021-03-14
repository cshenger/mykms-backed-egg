'use strict';

module.exports = {
  dictRoles: {
    roles: {
      type: 'array',
      itemType: 'dictRole'
    }
  },

  dictAlgors: {
    data: {
      type: 'array',
      itemType: 'string'
    }
  },

  daictWay: {
    data: {
      type: 'array',
      itemType: 'algorWay'
    }
  },

  dictUsers: {
    data: {
      type: 'array',
      itemType: 'dictUser'
    }
  }
}