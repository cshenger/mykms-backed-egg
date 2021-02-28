'use strict';

exports.baseRespnse = {
  code: {
    type: 'number'
  },
  data: {
    type: 'object',
    itemType: 'string'
  },
  message: {
    type: 'string'
  },
  success: {
    type: 'boolean'
  }
}