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


export default {
  name: 'app',
  components: {
    csstoobj,
    leftpanel,
    rightpanel,
  },
  mounted () {
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
