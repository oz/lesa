var _                = require('lodash'),
    SubscriptionTree = require('../views/subscription_tree'),
    Subscriptions    = require('../models/subscription').Subscriptions

var MainController = function MainController(app) {
  this.app = app
}

MainController.prototype.index = function() {
  var app  = this.app,
      tree = new SubscriptionTree()

  tree.on('update', function() { app.screen.render() })
  app.screen.append(tree.component)
  app.account().subscriptions().then(function(rawSubs) {
    var subs = new Subscriptions(rawSubs)
    tree.set(subs)
    tree.focus(true) // Set focus & redraw.
  },
  _.bind(app.die, app)
  )
}

module.exports = MainController
