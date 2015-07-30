var blessed = require('blessed')

var TopStatusBar = function TopStatusBar() {
  this.component = blessed.text({
    content: 'Lesa',
    align: 'left',
    top: 'top',
    left: 'left',
    width: '100%',
    style: {
      bg: 'blue',
      fg: 'white',
    }
  })
}
