<template>
  <div class="reportForm">
    <p class="week">за период: {{ this.week[0] }} - {{ this.week[6] }}</p>
    <table>
      <thead>
        <td>Проект</td>
        <td>Вид работ</td>
        <td>Содержание работ</td>
        <td>{{ week[0] }}</td>
        <td>{{ week[1] }}</td>
        <td>{{ week[2] }}</td>
        <td>{{ week[3] }}</td>
        <td>{{ week[4] }}</td>
        <td>{{ week[5] }}</td>
        <td>{{ week[6] }}</td>
      </thead>
      <tbody>
        <tr>
          <td>
            <SelectComp
              class="projects"
              :itemList="listProjects"
              @GetSelectedItem="
                (payload) => {
                  ToWriteValues(payload);
                }
              "
            />
          </td>
          <td><textarea v-model="report.projectType"></textarea></td>
          <td><textarea v-model="report.projectDescription"></textarea></td>
          <td><textarea v-model="report.monday"></textarea></td>
          <td><textarea v-model="report.tuesday"></textarea></td>
          <td><textarea v-model="report.wednesday"></textarea></td>
          <td><textarea v-model="report.thursday"></textarea></td>
          <td><textarea v-model="report.friday"></textarea></td>
          <td><textarea v-model="report.saturday"></textarea></td>
          <td><textarea v-model="report.sunday"></textarea></td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <ButtonSecondary @wasClicked="$parent.$emit('close')" />
      <ButtonPrimary @wasClicked="EmitHandler">Отправить</ButtonPrimary>
    </div>
  </div>
</template>

<script>
import SelectComp from '../components/SelectComp.vue';
import ButtonPrimary from './ButtonPrimary.vue';
import ButtonSecondary from './ButtonSecondary.vue';
export default {
  name: 'Report_form',
  components: { SelectComp, ButtonPrimary, ButtonSecondary },
  data() {
    return {
      listProjects: [],
      report: {
        dateFrom: '',
        dateTo: '',
        projectType: '',
        projectDescription: '',
        projectId: '',
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
    };
  },
  props: {
    week: [],
  },
  mounted: function () {
    this.updateProjectList();
  },
  methods: {
    updateProjectList: function () {
      this.$store
        .dispatch('Update_profile_info')
        .then((this.listProjects = this.$store.state.profileInfo.listProjects));
      console.log(this.listProjects);
    },
    ToWriteValues: function (payload) {
      // console.log(payload);
      this.report.projectId = payload[0];
    },
    EmitHandler() {
      this.report.dateFrom = this.week[0];
      this.report.dateTo = this.week[6];
      this.$emit('EmitSubmitReport', this.report);
      this.$parent.$emit('close');
    },
    // SubmitReport: function () {
    //   this.report.date_from = this.week[0];
    //   this.report.date_to = this.week[6];
    //   this.$store
    //     .dispatch('SubmitReport', this.report)
    //     .then(this.$store.dispatch('Get_reports'));
    // },
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

textarea {
  border: none;
  overflow: auto;
  outline: none;
  background: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  padding: 5px;
  width: 90%;
}
.projects {
  width: 120px;
}
.reportForm {
  align-items: center;
}
.week {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  font-size: 18px;
}
.buttons {
  display: flex;
  justify-content: center;
}
</style>
