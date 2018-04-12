<template>
  <div id="app">
    <leftpanel></leftpanel>
    <csstoobj></csstoobj>
    <rightpanel></rightpanel>
  </div>
</template>

<script>


import csstoobj from './components/csstoobj'
import leftpanel from './components/leftpanel'
import rightpanel from './components/rightpanel'

import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    csstoobj,
    leftpanel,
    rightpanel,
  },
  computed: {
    ...mapGetters(['isOnChoose'])
  },
  methods: {
    ...mapMutations(['offChoose'])
  },
  mounted () {
    var vm = this
    $(document).on('click', '.on-hover', function (event) {
      vm.offChoose()
    })
    $(document).on('mouseover', '*', function (event) {
      if (!vm.isOnChoose) {
        return false
      }
      var self = this
      var node = this
      event.stopPropagation()

      $('.on-hover').removeClass('on-hover')
      var nodes = []
      while (node.nodeName !== 'BODY') {
        var name = node.nodeName.toLowerCase()
        if (node.className !== '' &&
              typeof(node.className.split) === 'function') {
          name = '.' + node.className.split(' ').join('.')
        }
        if (node.id !== '') {
          name = '#' + node.id
        }
        nodes.push(name)
        node = node.parentNode
      }
      setTimeout(function () {
        $(self).addClass('on-hover')
        console.log(nodes.reverse().join('>'))
      }, 10)
    })
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #12151d;
}
.test-content {
  font-size: 30px;
  color: white;
  position: absolute;
  left: 50%;
}
</style>
