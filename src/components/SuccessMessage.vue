<template>
  <div class="successMessage">
    <svg
      class="successMessage__successIcon"
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.5" cy="13.5" r="12.5" stroke="#B163FF" stroke-width="2" />
      <path
        d="M6.75 12.7039L11.8252 17.55L18.9 9.45001"
        stroke="#B163FF"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
    <p>Табель успешно сохранен!</p>
    <svg
      class="successMessage__closeIcon"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 2L2 15"
        stroke="#B163FF"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M2 2L15 15"
        stroke="#B163FF"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'SuccessMessage',
};
</script>

<style scoped>
.successMessage {
  position: absolute;
  width: auto;
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
  color: #b163ff;
  background-color: #ead9ff;
  border-radius: 5px;
}
.successMessage__successIcon {
  padding: 14px;
  width: 20px;
  height: 20px;
}
.successMessage__closeIcon {
  height: 12px;
  width: 12px;
  padding: 20px;
}
</style>
