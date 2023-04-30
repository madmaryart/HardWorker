<template>
  <button class="ButtonSecondary" @click="$emit('wasClicked')">
    <slot>Отмена</slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonSecondary',
};
</script>

<style scoped>
.ButtonSecondary {
  margin: 14px;
  height: 35px;
  width: 135px;
  border-radius: 5px;
  border: none;
  background-color: #ffb23d;
  color: white;
  font-size: 14px;
  box-shadow: 0 8px 15px #ffb74b;
}
.ButtonSecondary:hover {
  background-color: #ffa41c;
}
</style>
