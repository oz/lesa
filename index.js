var blessed    = require('blessed'),
    _          = require('lodash'),
    Account    = require('./models/account'),
    MainWindow = require('./windows/main_window'),
    ArticleWindow = require('./windows/article_window')

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
  this.screen  = this.initializeScreen()
  this.windows = this.initializeWindows(this.screen)
}

App.name = 'Lesa'

// Create a blessed.screen, and bind our global keys.
App.prototype.initializeScreen = function() {
  var screen = blessed.screen({
    autoPadding: true,
    smartCSR:    true,
    fullUnicode: true,
  })
  screen.title = App.name

  // Quit on q, or Control-C.
  screen.key(['q', 'C-c'], () => this.quit())

  // 1 show main window, 2 show article view, etc.
  screen.key(['1'], () => this.switchTo('main'))
  screen.key(['2'], () => this.switchTo('article'))

  return screen;
}

// Create all app's windows, and append them to the received parent Element.
App.prototype.initializeWindows = function initializeWindows(parent) {
  var windows = {
    article: new ArticleWindow(this),
    main:    new MainWindow(this)
  }

  _.each(_.keys(windows), function(key) {
    var win = windows[key]
    parent.append(win.component)
    win.on('update', _.bind(parent.render, parent))
  })

  return windows;
}

// DEBUG account on Feedly's sandbox
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
  this.resetTerm().log(err)
  process.exit(1)
}

App.prototype.log = function log(msg) {
  this.program.log(msg)
  return this;
}

App.prototype.run = function run() {
  this.windows.main.index()
  return this;
}

App.prototype.hideWindow = function hideWindow(name) {
  this.windows[name].component.hide()
  return this;
}

// Hide all windows except the "name" window.
App.prototype.switchTo = function switchTo(name) {
  _.each(_.keys(this.windows), (wName) => {
    if (wName !== name) this.hideWindow(wName)
  })
  this.windows[name].showAndFocus()
  this.screen.render()
  return this;
}

var app = new App()
app.run()
