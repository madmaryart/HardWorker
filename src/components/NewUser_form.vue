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
        @GetSelectedItem="
          (payload) => {
            ToWriteValuesDepartment(payload);
          }
        "
      />
    </label>
    <label>
      Роль:
      <SelectComp
        :itemList="allRoles"
        @GetSelectedItem="
          (payload) => {
            ToWriteValuesRole(payload);
          }
        "
      />
    </label>
    <div class="buttons">
      <button-primary @wasClicked="EmitHandler">Создать</button-primary>
      <button-secondary @wasClicked="$parent.$emit('close')"
        >Отмена</button-secondary
      >
    </div>
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
    EmitHandler: function () {
      this.$emit('EmitSubmitUser', this.user);
      this.$parent.$emit('close');
    },

    ToWriteValuesDepartment: function (payload) {
      this.user.department = payload[1];
      console.log(this.user.department);
    },
    ToWriteValuesRole: function (payload) {
      this.user.role = payload[1];
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
.buttons {
  display: flex;
  justify-content: center;
}
</style>
