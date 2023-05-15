<template>
  <div>
    <div class="table_drop">
      <table>
        <thead>
          <td></td>
          <td>ФИО</td>
          <td>Логин</td>
          <td>Роль</td>
          <td>Отдел</td>
          <td>Активный</td>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.allUsers" :key="index">
            <td>
              <!-- в checkedUsers складываем выбранных user -->
              <input
                type="checkbox"
                :id="user.id"
                :value="user"
                v-model="checkedUsers"
              />
            </td>
            <td>
              {{ user.username }}
            </td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.department.department }}</td>
            <td>{{ user.active }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div @click="dropUsersToProject">
      <svg
        class="arrow"
        width="26"
        height="29"
        viewBox="0 0 26 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.2449 0.306152C10.588 0.306152 9.24486 1.6493 9.24486 3.30615V12.551H3.99999C1.3624 12.551 0.00854993 15.71 1.82757 17.62L11.1541 27.4128C12.3364 28.6542 14.3167 28.6542 15.4989 27.4128L24.8255 17.62C26.6445 15.71 25.2906 12.551 22.6531 12.551H17.4081V3.30615C17.4081 1.6493 16.065 0.306152 14.4081 0.306152H12.2449Z"
          fill="#C4C4C4"
        />
      </svg>
    </div>
    <div @click="deleteUsersFromProject">
      <svg
        class="arrow"
        width="26"
        height="29"
        viewBox="0 0 26 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.2449 0.306152C10.588 0.306152 9.24486 1.6493 9.24486 3.30615V12.551H3.99999C1.3624 12.551 0.00854993 15.71 1.82757 17.62L11.1541 27.4128C12.3364 28.6542 14.3167 28.6542 15.4989 27.4128L24.8255 17.62C26.6445 15.71 25.2906 12.551 22.6531 12.551H17.4081V3.30615C17.4081 1.6493 16.065 0.306152 14.4081 0.306152H12.2449Z"
          fill="#C4C4C4"
        />
      </svg>
    </div>
    <div class="table_recieve">
      <table>
        <thead>
          <td></td>
          <td>ФИО</td>
          <td>Логин</td>
          <td>Роль</td>
          <td>Отдел</td>
          <td>Активный</td>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.recievedUsers" :key="index">
            <td>
              <input
                type="checkbox"
                :id="user.id"
                :value="user"
                v-model="checkedUsersInRecieved"
              />
            </td>
            <td>
              {{ user.username }}
            </td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.active }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersTable_drop',
  components: {},
  data() {
    return {
      allUsers: [],
      checkedUsers: [],
      checkedUsersInRecieved: [],
      recievedUsers: [],
      recievedUsersId: [],
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
    dropUsersToProject: function () {
      for (let i = 0; i < this.checkedUsers.length; i++) {
        let userIdChecked = this.checkedUsers[i].id;
        for (let a = 0; a < this.allUsers.length; a++) {
          let b = this.allUsers[a].id;
          if (userIdChecked == b) {
            this.allUsers.splice(a, 1);
            this.recievedUsers.push(this.checkedUsers[i]);
            this.recievedUsersId.push(b); //Добавляем ID пользователя в переменную для передачи наверх (для метода POST)
          }
        }
      }
      this.checkedUsers = [];
      this.$emit('GetSelectedUsers', this.recievedUsersId);
    },
    deleteUsersFromProject: function () {
      console.log(this.recievedUsers);
      console.log(this.checkedUsersInRecieved);
      for (let i = 0; i < this.checkedUsersInRecieved.length; i++) {
        let checkedUsersInRecievedId = this.checkedUsersInRecieved[i].id;
        for (let j = 0; j < this.recievedUsers.length; j++) {
          if (checkedUsersInRecievedId == this.recievedUsers[j].id) {
            this.recievedUsers.splice(j, 1);
            this.allUsers.push(this.checkedUsersInRecieved[i]);
          }
        }
      }
      this.checkedUsersInRecieved = [];
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
