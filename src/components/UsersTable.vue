<template>
  <div class="table">
    <table>
      <caption>
        Пользователи
      </caption>
      <thead>
        <td></td>
        <td>ФИО</td>
        <td>Логин</td>
        <td>Роль</td>
        <td>Отдел</td>
        <td>Активный</td>
        <td>Номер</td>
      </thead>
      <tbody>
        <tr v-for="user in this.allUsers" :key="user.id">
          <td>
            <input
              type="checkbox"
              :id="user.id"
              :value="user.username"
              v-model="checkedUsers[user.id]"
              @click="show"
            />
          </td>
          <td>
            {{ user.username }}
          </td>
          <td>{{ user.username }}</td>
          <td>{{ user.userRoles }}</td>
          <td>{{ user.department }}</td>
          <td>{{ user.active }}</td>
          <td>{{ user.id }}</td>
        </tr>
      </tbody>
    </table>
    <pagination-bar :totalPagesArr="totalPagesArr"></pagination-bar>
    <button @click="show">f</button>
  </div>
</template>

<script>
import PaginationBar from './PaginationBar.vue';
export default {
  name: 'UsersTable',
  components: { PaginationBar },
  data() {
    return {
      allUsers: [],
      totalPagesArr: [],
      checkedUsers: [],
    };
  },
  mounted: function () {
    this.GetUsers();
  },

  methods: {
    GetUsers: function () {
      this.$store.dispatch('Get_users').then(() => {
        this.allUsers = this.$store.state.allUsers;
        this.totalPagesArr = this.$store.state.totalPages;
      });
    },
    show: function () {
      console.log(this.checkedUsers);
    },
  },
};
</script>

<style scoped>
.table {
  padding: 0 28px 0 14px;
  height: 50%;
  overflow: auto auto;
  color: #666a6d;
}
caption {
  margin-right: 100%;
  padding-bottom: 14px;
  font-size: 18px;
  font-weight: 300;
}
table {
  width: 100%;
  text-align: center;
  font-size: 14px;
  border-collapse: collapse;
}
thead td {
  border: 1px solid #e0e0e0;
  color: #22272b;
  height: 26px;
}
tr {
  border: 1px solid #e0e0e0;
  height: 26px;
}
tr:hover {
  background-color: #ebebeb;
}
tr:active {
  background-color: #b163ff;
  color: white;
}
</style>
