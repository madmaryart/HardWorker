<template>
  <div class="NewProjectForm">
    <label>
      Название проекта:
      <input type="text" v-model="name" />
    </label>
    <label>
      Название заказчика:
      <input type="text" v-model="customer" />
    </label>
    <label>
      Заложено рабочих часов:
      <input type="number" v-model="laidTime" />
    </label>
    <p>Добавить пользователей:</p>
    <UsersTable_drop
      class="transfer"
      @GetSelectedUsers="ToWriteSelectedUsers"
    />
    <div class="buttons">
      <button-primary @wasClicked="EmitHandler">Сохранить</button-primary>
      <button-secondary @wasClicked="$parent.$emit('close')"
        >Отмена</button-secondary
      >
    </div>
  </div>
</template>

<script>
import ButtonPrimary from './ButtonPrimary.vue';
import ButtonSecondary from './ButtonSecondary.vue';
import UsersTable_drop from './UsersTable_drop.vue';

export default {
  name: 'NewProject_form',
  components: {
    ButtonPrimary,
    ButtonSecondary,
    UsersTable_drop,
  },
  data: function () {
    return {
      name: '',
      customer: '',
      laidTime: 0,
      listUsers: [],
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
    EmitHandler() {
      let name = this.name;
      let customer = this.customer;
      let laidTime = this.laidTime;
      let listUsers = this.listUsers;
      this.$emit('EmitSubmitProject', { name, customer, laidTime, listUsers });
      this.$parent.$emit('close');
    },

    ToWriteSelectedUsers: function (recievedUsersId) {
      this.listUsers = recievedUsersId;
    },
  },
};
</script>
<style scoped>
.NewProjectForm {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
input {
  border-color: #bbbbbb;
  border-radius: 2px;
}
label {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.transfer {
  height: 400px;
  overflow: scroll;
}
.buttons {
  display: flex;
  justify-content: center;
}
</style>
