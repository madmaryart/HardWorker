<template>
  <div class="registration">
    <RegistrationForm />
  </div>
</template>
<script>
import RegistrationForm from '../components/Registration_form.vue';
export default {
  components: { RegistrationForm },
  name: 'LoginView',
  methods: {},
};
</script>

<style scoped>
.registration {
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
