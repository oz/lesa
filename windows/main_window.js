"use strict";

var _                = require('lodash'),
    blessed          = require('blessed'),
    events           = require('events'),
    util             = require('util'),
    SubscriptionTree = require('../views/subscription_tree'),
    Subscriptions    = require('../models/subscription').Subscriptions

class MainWindow extends events.EventEmitter {
  constructor(app) {
    super()
    this.app       = app
    this.component = this.initializeComponent()
    this.tree      = this.initializeTreePane()

    this.component.append(this.tree.component)
    //app.screen.append(this.component)
  }

  initializeComponent() {
    var box = blessed.box({
      top: 'top',
      left: 'left',
      align: 'left',
      width: '100%',
      height: '100%'
    })
    return box;
  }

  initializeTreePane() {
    var tree = new SubscriptionTree()
    tree.on('update', () => this.emit('update'))
    return tree;
  }

  index() {
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

  showAndFocus() {
    this.component.show()
    this.tree.focus()
  }
}

module.exports = MainWindow
