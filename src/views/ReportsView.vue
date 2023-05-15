<template>
  <div class="home">
    <main>
      <label>
        <ButtonRound @showModal="showModal = true" />
        Заполнить табель за неделю
      </label>
      <div class="deleteReportIcon" @click="DeleteReport">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="19"
          viewBox="0 0 14 19"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.0843 0.703735V6.07309C7.0843 6.53612 7.45473 6.91497 7.90748 6.91497H13.1708V17.8221C13.1708 18.2886 12.8038 18.6639 12.3476 18.6639H0.823176C0.366999 18.6639 0 18.2886 0 17.8221V1.54562C0 1.07908 0.366999 0.703735 0.823176 0.703735H7.0843ZM13.1708 5.19379V4.97981C13.1708 4.75881 13.0851 4.54483 12.9307 4.38698L9.57285 0.949285C9.4185 0.791432 9.20928 0.703735 8.98977 0.703735H8.78054V5.19379H13.1708ZM8.17502 9.56827L9.37796 10.7712L7.70803 12.4411L9.44871 14.1818L8.23508 15.3954L6.49441 13.6548L4.67958 15.4696L3.47665 14.2666L5.29148 12.4518L3.6109 10.7712L4.82452 9.55762L6.5051 11.2382L8.17502 9.56827Z"
            fill="black"
          />
        </svg>
      </div>
      <ReportsTable
        :allReports="allReports"
        :totalPagesArr="totalPagesArr"
        @GetSelectedReport="SetSelectedReport"
      />
      <ReportsTableDetails
        v-if="reportDetails"
        :reportDetails="reportDetails"
      />
      <modal-window v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <p>Новый табель</p>
        </template>
        <template v-slot:body>
          <Report_form
            :week="week"
            @EmitSubmitReport="
              (payload) => {
                SubmitReport(payload);
              }
            "
          />
        </template>
      </modal-window>
      <modal-window v-if="showDialog" @close="showDialog = false">
        <template v-slot:body>
          <p>Удалить выбранный табель</p>
          <ButtonSecondary @wasClicked="showDialog = false"
            >Отмена</ButtonSecondary
          >
          <ButtonPrimary @wasClicked="DispatchRemovalReport"
            >Удалить</ButtonPrimary
          >
        </template></modal-window
      >
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import ReportsTable from '@/components/ReportsTable.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import ButtonRound from '@/components/ButtonRound.vue';
import Report_form from '@/components/Report_form.vue';
import ReportsTableDetails from '@/components/ReportsTableDetails.vue';
import ButtonSecondary from '@/components/ButtonSecondary.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
// import ModalWindow from '@/components/ModalWindow.vue';

export default {
  name: 'ReportsView',
  components: {
    ReportsTable,
    ReportsTableDetails,
    ButtonRound,
    ModalWindow,
    Report_form,
    ButtonPrimary,
    ButtonSecondary,
  },
  data: function () {
    return {
      showModal: false,
      showDialog: false,
      week: [],
      totalPagesArr: [], //Переменная с количеством страниц
      someArr: [],
      allReports: [],
      selectedReport: '',
      reportDetails: null,
    };
  },
  mounted() {
    this.weekDefiner(); // Вызов функции определения периода текущей недели
    this.GetReports(); // Вызов функции получения списка табелей
  },
  methods: {
    // Функция определения периода текущей недели с пн. по вс.
    weekDefiner: function () {
      let currDay = new Date();
      for (let i = 1; i <= 7; i++) {
        let first = currDay.getDate() - currDay.getDay() + i;
        let day = new Date(currDay.setDate(first)).toISOString().slice(0, 10);
        this.week.push(day);
      }
    },
    GetReports: function () {
      // Функция получение списка табелей
      this.$store.dispatch('Get_reports').then(() => {
        this.allReports = this.$store.state.allReports;
        this.totalPagesArr = this.$store.state.totalPages; //Записываем в totalPagesArr количество страниц из store
      });
    },
    GetReportDetails: function () {
      // Функция получения деталей выбранного табеля
      this.$store
        .dispatch('Get_report_details', this.selectedReport)
        .then(() => {
          this.reportDetails = this.$store.state.reportDetails;
        });
    },
    SetSelectedReport: function (reportId) {
      //Запоминаем в переменную ID выбранного из таблицы табеля
      this.selectedReport = reportId;
      //Вызываем функцию получения деталей выбранного табеля
      this.GetReportDetails();
    },
    SubmitReport: function (payload) {
      this.$store.dispatch('SubmitReport', payload).then(() => {
        console.log(payload);
        if (this.$store.state.responseStatus) {
          this.GetReports();
        }
      });
    },
    DeleteReport: function () {
      // Вызываем диалоговое для подтверждения удаления табеля
      if (this.selectedReport) {
        this.showDialog = true;
      }
    },
    DispatchRemovalReport: function () {
      // Удаляем выбранный табель
      this.$store.dispatch('Delete_report', this.selectedReport).then(() => {
        if (this.$store.state.responseStatus == 200) {
          this.showDialog = false;
          this.GetReports();
        }
      });
    },
  },
};
</script>
<style scoped>
label {
  color: #666a6d;
  font-size: 12px;
}
label:hover {
  color: #b163ff;
}
</style>
