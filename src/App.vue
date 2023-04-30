<template>
  <div id="app">
    <HeadBlock v-if="!hide" />
    <SideBar v-if="!hide" />

    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import HeadBlock from './components/HeadBlock.vue';

export default {
  components: {
    SideBar,
    HeadBlock,
  },
  computed: {
    hide() {
      return this.$route.name === 'login' || this.$route.name === 'register';
    },
  },
};
</script>

<style>
#app {
  font-family: Roboto;
  height: 100%;
}
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}

::-webkit-scrollbar {
  width: 4px;
  border: 1px solid #d5d5d5;
}
::-webkit-scrollbar-track {
  border-radius: 0;
  background: #eeeeee;
}
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #b163ff;
}
</style>
