'use strict';

const theKeyAdd = {
  keyName: {
    type: 'string',
    required: true
  },
  way: {
    type: 'string',
    required: true
  },
  algorithmName: {
    type: 'string',
    required: true
  },
  mode: {
    type: 'string',
    required: true
  },
  length: {
    type: 'string',
    required: true
  },
  deadDate: {
    type: 'string',
    required: true
  },
  keyUser: {
    type: 'string',
    required: true
  },
  remark: {
    type: 'string',
    required: true
  },
  status: {
    type: 'number',
    required: true
  },
  reason: {
    type: 'string',
    required: true
  }
}

const theKeyEdit = {
  id: {
    type: 'string',
    required: true
  },
  ...theKeyAdd
}

module.exports = {
  keysAdd: theKeyAdd,
  keysEdit: theKeyEdit,
  keysSend: {
    auditer: {
      type: 'string',
      required: true
    },
    sendId: {
      type: 'string',
      required: true
    }
  },
  keysAudit: {
    id: {
      type: 'string',
      required: true
    },
    reason: {
      type: 'string',
      required: true
    },
    result: {
      type: 'number',
      required: true
    },
  }
};