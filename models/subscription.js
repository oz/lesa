"use strict";

var _        = require('lodash'),
    Category = require('./category')

class Subscription {
  constructor(opts) {
    this.opts = opts
    this.name = opts.title
    this.url  = opts.website
    this.id   = opts.id

    this.categories = _.map(opts.categories, (cat) => new Category(cat))
  }
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
class Subscriptions {
  constructor(subs) {
    this.collection = []

    _.each(subs, (sub) => this.collection.push(new Subscription(sub)))
  }

  length() {
    return this.collection.length;
  }

  each(cb) {
    return _.each(this.collection, cb, this);
  }

  tree() {
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
}

module.exports = {
  Subscription:  Subscription,
  Subscriptions: Subscriptions
}
