<template>
  <div class="table">
    <table>
      <caption>
        Проекты
      </caption>
      <thead>
        <td>Название</td>
        <td>Заказчик</td>
        <td>Номер</td>
        <td>Участники</td>
      </thead>
      <tbody>
        <tr
          v-for="project in this.allProjects"
          :key="project.id"
          @click="SelectThisProject(project.id)"
        >
          <td>{{ project.name }}</td>
          <td>{{ project.customer }}</td>
          <td>{{ project.id }}</td>
          <td>{{ project.listUsers }}</td>
        </tr>
      </tbody>
    </table>
    <pagination-bar :totalPagesArr="totalPagesArr"></pagination-bar>
  </div>
</template>

<script>
import PaginationBar from './PaginationBar.vue';
export default {
  name: 'ProjectsTable',
  components: { PaginationBar },
  data() {
    return {
      selectedProject: '',
    };
  },
  props: {
    allProjects: [],
    totalPagesArr: [], //Переменная с количеством страниц
  },
  methods: {
    SelectThisProject: function (projectId) {
      this.selectedProject = projectId;
      this.$emit('GetSelectedProject', this.selectedProject);
      let myCollection = document.getElementsByClassName('active'); //Логика отображения выделения строчки в таблице
      for (let i = 0; i < myCollection.length; i++) {
        let elementOfCollection = myCollection[i];
        elementOfCollection.classList.remove('active'); //Удаляем класс активный у всех строчек
      }
      event.currentTarget.classList.add('active'); //Подключаем класс активный к кликнутой строчке
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
