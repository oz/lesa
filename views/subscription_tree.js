var _       = require('lodash'),
    blessed = require('blessed')

var SubscriptionTree = function SubscriptionTree(opts) {
  this.label = opts.label || 'Subscriptions'
  this.items = opts.items || []

  // FIXME use events to redraw screen upstream.
  this.screen = opts.screen

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

  this.setupKeyboardEvents()
  this.setupListEvents()
}

SubscriptionTree.prototype.clear = function() {
  this.component.clearItems()
  return this;
}

SubscriptionTree.prototype.push = function(item) {
  this.component.pushItem(item)
  return this;
}

SubscriptionTree.prototype.focus = function() {
  this.component.focus()
  return this;
}

SubscriptionTree.prototype.setupKeyboardEvents = function() {
  var self = this

  // Use arrows and j/k to navigate our list, etc.
  this.component.on('keypress', function(ch, key) {
    if (key.name === 'up' || key.name === 'k') {
      self.component.up()
      self.screen.render()
    } else if (key.name === 'down' || key.name === 'j') {
      self.component.down()
      self.screen.render()
    }
  })

  return this;
}

SubscriptionTree.prototype.setupListEvents = function() {
  var self = this

  // Update screen when a list item is selected.
  this.component.on('select', function(item, select) {
    //self.component.setLabel(' ' + item.getText() + ' ');
    self.screen.render()
  })

  return this;
}

module.exports = SubscriptionTree
