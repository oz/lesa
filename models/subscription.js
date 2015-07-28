var _        = require('lodash')
    Category = require("./category")

var Subscription = function Subscription (opts) {
  this.opts = opts
  this.name = opts.title
  this.url  = opts.website
  this.id   = opts.id

  this.categories = _.map(opts.categories, function (rawCat) {
    return new Category(rawCat)
  })
}

// Subscription collection.
// Build from Feedly data:
// [ { id: 'feed/http://feeds.feedburner.com/Techcrunch',
//     title: 'TechCrunch',
//     website: 'http://techcrunch.com',
//     categories: [ { id: '...', label: '...' } ],
//     updated: 1438008315551,
//     velocity: 294,
//     subscribers: 406,
//     topics: [ 'tech' ],
//     partial: true,
//     iconUrl: 'http://storage.googleapis.com/site-assets/Xne8uW_IUiZhV1EuO2ZMzIrc2Ak6NlhGjboZ-Yk0rJ8_icon-1483506b56e',
//     visualUrl: 'http://storage.googleapis.com/site-assets/Xne8uW_IUiZhV1EuO2ZMzIrc2Ak6NlhGjboZ-Yk0rJ8_visual',
//     coverUrl: 'http://storage.googleapis.com/site-assets/Xne8uW_IUiZhV1EuO2ZMzIrc2Ak6NlhGjboZ-Yk0rJ8_cover-148574dcfbb',
//     coverColor: '149500' },
//  ...
var Subscriptions = function Subscriptions(subs) {
  this.collection = []

  _.each(subs, function(sub) {
    this.collection.push(new Subscription(sub))
  }, this)
}

Subscriptions.prototype.length = function length() {
  return this.collection.length;
}

Subscriptions.prototype.each = function each(cb) {
  return _.each(this.collection, cb, this);
}

Subscriptions.prototype.tree = function tree() {
  var tree = {}

  this.each(function(sub) {
    _.each(sub.categories, function(cat) {
      if (!tree[cat.id]) {
        tree[cat.id] = { name: cat.name, feeds: [] }
      }

      tree[cat.id].feeds.push(sub)
    })
  })

  return tree;
}

module.exports = {
  Subscription:  Subscription,
  Subscriptions: Subscriptions
}
