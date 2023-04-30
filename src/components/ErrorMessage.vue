<template>
  <div class="errorMessage">
    <svg
      class="errorMessage__errorIcon"
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.5" cy="13.5" r="12.5" stroke="#FF7D34" stroke-width="2" />
      <path
        d="M8.0999 18.9L18.8999 8.09998"
        stroke="#FF7D34"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M18.9001 18.9L8.1001 8.09998"
        stroke="#FF7D34"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
    <p>
      Ошибка отправки: количество рабочих часов для проекта “Проект” исчерпано
    </p>
    <svg
      class="errorMessage__closeIcon"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 2L2 15"
        stroke="#ff7d34"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M2 2L15 15"
        stroke="#ff7d34"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'ErrorMessage',
};
</script>

<style scoped>
.errorMessage {
  position: absolute;
  width: auto;
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
  color: #ff7d34;
  background-color: #ffeab3;
  border-radius: 5px;
}
.errorMessage__errorIcon {
  padding: 14px;
  width: 20px;
  height: 20px;
}
.errorMessage__closeIcon {
  height: 12px;
  width: 12px;
  padding: 20px;
}
</style>
