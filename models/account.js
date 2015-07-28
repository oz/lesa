var Feedly = require('feedly'),
    _      = require('lodash')


DEBUG_URL              = 'https://sandbox.feedly.com'
BASE_URL               = 'https://cloud.feedly.com'
OAUTH_LOCAL_SEVER_PORT = 8080

// Account model, for Feedly.
var Account = function Account(opts) {
  this.type     = opts.type || 'feedly'
  this.id       = opts.client_id
  this.secret   = opts.client_secret
  this.port     = opts.port || OAUTH_LOCAL_SEVER_PORT
  this.base     = opts.base

  // No base URL given.
  if (!this.base) {
    this.base = process.env['DEBUG'] === '1' ? DEBUG_URL : BASE_URL
  }

  this.feedly = new Feedly({
    port:          this.port,
    base:          this.base,
    client_id:     this.id,
    client_secret: this.secret,
  })
}

// FIXME - Do not expose Feedly interface directly.
//       - Use promises or ... continuation style ?
Account.prototype.subscriptions = function subscriptions() {
  return this.feedly.subscriptions();
}

module.exports = Account
