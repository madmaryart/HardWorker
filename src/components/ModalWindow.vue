<template>
  <div class="modal-mask">
    <!-- <SuccessMessage/> -->
    <!-- <ErrorMessage /> -->
    <div class="modal-wrapper">
      <div class="modal-container">
        <svg
          class="modal-container__closeIcon"
          @click="$emit('close')"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 2L2 15"
            stroke="#8D8D8D"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            d="M2 2L15 15"
            stroke="#8D8D8D"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <header>
          <img src="../assets/Settings.png" class="i" />
          <slot name="header"></slot>
        </header>
        <body>
          <slot name="body"></slot>
        </body>
        <footer>
          <!--  передаем событие закрытия наверх -->
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
//import SuccessMessage from './SuccessMessage';
// import ErrorMessage from './ErrorMessage.vue';

export default {
  name: 'ModalWindow',
  components: {
    //SuccessMessage,
    // ErrorMessage,
  },
  data: function () {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(43, 43, 43, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40%;
  height: auto;
  margin: 0px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 5px;
  overflow: scroll;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  margin-top: 0;
  color: #22272b;
}
p {
  margin-top: 30px;
  margin-bottom: 0px;
  font-size: 18px;
}

img.i {
  animation: 18s linear 0s normal none infinite running i;
}
@keyframes i {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
body {
  height: auto;
}
.modal-container__closeIcon {
  float: right;
}
</style>
