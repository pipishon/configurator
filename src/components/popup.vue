<template>
  <div class="popup" v-show="state.isPopupVisible">
    <button class="btn-close" @click="hidePopup">x</button>
    <div>
      <label for="name">Name</label>
      <input name="name" id="name" v-model="state.lineToEdite.name" type="text"/>
    </div>
    <div>
      <label for="selector">Selector</label>
      <textarea name="selector" id="selector" v-model="state.lineToEdite.selector" type="text"/>
    </div>
  </div>

</template>

<script>


export default {
  name: 'popup',
  data () {
    return {
      state: state
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    hidePopup () {
      state.isPopupVisible = false
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.btn-close {
  position: absolute;
  right: 0;
  top: 0;
}
#selector {
  width: 100%;
  height: 200px;
}
.popup {
  padding: 20px;
  width: 500px;
  height: 300px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
}

</style>
