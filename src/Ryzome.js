import Terminal from './Terminal'

export default class Rhyzome {
  constructor(passphrase, salt) {
    this.terminal = new Terminal(passphrase, salt)
    this.ready = this.terminal.ready
    this.init()
  }
  async init() {
    await this.ready
    this.close = this.terminal.close
  }
}
