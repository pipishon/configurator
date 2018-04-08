<template>
  <div class="csstoobj">
    <div class="css form-group">
      <label>css</label>
      <editor :value="css" @input="updateHead" lang="css" theme="chrome"></editor>
    </div>
    <div class="obj" v-if="false">
      <div v-for="(styles, selector) in rules">
        <div class="form-group">
          <input class="form-control" @input="changeSelector({selector: selector, event: $event})" :value="selector" type="text">
          <div class="rules" v-for="(value, name) in styles">
            <label>{{name}}</label>
            <input class="form-control" @input="changeStyle({selector: selector, name: name, event: $event})" :value="value" type="text">
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
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'cssobj',
  data () {
    return {
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
    ...mapGetters(['css', 'rules'])
  },
  watch: {
  },
  methods: {
    hoverOverElement() {
      $(document).on('mouseover', '*', function (event) {
        console.log(event.target)
      })
    },
    updateHead(css) {
      this.updateCss(css)
      this.$emit('updateHead')
      this.onCssUpdate(css)
    },
    ...mapMutations(['updateCss', 'changeSelector', 'onCssUpdate', 'changeStyle'])
  },
  mounted () {
    this.sheet = document.createElement('style')
    this.sheet.id = 'css-styles'
    document.head.appendChild(this.sheet)
    this.$emit('updateHead')

    if (this.parser == null) {
      this.parser = new cssjs()
    }
    this.onCssUpdate(this.css)
    $(document).on('mouseover', '*', function (event) {
      var self = this

      event.stopPropagation()
      $('.on-hover').removeClass('on-hover')
      setTimeout(function () {
        $(self).addClass('on-hover')
        var nodes = []
        while (self.nodeName !== 'BODY') {
          nodes.push(self.nodeName)
          self = self.parentNode
        }
        console.log(nodes.reverse().join('>'))
      }, 10)
    })
  }
}
</script>

<style>
.on-hover {
  outline: 3px solid lightblue;
}
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
