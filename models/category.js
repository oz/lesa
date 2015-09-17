"use strict";

class Category {
  constructor(opts) {
    this.id   = opts.id
    this.name = opts.label
    this.opts = opts
  }
}

module.exports = Category
