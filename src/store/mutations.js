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
          vm.set(state.rules[selector], name, value)
          //styles.push({name, value})
        }
      }
    }
  }
}

export const changeStyle = (state, { selector, name, event }) => {
  var new_val = event.target.value
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
      return
    }
    var oldStyleText = styleMatches[0]

    var newStyleText = oldStyleText.replace(/:.*;/, ':' + new_val + ';')
    var newRuleText = oldRuleText.replace(oldStyleText, newStyleText)
    state.css = state.css.replace(oldRuleText, newRuleText)
  }
}
