<template>
<div class="rightpanel">
  <button @click="onChoose">Start choose</button>
    <div class="title">{{activeRule.selector}}</div>
    <div class="line">
      <span>background-color</span>
      <span @click="colorName = 'background-color'; showColorPicker = true" class="color-preview" :style="{'background-color':activeRule.styles['background-color']}"></span>
    </div>
    <div class="line">
      <span>color</span>
      <span @click="colorName = 'color'; showColorPicker = true" class="color-preview" :style="{'background-color':activeRule.styles['color']}"></span>
    </div>
    <div v-show="showColorPicker" class="color-picker">
      <div class="color-picker-title">{{colorName}}</div>
      <colorpicker  :value="activeRule.styles[colorName]" @click.native.stop
           @input="onColorChange(arguments[0], colorName)" >
      </colorpicker>
    </div>
</div>

</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import Chrome from './color/Chrome'

export default {
  name: 'rightpanel',
  data () {
    return {
      showColorPicker: false,
      colorName: 'color'
    }
  },
  computed: {
    ...mapGetters(['activeRule'])
  },
  components: {
    colorpicker: Chrome,
  },
  watch: {
  },
  methods: {
    onColorChange(val, name) {
      var newColor = ''
      if (val.a !== 1) {
        newColor = 'rgba(' + Object.values(val.rgba).join(',') + ')'
      } else {
        newColor = val.hex
      }
      this.changeStyle({selector: this.activeRule.selector, name: name, val: newColor})
    },
    onButtonClick(name, value, clear) {
      var css = this.line.css;
      (css[name] != value) ? css[name] = value : css[name] = clear
    },
    onKeyDown: function (event, name) {
      if ([38, 40].indexOf(event.keyCode) == -1) return
      var size = this.line.css[name]
      var val = parseFloat(size)
      if (isNaN(val)) return
      var unit = size.replace(val, '')
      var i = 1
      if (event.ctrlKey) i = i * 100
      if (event.shiftKey) i = i * 10
      if (event.altKey) i = i / 10
      switch (event.keyCode) {
        case 38: //up
          val += i
          break
        case 40: //down
          val -= i
          break
      }
      if (val < 0) val = 0
      val = Math.round(val * 10) / 10
      this.line.css[name] = val + unit
      this.$forceUpdate()
    },
    ...mapMutations(['changeStyle', 'onChoose'])
  },
  mounted () {
  }
}
</script>

<style scoped>
.rightpanel {
  width: 200px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  background-color: white;
  padding: 15px;
}
.text-settings {
  padding: 20px;
}
.btn {
  background: none;
  border: 1px solid lightgray;
}
.btn.active {
  color: white;
  background-color: black;
}
.title {
  padding-bottom: 8px;
  color: gray;
  border-bottom: 1px solid gray;
}
.color-preview {
  border: 1px solid lightgray;
  width: 20px;
  height: 20px;
  display: block;
  float: right;
  margin-right: 10px;
}
.color-picker {
  background: white;
  padding: 10px;
  position: absolute;
  top: 40px;
  left: -180px;
  border: 1px solid lightgray;
}
.line {
  margin: 20px 0;
}
</style>
