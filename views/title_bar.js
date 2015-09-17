"use strict";

var blessed = require('blessed')

module.exports = class TitleBar {
  constructor() {
    this.component = blessed.text({
      content: 'Lesa',
      align: 'left',
      top: 0,
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
