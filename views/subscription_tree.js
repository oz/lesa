var _        = require('lodash'),
    blessed  = require('blessed'),
    events   = require('events'),
    util     = require('util')

var SubscriptionTree = function SubscriptionTree(opts) {
  if (opts === void 0) opts = {}
  events.EventEmitter.call(this)

  this.label = opts.label || 'Subscriptions'
  this.items = opts.items || []

  this.component = blessed.list({
    label:  this.label,
    items:  this.items,
    top:    'top',
    left:   'left',
    width:  '30%',
    height: '100%',
    style:  {
      fg: 'white',
      bg: 'black',
      selected: {
        bg: 'white',
        fg: 'black'
      }
    }
  })
  this.component.select(0)
  this.setupKeyboardEvents().setupListEvents()
}
util.inherits(SubscriptionTree, events.EventEmitter)

SubscriptionTree.prototype.clear = function() {
  this.component.clearItems()
  return this;
}

// @param {Subscriptions} subs
SubscriptionTree.prototype.set = function(subs) {
  var tree = subs.tree(),
      self = this
  _.each(_.keys(tree), function(catId) {
    var cat = tree[catId]
    self.push(cat.name)
    _.each(cat.feeds, function(feed) {
      self.push("  " + feed.name)
    })
  })
}

SubscriptionTree.prototype.push = function(item) {
  this.component.pushItem(item)
  return this;
}

SubscriptionTree.prototype.focus = function(triggerUpdate) {
  this.component.focus()
  if (triggerUpdate) this.emit('update')
  return this;
}

SubscriptionTree.prototype.setupKeyboardEvents = function() {
  var self = this

  // Use arrows and j/k to navigate our list, etc.
  this.component.on('keypress', function(ch, key) {
    if (key.name === 'up' || key.name === 'k') {
      self.component.up()
      self.emit('update')
    } else if (key.name === 'down' || key.name === 'j') {
      self.component.down()
      self.emit('update')
    } else if (key.name === 'tab') {
      // XXX Switch to slave item-list view.
    }
  })

  return this;
}

SubscriptionTree.prototype.setupListEvents = function() {
  var self = this

  // Refresh screen when a list item is selected.
  this.component.on('select', function(_item, _select) {
    return self.emit('update');
  })

  return this;
}

module.exports = SubscriptionTree
