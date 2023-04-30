<template>
  <header class="header">
    <img class="header__logo" src="../assets/Logo_black.svg" />
    <div class="header__logout-section">
      <UserIcon />
      <div>
        <p>{{ this.$store.state.profileInfo.username }}</p>
        <a href="">Выйти</a>
      </div>
    </div>
  </header>
</template>

<script>
import UserIcon from './icons/UserIcon.vue';
export default {
  name: 'HeadBlock',
  components: {
    UserIcon,
  },
};
</script>

<style scoped>
.header {
  height: 60px;
  border-bottom: #e0e0e0 solid 1px;
  font-size: 14px;
}
.header__logo {
  margin: 12px;
  margin-left: 28px;
  width: 84px;
}
.header__logout-section {
  display: flex;
  align-items: center;
  float: right;
  margin: 12px;
  margin-right: 28px;
  color: #22272b;
}
.header__logout-section p {
  margin: 0 0 2px 6px;
}
.header__logout-section a {
  margin: 0 0 0 6px;

  color: #b163ff;
}
.header__logout-section svg {
  height: 32px;
  width: 32px;
}
</style>
