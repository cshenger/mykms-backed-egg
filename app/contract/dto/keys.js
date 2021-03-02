'use strict';

exports.keyStatu = {
  code: {
    type: 'number'
  },
  text: {
    type: 'string'
  }
};

const theUser = {
  code: {
    type: 'string'
  },
  value: {
    type: 'string'
  }
}

exports.theKey = {
  algorithmName: {
    type: 'string'
  },
  auditDate: {
    type: 'string'
  },
  auditUser: {
    type: 'theUser'
  },
  createDate: {
    type: 'string'
  },
  createUser: {
    type: 'theUser'
  },
  deadDate: {
    type: 'string'
  },
  id: {
    type: 'string'
  },
  keyName: {
    type: 'string'
  },
  keyUser: {
    type: 'theUser'
  },
  length: {
    type: 'number'
  },
  mode: {
    type: 'string'
  },
  reason: {
    type: 'string'
  },
  remark: {
    type: 'string'
  },
  status: {
    type: 'number'
  },
  total: {
    type: 'number'
  },
  way: {
    type: 'string'
  },
};

exports.userCanKey = {
  id: {
    type: 'string'
  },
  keyName: {
    type: 'string'
  },
}