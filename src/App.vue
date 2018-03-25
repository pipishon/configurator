<template>
  <div id="app">
    <csstoobj></csstoobj>
  </div>
</template>

<script>


import csstoobj from './components/csstoobj'


export default {
  name: 'app',
  components: {
    csstoobj
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
</style>
