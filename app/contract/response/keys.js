'use strict';

module.exports = {
  keysStatus: {
    data: {
      type: 'array',
      itemType: 'keyStatu'
    }
  },

  keysList: {
    records: {
      type: 'array',
      itemType: 'theKey'
    }
  },

  resultKey: {
    id: {
      type: 'string'
    },
    keyName: {
      type: 'string'
    },
    way: {
      type: 'string'
    },
    algorithmName: {
      type: 'string'
    },
    mode: {
      type: 'string'
    },
    length: {
      type: 'string'
    },
    deadDate: {
      type: 'string'
    },
    keyUser: {
      type: 'string'
    },
    remark: {
      type: 'string'
    },
    status: {
      type: 'number'
    },
    reason: {
      type: 'string'
    }
  },

  userKeys: {
    data: {
      type: 'array',
      itemType: 'userCanKey'
    }
  }
};