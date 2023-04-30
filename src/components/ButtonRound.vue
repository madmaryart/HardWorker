<template>
  <button class="buttonRound" @click="$emit('showModal')">+</button>
</template>

<script>
export default {
  name: 'ButtonRound',
  props: {},
};
</script>

<style scoped>
.buttonRound {
  margin: 14px;
  height: 32px;
  width: 32px;
  border-radius: 100px;
  border: none;
  background-color: #b163ff;
  color: white;
  font-size: 20px;
  box-shadow: 0 8px 15px #bf7fff;
}
.buttonRound:hover {
  background-color: #a64dff;
}
</style>
