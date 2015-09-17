"use strict";

var blessed = require('blessed'),
    StatusBar     = require('./status_bar'),
    TitleBar      = require('./title_bar')

module.exports = class DefaultLayout {
  constructor(screen) {
    this.component = blessed.box({
      top: 1,
      left: 0,
      width: '100%',
      height: '100%-1'
    })
    screen.append(this.component)
    screen.append(this.statusBar().component)
    screen.append(this.titleBar().component)
  }

  render() {
    this.statusBar().component.render()
    this.titleBar().component.render()
    this.component.render()
  }

  // @return {StatusBar}
  statusBar() {
    if (this.__statusBar) return this.__statusBar;
    this.__statusBar = new StatusBar()
    return this.__statusBar;
  }

  // @return {TitleBar}
  titleBar() {
    if (this.__titleBar) return this.__titleBar;
    this.__titleBar = new TitleBar()
    return this.__titleBar;
  }
}
