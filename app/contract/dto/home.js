'use strict';

exports.dictRole = {
  id: {
    type: 'number'
  },
  code: {
    type: 'string'
  },
  text: {
    type: 'string'
  }
}

exports.algorWayCh = {
  title: {
    type: 'string'
  },
  value: {
    type: 'string'
  },
  key: {
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
};

exports.algorWay = {
  title: {
    type: 'string'
  },
  value: {
    type: 'string'
  },
  key: {
    type: 'string'
  },
  disabled: {
    type: 'bollean'
  },
  children: {
    type: 'array',
    itemType: 'algorWayCh'
  }
}

exports.dictUser = {
  id: {
    type: 'string'
  },
  userName: {
    type: 'string'
  },
}