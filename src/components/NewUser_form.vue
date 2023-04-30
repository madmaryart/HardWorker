<template>
  <div class="NewUserForm">
    <label>
      Имя
      <input type="text" v-model="user.username" />
    </label>
    <label>
      Логин:
      <input type="text" v-model="user.login" />
    </label>
    <label>
      Пароль:
      <input type="text" v-model="user.password" />
    </label>
    <!-- <label>
      Подтверждение пароля:
      <input type="text" />
    </label> -->
    <label>
      Отдел:
      <SelectComp
        :itemList="allDepartments"
        @GetSelectedItem="toWriteSelectedDepartment"
      />
    </label>
    <label>
      Роль:
      <SelectComp :itemList="allRoles" @GetSelectedItem="toWriteSelectedRole" />
    </label>
    <button-primary @wasClicked="submitUser">Создать</button-primary>
    <button-secondary @wasClicked="$parent.$emit('close')"
      >Отмена</button-secondary
    >
  </div>
</template>

<script>
import ButtonPrimary from './ButtonPrimary.vue';
import ButtonSecondary from './ButtonSecondary.vue';
import SelectComp from './SelectComp.vue';

export default {
  name: 'NewUser_form',
  components: {
    SelectComp,
    ButtonPrimary,
    ButtonSecondary,
  },
  data: function () {
    return {
      allRoles: [],
      allDepartments: [],
      user: {
        login: '',
        password: '',
        department: '',
        username: '',
        role: '',
      },
    };
  },
  mounted() {
    this.$store
      .dispatch('Get_AllRoles')
      .then(() => (this.allRoles = this.$store.state.allRoles));
    this.$store
      .dispatch('Get_allDepartments')
      .then(() => (this.allDepartments = this.$store.state.allDepartments));
  },
  methods: {
    submitUser: function () {
      this.$store.dispatch('SubmitUser', this.user);
    },
    toWriteSelectedDepartment: function (isSelectedId) {
      this.user.department = isSelectedId;
      console.log(this.user.department);
    },
    toWriteSelectedRole: function (isSelectedId) {
      this.user.role = isSelectedId;
    },
  },
};
</script>
<style scoped>
.NewUserForm {
  display: flex;
  flex-direction: column;
}
label {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>
