<template>
  <div class="login__form">
    <img class="login__form__logo" src="../assets/Logo.png" title="logo" />
    <form @submit="RegistrationHandler">
      <h4>Регистрация</h4>
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
export default {
  name: 'Registration_form',
  components: {
    ButtonPrimary,
  },
  data: function () {
    return {
      userLogin: '',
      userPassword: '',
      re: [],
    };
  },
  methods: {
    RegistrationHandler: function () {
      let userLogin = this.userLogin;
      let userPassword = this.userPassword;
      this.$store.dispatch('registration', { userLogin, userPassword });
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
