"use strict";

var _        = require('lodash'),
    blessed  = require('blessed'),
    events   = require('events'),
    util     = require('util')

class SubscriptionTree extends events.EventEmitter {
  constructor(opts) {
    super()
    if (opts === void 0) opts = {}

    this.label = opts.label || 'Loading...'
    this.items = opts.items || []

    this.component = blessed.list({
      label:  this.label,
      items:  this.items,
      top:    'top',
      left:   'left',
      width:  '30%',
      height: '100%',
      style:  {
        bg: 'transparent',
        fg: 'white',
        selected: {
          bg: 'white',
          fg: 'black'
        }
      }
    })
    this.setupKeyboardEvents()
  }

  // Clear list items.
  clear() {
    this.component.clearItems()
    return this;
  }

  // Set list items.
  // @param {Subscriptions} Subscription collection
  setSubscriptions(subs) {
    var tree = this.subscriptionTree(subs)

    _.each(_.keys(tree), (catId) => {
      var cat = tree[catId]
      this.push(cat.name)
      _.each(cat.feeds, (feed) => this.push("  " + feed.name))
    })

    // XXX Blessed won't render if we don't wiggle the selection here, and
    //     simply calling render() has no effect.
    this.component.down()
    this.component.up()
    return this;
  }

  push(item) {
    this.component.pushItem(item)
    return this;
  }

  focus(triggerUpdate) {
    this.component.focus()
    return this;
  }

  setupKeyboardEvents() {
    // Use arrows and j/k to navigate our list, etc.
    this.component.on('keypress', (ch, key) => {
      if (key.name === 'up' || key.name === 'k') {
        this.component.up()
        // FIXME emit "select" with selected feed/cat ID
        this.emit('select')
      } else if (key.name === 'down' || key.name === 'j') {
        this.component.down()
        // FIXME emit "select" with selected feed/cat ID
        this.emit('select')
      } else if (key.name === 'tab') {
        // XXX Switch to slave item-list view.
      }
    })

    return this;
  }

  // @param subs {Subscriptions} a collection of Subscription
  // @return {Object} An object keyed by category ID, and where values
  //                  contain the category name and its list of feeds.
  subscriptionTree(subs) {
    var tree = {}
    subs.each(function(sub) {
      _.each(sub.categories, function(cat) {
        if (!tree[cat.id]) {
          tree[cat.id] = { name: cat.name, feeds: [] }
        }

        tree[cat.id].feeds.push(sub)
      })
    })
    return tree;
  }
}

module.exports = SubscriptionTree
