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
    <UsersTable_drop @GetSelectedUsers="ToWriteSelectedUsers" />

    <button-primary @wasClicked="SubmitProject">Сохранить</button-primary>
    <button-secondary @wasClicked="$parent.$emit('close')"
      >Отмена</button-secondary
    >
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
    SubmitProject: function () {
      let name = this.name;
      let customer = this.customer;
      let laidTime = this.laidTime;
      let listUsers = this.listUsers;
      this.$store
        .dispatch('SubmitProject', {
          name,
          customer,
          laidTime,
          listUsers,
        })
        .then(this.$parent.$emit('haveResponse', this.$store.state.project));
      console.log({ name, customer, laidTime, listUsers });

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
}
label {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>
