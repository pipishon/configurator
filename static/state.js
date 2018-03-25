var defaultLine = {
  name: 'title',
  selector: '',
  css: {
    'text-align': '',
    'font-family': '',
    'font-weight': '',
    'font-size': '',
    'font-style': '',
    'line-height': '',
    'background-color': '',
    'text-align': '',
    'text-decoration': '',
    'text-transform': '',
    'opacity': '',
  },
}
var defaultGroup = {
  name: 'group',
  opend: true,
  lines: [],
  groups: []
}

var state = {
  data: {
    lines: [],
    groups: []
  },
  isPopupVisible: false,
  lineToEdite: {},
  activeLine: {}
}
