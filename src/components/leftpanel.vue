<template>
  <div class="leftpanel">
    <button class="btn add-btn" @click="addGroup">Add group</button><button class="btn add-btn" @click="addLine">Add element</button>
    <div class="elements">
      <draggable  :options="{group:{name: 'g2'}, ghostClass:'sortable-ghost'}">
        <div >
          <div class="line" :class="{active: isActiveLine(line)}" @click="changeActiveLine(line)"><span >{{line.name}}</span><button class="btn edite" @click.stop="showPopup(line)">
<svg class="pencil" viewBox="0 0 1024 1024"><path d="M978.101 45.898c-28.77-28.768-67.018-44.611-107.701-44.611-40.685 0-78.933 15.843-107.701 44.611l-652.8 652.8c-2.645 2.645-4.678 5.837-5.957 9.354l-102.4 281.6c-3.4 9.347-1.077 19.818 5.957 26.85 4.885 4.888 11.43 7.499 18.104 7.499 2.933 0 5.891-0.502 8.744-1.541l281.6-102.4c3.515-1.28 6.709-3.312 9.354-5.958l652.8-652.8c28.768-28.768 44.613-67.018 44.613-107.702s-15.843-78.933-44.613-107.701zM293.114 873.883l-224.709 81.71 81.712-224.707 566.683-566.683 142.997 142.997-566.683 566.683zM941.899 225.098l-45.899 45.899-142.997-142.997 45.899-45.899c19.098-19.098 44.49-29.614 71.498-29.614s52.4 10.518 71.499 29.616c19.098 19.098 29.616 44.49 29.616 71.498s-10.52 52.4-29.616 71.498z"></path></svg>
            </button></div>
        </div>
      </draggable>
      <draggable :options="{group:{name: 'g1'}, ghostClass:'sortable-ghost'}">
        <div >
          <group :group="group"></group>
        </div>
      </draggable>
    </div>

  </div>
</template>

<script>
import group from './group'
import draggable from 'vuedraggable'

export default {
  name: 'leftpanel',
  data () {
    return {
      isMounted: false
    }
  },
  components: {
    group,
    draggable
  },
  computed: {
  },
  watch: {
  },
  methods: {
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
</style>
