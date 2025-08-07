const { Entity } = require('@drumee/server-core')
const {
  Attr, RedisStore
} = require('@drumee/server-essentials');

class Customer extends Entity {

  /**
   * 
   */
  async publish() {
    let args = this.input.get('args');
    args = JSON.parse(args)
    let echoId = this.input.get('echoId');
    let recipients = await this.yp.await_proc("entity_sockets", {
      hub_id: this.hub.get(Attr.id)
    });

    let payload = this.payload(args, { echoId });
    this.debug("AAA:18", { args, payload, recipients }, this.hub.get(Attr.id))
    await RedisStore.sendData(payload, recipients);
    this.output.data(args);
  }

}


module.exports = Customer;