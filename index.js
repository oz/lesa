var blessed = require('blessed'),
    _       = require('lodash')

var Subscriptions = require('./models/subscription').Subscriptions,
    Account       = require('./models/account'),
    SubscriptionTree = require('./views/subscription_tree')


// Use sandbox feedly because tokens can't be public w/ Feedly... :/
process.env['DEBUG'] = '1'

var MainController = function MainController() {
  // Create a screen object.
  this.screen = blessed.screen({
    autoPadding: true,
    smartCSR:    true,
    fullUnicode: true,
  })
  this.screen.title = 'Lesa'

  // Quit on Escape, q, or Control-C.
  this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })

  // Render the screen.
  this.screen.render()
}

MainController.prototype.index = function() {
  var self = this
  var v = new SubscriptionTree({
    screen: this.screen
  })

  var account = new Account({
    client_id:     'sandbox',
    client_secret: 'YNXZHOH3GPYO6DF7B43K',
  })

  account.subscriptions().then(function(rawSubs) {
    var subs = new Subscriptions(rawSubs)
        tree = subs.tree()

    _.each(_.keys(tree), function(catId) {
      v.push(tree[catId].name)
    })
    self.screen.append(v.component)
    v.focus()
    self.screen.render()
  },
  function (error) {
    console.log(error)
    process.exit(1)
  });
}

var ctl = new MainController()
ctl.index()
