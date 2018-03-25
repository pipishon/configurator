<template>
  <div class="group">
    <button class="btn" @click="group.opend = !group.opend">
    <svg class="chevron" v-show="!group.opend" viewBox="0 0 1024 1024"><path class="path1" d="M256 1024c-6.552 0-13.102-2.499-18.101-7.499-9.998-9.997-9.998-26.206 0-36.203l442.698-442.698-442.698-442.699c-9.998-9.997-9.998-26.206 0-36.203s26.206-9.998 36.203 0l460.8 460.8c9.998 9.997 9.998 26.206 0 36.203l-460.8 460.8c-5 5-11.55 7.499-18.102 7.499z"></path></svg>
    <svg class="chevron" v-show="group.opend" viewBox="0 0 1024 1024"><path class="path1" d="M0 307.2c0-6.552 2.499-13.102 7.499-18.101 9.997-9.998 26.206-9.998 36.203 0l442.698 442.698 442.699-442.698c9.997-9.998 26.206-9.998 36.203 0s9.998 26.206 0 36.203l-460.8 460.8c-9.997 9.998-26.206 9.998-36.203 0l-460.8-460.8c-5-5-7.499-11.55-7.499-18.102z"></path></svg>
    </button>
    <span>{{group.name}}</span>
    <div class="elements" v-show="group.opend || empty">
      <draggable v-model="group.lines"  :options="{group:{name: 'g2'}, ghostClass:'sortable-ghost'}" class="lines">
        <div v-for="line in group.lines">
          <div class="line" :class="{active: isActiveLine(line)}" @click="changeActiveLine(line)"><span >{{line.name}}</span><button class="btn edite" @click.stop="showPopup(line)">
<svg class="pencil" viewBox="0 0 1024 1024"><path d="M978.101 45.898c-28.77-28.768-67.018-44.611-107.701-44.611-40.685 0-78.933 15.843-107.701 44.611l-652.8 652.8c-2.645 2.645-4.678 5.837-5.957 9.354l-102.4 281.6c-3.4 9.347-1.077 19.818 5.957 26.85 4.885 4.888 11.43 7.499 18.104 7.499 2.933 0 5.891-0.502 8.744-1.541l281.6-102.4c3.515-1.28 6.709-3.312 9.354-5.958l652.8-652.8c28.768-28.768 44.613-67.018 44.613-107.702s-15.843-78.933-44.613-107.701zM293.114 873.883l-224.709 81.71 81.712-224.707 566.683-566.683 142.997 142.997-566.683 566.683zM941.899 225.098l-45.899 45.899-142.997-142.997 45.899-45.899c19.098-19.098 44.49-29.614 71.498-29.614s52.4 10.518 71.499 29.616c19.098 19.098 29.616 44.49 29.616 71.498s-10.52 52.4-29.616 71.498z"></path></svg>
            </button></div>
        </div>
      </draggable>
      <draggable v-model="group.groups" :options="{group:{name: 'g1'}, ghostClass:'sortable-ghost'}" class="subs">
        <div v-for="group in group.groups">
          <group :group="group"></group>
        </div>
      </draggable>
    </div>

  </div>
</template>

<script>


import draggable from 'vuedraggable'

export default {
  name: 'group',
  props: ['group'],
  data () {
    return {
      state: state
    }
  },
  components: {
    draggable
  },
  computed: {
    empty () {
      return this.group.lines.length == 0 && this.group.groups.length == 0
    }
  },
  watch: {
  },
  methods: {
    showPopup (line) {
      state.lineToEdite = line
      state.isPopupVisible = true
    },
    changeActiveLine (line) {
      state.isPopupVisible = false
      state.activeLine = line
    },
    isActiveLine (line) {
      return line == state.activeLine
    },
  },
  mounted () {
    console.log(this.group)
  }
}
</script>

<style scoped>
.group {
}
.elements {
  padding-left: 20px;
}

.chevron {
  width: 14px;
}
.pencil {
  width: 10px;
}
.line {
  cursor: pointer;
  padding: 2px;
}

.line:hover {
  outline: 1px solid lightgray;
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
.subs, .lines {
  display: block;
  min-height: 5px;
}
.sortable-ghost {
  border-bottom: 1px solid black;
}
.line.active {
  background-color: #30c2ff;
  color: white;
}
.line.active svg{
  fill: white;
}
</style>
