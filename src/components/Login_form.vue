<template>
  <div class="login__form">
    <img class="login__form__logo" src="../assets/Logo.png" title="logo" />
    <form @submit.prevent="loginHandler">
      <h4>Авторизация</h4>
      <label>
        Логин
        <input type="text" class="login__form__input" v-model="userLogin" />
      </label>
      <label>
        Пароль
        <input
          type="password"
          class="login__form__input"
          v-model="userPassword"
        />
      </label>
      <ButtonPrimary type="submit" class="login__form__button"
        >Войти</ButtonPrimary
      >
    </form>
  </div>
</template>

<script>
import ButtonPrimary from './ButtonPrimary.vue';
// import { Base64 } from 'js-base64';

export default {
  name: 'Login_form',
  components: {
    ButtonPrimary,
  },
  data: function () {
    return {
      userLogin: 'admin',
      userPassword: 'admin',
      re: [],
    };
  },
  methods: {
    loginHandler: function () {
      let userLogin = this.userLogin;
      let userPassword = this.userPassword;
      this.$store.dispatch('login', { userLogin, userPassword }).then(
        () => this.$router.push('/reports'),
        () => this.$router.push('/registration')
      );
    },
  },
};
</script>

<style scoped>
.login__form {
  height: 100%;
  width: 35%;
  background: rgb(255, 255, 255);
  align-items: center;

  margin: auto;
}
.login__form__logo {
  height: 165px;
  width: 146px;
  margin: auto;
  padding: 20% 0 0 0;
  display: block;
}
form {
  padding: 10% 20% 20% 20%;
  margin: auto;
  display: block;
}
h4 {
  margin: auto;
  padding: 5%;
  display: flex;
  justify-content: center;
}
label {
  display: flex;
  flex-direction: column;
  padding: 5%;
  font-size: 14px;
}
.login__form__button {
  display: block;
  width: 90%;
  margin: auto;
}
</style>
