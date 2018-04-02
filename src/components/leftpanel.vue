<template>
  <div class="leftpanel">
    <button v-if="false" class="btn add-btn">Add group</button>
    <div class="elements" :class="{active: isActive(selector)}" v-for="(styles, selector) in rules" @click="setActiveRule({styles: styles, selector: selector})">
      <draggable  :options="{group:{name: 'g2'}, ghostClass:'sortable-ghost'}">
        <div class="line">
          <span >{{selector}}</span>
        </div>
      </draggable>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'leftpanel',
  data () {
    return {
      isMounted: false
    }
  },
  components: {
    draggable
  },
  computed: {
    ...mapGetters(['rules', 'activeRule'])
  },
  watch: {
  },
  methods: {
    isActive (selector) {
      return selector == this.activeRule.selector
    },
    changeActiveLine (line) {
      /*state.isPopupVisible = false
      state.activeLine = line */
    },
    isActiveLine (line) {
      //return line == state.activeLine
    },
    showPopup (line) {
      //state.lineToEdite = line
      //state.isPopupVisible = true
    },
    addGroup () {
      //state.isPopupVisible = false
      //state.data.groups.unshift(JSON.parse(JSON.stringify(defaultGroup)))
    },
    addLine () {
      //state.data.lines.unshift(JSON.parse(JSON.stringify(defaultLine)))
      //this.showPopup(state.data.lines[0])
    },
    ...mapMutations(['setActiveRule'])
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style scoped>
.leftpanel {
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
}
.sortable-ghost {
  border-bottom: 1px solid black;
}
.elements {
  padding: 10px 15px;
}
.line.active {
  background-color: #30c2ff;
  color: white;
}
.line:hover .edite {
  display: block;
}
.edite {
  float: right;
  display: none;
}
.btn {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
}
.pencil {
  width: 10px;
}
.line {
  cursor: pointer;
}
.line:hover {
  outline: 1px solid lightgray;
}
.add-btn {
  width: 50%;
  color: white;
  background-color: black;
  padding: 6px;
}
.line.active svg{
  fill: white;
}
.active {
  background: lightblue;
}
</style>
