<template>
  <div class="login">
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from '../components/Login_form.vue';
export default {
  components: { LoginForm },
  name: 'LoginView',
  methods: {},
};
</script>

<style scoped>
.login {
  height: 100%;
  background-image: url(../assets/Background_big.png);
  background-size: 100% 100%;
}
/* @media screen and (max-width: 1366px) {
  .login {
    height: 100%;
    background-image: url(../assets/Background.png);
    background-size: 100%;
  }
} */

/* @media screen and (min-width: 1366) and (max-width: 2600px) {
 
} */
</style>
