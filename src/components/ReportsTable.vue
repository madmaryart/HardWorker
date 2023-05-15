<template>
  <div class="table">
    <table>
      <caption>
        Табели
      </caption>
      <thead>
        <td>Период</td>
        <td>Отдел</td>
        <td>Пользователь</td>
        <td>Номер</td>
      </thead>
      <tbody>
        <tr
          v-for="report in this.allReports"
          :key="report.tableId"
          @click="SelectThisReport(report.tableId)"
        >
          <td>
            {{ report.dateFrom }} -
            {{ report.dateTo }}
          </td>
          <td>
            {{ report.departmentName }}
          </td>
          <td>
            {{ report.userName }}
          </td>
          <td>
            {{ report.tableId }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Передаем в пагинацию props переменную totalPagesArr с количеством страниц -->
    <PaginationBar :totalPagesArr="this.totalPagesArr" />
  </div>
</template>

<script>
import PaginationBar from '@/components/PaginationBar.vue';
export default {
  name: 'ReportsTable',
  components: { PaginationBar },
  data() {
    return {
      selectedReport: '',
    };
  },
  props: {
    allReports: [],
    totalPagesArr: [], //Переменная с количеством страниц
  },

  methods: {
    SelectThisReport: function (reportId) {
      this.selectedReport = reportId;
      this.$emit('GetSelectedReport', this.selectedReport);
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
