var blessed    = require('blessed'),
    _          = require('lodash'),
    Account    = require('./models/account'),
    MainScreen = require('./screens/main_screen')

// Use sandbox feedly because tokens can't be public w/ Feedly... :/
process.env['DEBUG'] = '1'

var App = function App(opts) {
  if (opts === void 0) opts = {}
  if (process.env['DEBUG']) {
    _.defaults(opts, {
      log: "./lesa.log"
    })
  }

  this.program = blessed.program(opts)
  // XXX Check if I can have >1 blessed.screen per progam.
  this.screen = blessed.screen({
    autoPadding: true,
    smartCSR:    true,
    fullUnicode: true,
  })
  this.screen.title = 'Lesa'

  // Quit on q, or Control-C.
  this.screen.key(['q', 'C-c'], _.bind(this.quit, this));
}

App.prototype.account = function account() {
  if (this.__account === void 0) {
    this.__account = new Account({
      client_id:     'sandbox',
      client_secret: 'YNXZHOH3GPYO6DF7B43K',
    })
  }
  return this.__account;
}

App.prototype.resetTerm = function resetTerm() {
  this.program.clear();
  this.program.disableMouse();
  this.program.showCursor();
  this.program.normalBuffer();
  return this;
}

App.prototype.quit = function quit() {
  this.resetTerm()
  process.exit(0)
}

App.prototype.die = function die(err) {
  this
    .resetTerm()
    .log(err)
  process.exit(1)
}

App.prototype.log = function log(msg) {
  this.program.log(msg)
  return this;
}

App.prototype.run = function run() {
  var c = new MainScreen(this)
  c.index()
}

var app = new App()
app.run()
