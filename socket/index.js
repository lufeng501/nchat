var SocketHander = function () {

  /**
   * 数据库连接实例
   * @type {{}}
   */
  this.db = {}

  /**
   * 连接数据库
   */
  this.connect = function () {
    // 连接mongodb数据库
    this.db = require('mongoskin').db('mongodb://localhost:27017/nchat');
  }

  /**
   * 获取历史记录
   */
  this.getHistoryMessages = function () {

    var Promise = require('promise');

    var _this = this

    // 使用promise实现异步串行
    var promise = new Promise(function (resolve, reject) {
      _this.db.collection('messages').find().sort({time:-1}).limit(3).toArray(function (error, result) {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      });
    });

    return promise;

  }

  /**
   * 存储数据
   * @param data
   */
  this.storeMessages = function (data) {
    var Promise = require('promise');
    var _this = this
    // 写入数据库
    _this.db.collection('messages').insert(data)

  }

}

module.exports = SocketHander;