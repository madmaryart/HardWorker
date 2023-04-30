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
          v-on:click="showReportDetails(report.tableId)"
        >
          <td>
            {{ report.dateFrom }} -
            {{ report.dateTo }}
          </td>
          <td>
            {{ report.userName }}
          </td>
          <td>
            {{ report.departmentName }}
          </td>
          <td>
            {{ report.tableId }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Передаем в пагинацию props переменную totalPagesArr с количеством страниц -->
    <PaginationBar :totalPagesArr="this.totalPagesArr" />
    <ReportsTableDetails v-if="reportDetails" :reportDetails="reportDetails" />
  </div>
</template>

<script>
import ReportsTableDetails from '@/components/ReportsTableDetails.vue';
import PaginationBar from '@/components/PaginationBar.vue';
export default {
  name: 'ReportsTable',
  components: { ReportsTableDetails, PaginationBar },
  data() {
    return {
      totalPagesArr: [], //Переменная с количеством страниц
      someArr: [],
      allReports: [],
      selectedRowReportId: null,
      reportDetails: null,
    };
  },
  mounted: function () {
    this.GetReports();
  },

  methods: {
    showReportDetails: function (reportId) {
      this.selectedRowReportId = reportId;
      this.GetReportDetails();
    },
    GetReports: function () {
      this.$store.dispatch('Get_reports').then(() => {
        this.allReports = this.$store.state.allReports;
        this.totalPagesArr = this.$store.state.totalPages; //Записываем в totalPagesArr количество страниц из store
      });
    },
    GetReportDetails: function () {
      this.$store
        .dispatch('Get_report_details', this.selectedRowReportId)
        .then(() => {
          this.reportDetails = this.$store.state.reportDetails;
        });
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
