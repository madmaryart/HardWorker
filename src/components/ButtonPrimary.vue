<template>
  <button class="buttonPrimary" @click="$emit('wasClicked')">
    <slot>Сохранить</slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonPrimary',
};
</script>

<style scoped>
.buttonPrimary {
  margin: 14px;
  height: 35px;
  width: 135px;
  border-radius: 5px;
  border: none;
  background-color: #b163ff;
  color: white;
  font-size: 14px;
  box-shadow: 0 8px 15px #bf7fff;
}
.buttonPrimary:hover {
  background-color: #a64dff;
}
</style>
