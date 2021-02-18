const Subscription = require('egg').Subscription;

class UpdateKeysStatus extends Subscription {
  static get schedule() {
    return {
      interval: '6h',
      type: 'all',
      immediate: true
    }
  }

  async subscribe() {
    const keys = await this.app.mysql.select('theKeys');
    for (let key of keys) {
      if (new Date(key.deadDate) <= new Date() && key.status != 4) {
        await this.app.mysql.update('theKeys', {
          id: key.id,
          status: 4
        });
      }
    }
  }
}

module.exports = UpdateKeysStatus;