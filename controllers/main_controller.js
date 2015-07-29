var SubscriptionTree = require('../views/subscription_tree'),
    Subscriptions    = require('../models/subscription').Subscriptions

var MainController = function MainController(app) {
  this.app = app
}

MainController.prototype.index = function() {
  var app = this.app
      v   = new SubscriptionTree()

  v.on('update', function() { app.screen.render() })

  app.account().subscriptions().then(function(rawSubs) {
    var subs = new Subscriptions(rawSubs)
        tree = subs.tree()

    _.each(_.keys(tree), function(catId) {
      v.push(tree[catId].name)
    })
    app.screen.append(v.component)
    v.focus()
    app.screen.render()
  },
  function (err) { return app.die(err); }
  )
}

module.exports = MainController
