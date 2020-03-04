<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <AudioVue />
  </div>
</template>

<script>
import AudioVue from "./components/Audio";
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    AudioVue,
    Header
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  /* display: flex;
  flex-direction: column; */
  max-width: 100%;
  margin: 0 auto;
}
</style>
