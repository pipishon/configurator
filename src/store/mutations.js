import vm from 'vue'

export const changeSelector = (state, {selector, event}) => {
    var new_selector = event.target.value
    vm.set(state.rules, new_selector, state.rules[selector])
    delete state.rules[selector]
    var ruleRgxp = new RegExp(selector + '[\\S\\s]*{[\\S\\s]*}', 'g')
    var ruleMatches = state.css.match(ruleRgxp)
    if (ruleMatches === null) {
      return
    }
    var oldRuleText = ruleMatches[0]
    var newRuleText = oldRuleText.replace(/.*{/, new_selector + ' {');
    state.css = state.css.replace(oldRuleText, newRuleText)
}


export const updateCss = (state, css) => {
  state.css = css
}

export const onCssUpdate = (state, css) => {
  var sheet = document.getElementById('css-styles')
  state.rules = {}

  var rules = sheet.sheet.rules
  for (var r in rules) {
    if (typeof(rules[r].selectorText) != 'undefined') {
      var rule = rules[r]
      var selector = rule.selectorText
      var styles = []
      if (typeof(state.rules[selector]) == 'undefined') {
        vm.set(state.rules, selector, {})
      }
      if (typeof(rule.style) != 'undefined') {
        for (var i = 0; i < rule.style.length; i++) {
          var name = rule.style[i]
          var value = rule.style.getPropertyValue(name)
          if (selector === state.activeRule.selector && typeof(state.activeRule.styles[name]) !== 'undefined') {
            state.activeRule.styles[name] = value
          }
          vm.set(state.rules[selector], name, value)
          //styles.push({name, value})
        }
      }
    }
  }
}

export const changeStyle = (state, { selector, name, val }) => {
  var new_val = val
  if (typeof(state.rules[selector]) === 'undefined') {
    return
  }
  state.rules[selector][name] = new_val
  var ruleRgxp = new RegExp(selector + '[\\S\\s]*{[\\S\\s]*}', 'g')
  var ruleMatches = state.css.match(ruleRgxp)
  if (ruleMatches === null) {
    return
  } else {
    var oldRuleText = ruleMatches[0]
    var styleRgxp = new RegExp('[{\\s]+' + name + '[\\S\\s]*;', 'g')
    var styleMatches = oldRuleText.match(styleRgxp)
    if (styleMatches === null) {
      var pos = oldRuleText.lastIndexOf(';') + 1 // end last rule position
      if (pos == 0) {
        pos = oldRuleText.indexOf('{') + 1 // end last rule position
      }
      var s = oldRuleText
      var newStyle = '\r\n    ' + name + ': ' + new_val + ';'
      newRuleText = [s.slice(0, pos), newStyle, s.slice(pos)].join('')
      state.css = state.css.replace(oldRuleText, newRuleText)
      return
    }
    var oldStyleText = styleMatches[0]

    var newStyleText = oldStyleText.replace(/:.*;/, ':' + new_val + ';')
    var newRuleText = oldRuleText.replace(oldStyleText, newStyleText)
    state.css = state.css.replace(oldRuleText, newRuleText)
  }
}

export const setActiveRule = (state, { styles, selector }) => {
  state.activeRule.selector = selector
  state.activeRule.styles = JSON.parse(JSON.stringify(state.activeRule.defaultStyles))
  var activeStyles = state.activeRule.styles
  for (name in styles) {
    if (typeof (activeStyles[name]) !== 'undefined') {
      activeStyles[name] = styles[name]
    }
  }
}
