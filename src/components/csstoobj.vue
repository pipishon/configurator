<template>
  <div class="csstoobj">
    <div class="css form-group">
      <label>css</label>
      <editor v-model="css" lang="css" theme="chrome"></editor>
    </div>
    <div class="obj">
      <div v-for="(styles, selector) in objects">
        <div class="form-group">
          <input class="form-control" :value="selector" type="text">
          <div class="rules" v-for="(value, name) in styles">
            <label>{{name}}</label>
            <input class="form-control" @input="changeCSS(selector, name, value, $event)" :value="value" type="text">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
var csstree = require('css-tree')

import editor from 'vue2-ace-editor'
import 'brace/mode/css'
import 'brace/theme/chrome'

export default {
  name: 'cssobj',
  data () {
    return {
      state: state,
      css: '.test-content { background-color: red; }',
      obj: {},
      parser: null,
      objects: {},
      sheet: null
    }
  },
  head: {
    style: function () {
      return [
        { type: 'text/css', id: 'css-styles', inner: this.css, undo: true},
      ]
    }
  },
  components: {
    editor
  },
  computed: {
  },
  watch: {
    css (val) {
      this.onCssUpdate()
    },
  },
  methods: {
    onCssUpdate () {
      this.$emit('updateHead')
      this.sheet = document.getElementById('css-styles')
      this.objects = {}

      var rules = this.sheet.sheet.rules
      for (var r in rules) {
        if (typeof(rules[r].selectorText) != 'undefined') {
          var rule = rules[r]
          var selector = rule.selectorText
          var styles = []
          if (typeof(this.objects[selector]) == 'undefined') {
            this.$set(this.objects, selector, {})
          }
          if (typeof(rule.style) != 'undefined') {
            for (var i = 0; i < rule.style.length; i++) {
              var name = rule.style[i]
              var value = rule.style.getPropertyValue(name)
              this.$set(this.objects[selector], name, value)
              //styles.push({name, value})
            }
          }
        }
      }
    },
    changeCSS (selector, name, val, event) {
      var new_val = event.target.value
      this.objects[selector][name] = new_val
      var ruleRgxp = new RegExp(selector + '[\\S\\s]*{[\\S\\s]*}', 'g')
      var ruleMatches = this.css.match(ruleRgxp)
      if (ruleMatches === null) {
        this.css += '\r\n' + selector + '{\r\n';
        this.css += name + ': ' + new_val + ';\r\n}';
      } else {
        var oldRuleText = ruleMatches[0]
        var styleRgxp = new RegExp(name + '[\\S\\s]*;', 'g')
        var styleMatches = oldRuleText.match(styleRgxp)
        if (styleMatches === null) {
          return
        }
        var oldStyleText = styleMatches[0]

        var newStyleText = oldStyleText.replace(/:.*;/, ':' + new_val + ';')
        var newRuleText = oldRuleText.replace(oldStyleText, newStyleText)
        this.css = this.css.replace(oldRuleText, newRuleText)
      }
    },
    createCSS () {
      var css = ''
      this.obj.map(function (el) {
        css = css + el.selector + '{\n'
        el.rules.map(function (rule) {
          css = css + '    ' + rule.directive + ': ' + rule.value + ';\n'
        })
        css = css + '}\n'
      })
      this.css = css
    }
  },
  mounted () {
    this.sheet = document.createElement('style')
    this.sheet.id = 'css-styles'
    document.head.appendChild(this.sheet)
    this.$emit('updateHead')

    if (this.parser == null) {
      this.parser = new cssjs()
    }
    this.onCssUpdate()
  }
}
</script>

<style scoped>
.obj {
  padding: 10px;
  height: 90vh;
  overflow: auto;
}
.element {
}
.css-input {
  min-height: 70vh;
}
.rules {
  margin-left: 20px;
}
.css {
  padding: 10px;
  width: 400px;
  height: 90vh;
  position: fixed;
  left: 220px;
  top: 10vh;
  background-color: white;
}
.obj {
  width: 400px;
  height: 90vh;
  position: fixed;
  left: 660px;
  top: 10vh;
  background-color: white;
}
</style>
