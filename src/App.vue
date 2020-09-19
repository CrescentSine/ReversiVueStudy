<template>
  <div id="app">
    <Reversi msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Reversi from './components/Reversi.vue'

export default {
  name: 'App',
  components: {
    Reversi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
