var blessed = require('blessed')

var StatusBar = function StatusBar() {
  this.component = blessed.text({
    content: 'Status bar',
    align: 'left',
    top: 'bottom',
    left: 'left',
    width: '100%',
    height: '1',
    style: {
      bg: 'blue',
      fg: 'white',
    }
  })
}
