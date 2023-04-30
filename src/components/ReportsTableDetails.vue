<template>
  <div class="table">
    <div class="reportDescription">
      <p>
        Табель за период:
        {{ this.$props.reportDetails[0].dateFrom }} -
        {{ this.$props.reportDetails[0].dateTo }}
      </p>
      <p>
        Пользователь:
        {{ this.$props.reportDetails[0].user.username }}
      </p>
      <p>
        Отдел:
        {{ this.$props.reportDetails[0].user.department }}
      </p>
    </div>

    <table>
      <thead>
        <td>Проект</td>
        <td>Вид работ</td>
        <td>Содержание работ</td>
        <td>дата</td>
      </thead>
      <tbody>
        <tr
          v-for="reportDetail in this.$props.reportDetails"
          :key="reportDetail.id"
        >
          <td>{{ reportDetail.projectDescription }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReportsTable',
  data() {
    return {};
  },
  props: {
    reportDetails: null,
  },
  methods: {},
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
