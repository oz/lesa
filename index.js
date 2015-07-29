var blessed = require('blessed'),
    _       = require('lodash')

var Account        = require('./models/account'),
    MainController = require('./controllers/main_controller')

// Use sandbox feedly because tokens can't be public w/ Feedly... :/
process.env['DEBUG'] = '1'

var App = function App() {
  this.program = blessed.program()

  // Create a screen object
  // XXX I'll probably need more that one. Need to check how blessed handles
  //     this... :)
  this.screen = blessed.screen({
    autoPadding: true,
    smartCSR:    true,
    fullUnicode: true,
  })
  this.screen.title = 'Lesa'

  // Quit on q, or Control-C.
  this.screen.key(['q', 'C-c'], _.bind(this.quit, this));
  this.screen.render()
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
}

App.prototype.quit = function quit() {
  this.resetTerm()
  process.exit(0)
}

App.prototype.die = function die(err) {
  this.resetTerm()
  console.error(err)
  process.exit(1)
}

App.prototype.run = function run() {
  var c = new MainController(this)
  c.index()
}

var app = new App()
app.run()
