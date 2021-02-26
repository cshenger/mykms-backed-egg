'use strict';

exports.userrole = {
  code: {
    type: "string"
  },
  name: {
    type: "string"
  },
  value: {
    type: "number"
  }
}

exports.todoItem = {
  activeKey: {
    type: "string"
  },
  id: {
    type: "string"
  },
  text: {
    type: "string"
  }
}

exports.algorKey = {
  name: {
    type: "string"
  },
  value: {
    type: "number"
  }
}

exports.statusKey = {
  name: {
    type: "string"
  },
  value: {
    type: "number"
  },
  status: {
    type: "number"
  }
}

exports.keymonth = {
  xData: {
    type: "array",
    itemType: "string"
  },
  yData: {
    type: "array",
    itemType: "string"
  }
}