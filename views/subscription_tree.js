"use strict";

var _        = require('lodash'),
    blessed  = require('blessed'),
    events   = require('events'),
    util     = require('util')

class SubscriptionTree extends events.EventEmitter {
  constructor(opts) {
    if (opts === void 0) opts = {}
    super()

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

  // Clear list items.
  clear() {
    this.component.clearItems()
    return this;
  }

  // Set list items.
  // @param {Subscriptions} Subscription collection
  set(subs) {
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

  push(item) {
    this.component.pushItem(item)
    return this;
  }

  focus(triggerUpdate) {
    this.component.focus()
    if (triggerUpdate) this.emit('update')
    return this;
  }

  setupKeyboardEvents() {
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

  setupListEvents() {
    var self = this

    // Refresh screen when a list item is selected.
    this.component.on('select', function(_item, _select) {
      return self.emit('update');
    })

    return this;
  }
}

module.exports = SubscriptionTree
