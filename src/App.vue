<template>
  <div id="app">
    <leftpanel></leftpanel>
    <rightpanel></rightpanel>
    <csstoobj></csstoobj>
    <popup></popup>
  </div>
</template>

<script>


import leftpanel from './components/leftpanel'
import csstoobj from './components/csstoobj'
import rightpanel from './components/rightpanel'
import popup from './components/popup'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  components: {
    leftpanel,
    rightpanel,
    popup,
    csstoobj
  },
  mounted () {
    // this.$store.commit('init')
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
</style>
