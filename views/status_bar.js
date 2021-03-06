"use strict";

var blessed = require('blessed')

module.exports = class StatusBar {
  constructor() {
    this.component = blessed.text({
      content: 'Status bar',
      align: 'left',
      bottom: 0,
      left: 'left',
      width: '100%',
      height: 1,
      style: {
        bg: 'white',
        fg: 'black',
      }
    })
  }
}
