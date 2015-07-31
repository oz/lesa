var _                = require('lodash'),
    blessed          = require('blessed'),
    events           = require('events'),
    util             = require('util'),
    SubscriptionTree = require('../views/subscription_tree'),
    Subscriptions    = require('../models/subscription').Subscriptions

var ArticleWindow = function ArticleWindow(app) {
  events.EventEmitter.call(this)
  this.app = app
  this.component = this.initializeComponent()
  //app.screen.append(this.component)
}
util.inherits(ArticleWindow, events.EventEmitter)

ArticleWindow.prototype.initializeComponent = function() {
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

ArticleWindow.prototype.index = function() {
  this.app.log("[article] index")
  return this;
}

ArticleWindow.prototype.showAndFocus = function() {
  this.component.show()
  this.component.focus()
}

module.exports = ArticleWindow
