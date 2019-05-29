<template>
  <div id="app">
    <div id="nav">
      <nav-bar></nav-bar>
    </div>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import navBar from '@/components/navBar/index.vue'

@Component({
  components: {
    navBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './src/styles/index.scss';
@import './src/styles/main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  width: 800px;
  margin: 0 auto;
}
#nav {
  padding: 30px 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.wrapper{
  padding: 10px 16px;
  background-color: #fff;
}
</style>
