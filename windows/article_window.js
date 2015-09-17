"use strict";

var _                = require('lodash'),
    blessed          = require('blessed'),
    events           = require('events'),
    util             = require('util'),
    SubscriptionTree = require('../views/subscription_tree'),
    Subscriptions    = require('../models/subscription').Subscriptions

class ArticleWindow extends events.EventEmitter {
  constructor(app) {
    super()
    this.app = app
    this.component = this.initializeComponent()
  }

  initializeComponent() {
    var box = blessed.text({
      content: "Article window",
      top: 'top',
      left: 'left',
      align: 'left',
      width: '100%',
      height: '100%'
    })

    return box;
  }

  index() {
    this.app.log("[article] index")
    return this;
  }

  showAndFocus() {
    this.component.show()
    this.component.focus()
  }
}

module.exports = ArticleWindow
