var blessed = require('blessed')

var BottomStatusBar = function BottomStatusBar() {
  this.component = blessed.text({
    content: 'Status bar',
    align: 'left',
    top: 'bottom',
    left: 'left',
    width: '100%',
    style: {
      bg: 'blue',
      fg: 'white',
    }
  })
}
