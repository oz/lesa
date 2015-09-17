"use strict";

var Feedly       = require('feedly'),
    _            = require('lodash'),
    EventEmitter = require('events').EventEmitter

const DEBUG_URL              = 'https://sandbox.feedly.com'
const BASE_URL               = 'https://cloud.feedly.com'
const OAUTH_LOCAL_SEVER_PORT = 8080

// Account model, for Feedly.
// FIXME - Add support for other things that Feedly...
class Account extends EventEmitter {
  constructor(opts) {
    super()

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

  subscriptions() {
    return this.feedly.subscriptions();
  }
}

module.exports = Account
