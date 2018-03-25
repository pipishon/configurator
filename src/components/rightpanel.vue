<template>
  <div class="rightpanel">
    <div v-if="typeof(line.css) != 'undefined'">
      <div class="title">{{line.name}}</div>
    <div class="text-settings">
      <span >Text styles</span>
      <div>
        <button class="btn btn-default" @click="onButtonClick('text-align','left', 'left')" :class="{active: line.css['text-align'] == 'left'}">left</button>
        <button class="btn btn-default" @click="onButtonClick('text-align','center', 'center')" :class="{active: line.css['text-align'] == 'center'}">center</button>
        <button class="btn btn-default" @click="onButtonClick('text-align','right', 'right')" :class="{active: line.css['text-align'] == 'right'}">right</button>
      </div>
      <div>
        <button class="btn btn-default" @click="onButtonClick('text-transform','uppercase', 'none')" :class="{active: line.css['text-transform'] == 'uppercase'}">Tt</button>
        <button class="btn btn-default" @click="onButtonClick('font-weight','bold', 'normal')" :class="{active: line.css['font-weight'] == 'bold'}">B</button>
        <button class="btn btn-default" @click="onButtonClick('font-style','italic', 'normal')" :class="{active: line.css['font-style'] == 'italic'}">I</button>
        <button class="btn btn-default" @click="onButtonClick('text-decoration','line-through', 'none')" :class="{active: line.css['text-decoration'] == 'line-through'}">S</button>
        <button class="btn btn-default" @click="onButtonClick('text-decoration','underline', 'none')" :class="{active: line.css['text-decoration'] == 'underline'}">U</button>
      </div>
      <div class="col-md-6">
        <label> Font size </label>
        <input v-model="line.css['font-size']" @keydown="onKeyDown($event, 'font-size')" title="font size" class="fontsize-input" type="text" />
      </div>
      <div class="col-md-6">
        <label> Line height </label>
        <input v-model="line.css['line-height']" @keydown="onKeyDown($event, 'line-height')" title="line height" class="fontsize-input" type="text" />
      </div>
      </div>
    </div>
</div>

</template>

<script>

export default {
  name: 'rightpanel',
  data () {
    return {
      state: state
    }
  },
  computed: {
    line () {
      return state.activeLine
    }
  },
  watch: {
    line: {
      handler: function (val) {
        if (this.line.selector.length > 3) {
          $(this.line.selector).css(val.css)
        }
      },
      deep: true
    }
  },
  methods: {
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
  padding: 8px;
  color: gray;
  border-bottom: 1px solid gray;
}
</style>
