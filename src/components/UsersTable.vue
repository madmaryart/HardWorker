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
        <tr v-for="user in this.allUsers" :key="user.id" @click="SelectUserRow">
          <td>
            <input
              type="checkbox"
              :id="user.id"
              :value="user.username"
              v-model="checkedUsers[user.id]"
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
  </div>
</template>

<script>
import PaginationBar from './PaginationBar.vue';
export default {
  name: 'UsersTable',
  components: { PaginationBar },
  data() {
    return {
      totalPagesArr: [],
      checkedUsers: [],
    };
  },
  props: {
    allUsers: [],
  },

  methods: {
    SelectUserRow: function () {
      let myCollection = document.getElementsByClassName('active'); //Логика отображения выделения строчки в таблице
      for (let i = 0; i < myCollection.length; i++) {
        let elementOfCollection = myCollection[i];
        elementOfCollection.classList.remove('active'); //Удаляем класс активный у всех строчек
      }
      event.currentTarget.classList.add('active'); //Подключаем класс активный к кликнутой строчке
      console.log(event.currentTarget);
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
  cursor: pointer;
}
tr:hover {
  background-color: #e5caff;
}
.active {
  background-color: #e5caff;
  color: #22272b;
}
</style>
