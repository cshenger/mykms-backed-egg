const Subscription = require('egg').Subscription;
const {
  createKey
} = require('../utils/keys');

class BackupKeys extends Subscription {
  static get schedule() {
    return {
      interval: '1h',
      type: 'worker',
      immediate: true
    }
  }

  async subscribe() {
    const algors = await this.app.mysql.select('algorithm');
    for (let algor of algors) {
      let backedkeys = await this.app.mysql.select('backupkeys', {
        where: {
          way: algor.way
        }
      });

      for (let i = backedkeys.length; i <= 5; i++) {
        let theKey = await createKey(algor);
        let insertData = {
          id: `backupKeys_${Math.random().toFixed(5)}`,
          way: algor.way,
          mykey: theKey.key,
          iv: theKey.iv
        }
        await this.app.mysql.insert('backupkeys', insertData);
      }
    }
  }
}

module.exports = BackupKeys;