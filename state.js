var defaultLine = {
  name: 'title',
  css: {
    'background-color': ''
  },
}
var defaultGroup = {
  name: 'group',
  lines: [],
  groups: []
}
var state = {
  groups: [{
    name: 'group1',
    lines: [{ name: 'title'}],
    groups: []
  }],
  isPopupVisible: false,
  lineToEdite: {}
}
