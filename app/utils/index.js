const crypto = require('crypto');

// 判断是不是空对象
function isEmptyObject(obj) {
  for (var key in obj) {
    //返回false，不为空对象
    return false;
  }
  return true; //返回true，为空对象
}

// 分页函数
function pageSearch(params, searchData) {
  if (isEmptyObject(searchData.where)) {
    delete searchData.where;
  }
  if (!!params && params.hasOwnProperty('pageSize')) {
    searchData.limit = parseInt(params.pageSize);
  }
  if (!!params && params.hasOwnProperty('current')) {
    searchData.offset = parseInt(params.current) * parseInt(params.pageSize) - parseInt(params.pageSize);
  }
}

// 计算分页
function pages(params) {
  let limit = parseInt(params.pageSize);
  let offset = parseInt(params.current) * parseInt(params.pageSize) - parseInt(params.pageSize);

  return {
    start: offset,
    end: limit * parseInt(params.current)
  }
}

// md5加密
function getMd5Data(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

// 合成查询条件
function renderWhere(params, ary) {
  let where = {};
  ary.forEach(item => {
    if (!!params && params.hasOwnProperty(item) && params[item] != '') {
      where[item] = params[item];
    }
  });

  return where
}

// select like
function selLike(where, name) {
  return `${name} like "%${where.hasOwnProperty(name) ? where[name] : ''}%"`;
}

module.exports = {
  isEmptyObject,
  pageSearch,
  getMd5Data,
  pages,
  renderWhere,
  selLike
}