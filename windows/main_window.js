var _                = require('lodash'),
    blessed          = require('blessed'),
    events           = require('events'),
    util             = require('util'),
    SubscriptionTree = require('../views/subscription_tree'),
    Subscriptions    = require('../models/subscription').Subscriptions

var MainWindow = function MainWindow(app) {
  events.EventEmitter.call(this)

  this.app       = app
  this.component = this.initializeComponent()
  this.tree      = this.initializeTreePane()

  this.component.append(this.tree.component)
  //app.screen.append(this.component)
}
util.inherits(MainWindow, events.EventEmitter)

MainWindow.prototype.initializeTreePane = function initializeTreePane() {
  var tree = new SubscriptionTree()
  tree.on('update', _.bind(function() {
    this.emit('update')
  }, this))
  return tree;
}

MainWindow.prototype.initializeComponent = function() {
  var box = blessed.box({
    top: 'top',
    left: 'left',
    align: 'left',
    width: '100%',
    height: '100%'
  })
  return box;
}

MainWindow.prototype.index = function() {
  var tree = this.tree

  this.app.log("[main] index")
  this.app.account().subscriptions().then(function(rawSubs) {
    var subs = new Subscriptions(rawSubs)
    tree.set(subs)
    tree.focus(true) // Set focus & redraw.
  },
  _.bind(this.app.die, this.app)
  )
}

MainWindow.prototype.showAndFocus = function() {
  this.component.show()
  this.tree.focus()
}

module.exports = MainWindow
