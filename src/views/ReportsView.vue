<template>
  <div class="home">
    <main>
      <label>
        <ButtonRound @showModal="showModal = true" />
        Заполнить табель за неделю
      </label>

      <ReportsTable />
      <modal-window v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <p>Новый табель за период:</p>
        </template>
        <template v-slot:body>
          <Report_form :week="week" />
        </template>
      </modal-window>

      <!-- <ModalWindow v-if="showModal" @close="showModal = false"> </ModalWindow> -->
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import ReportsTable from '@/components/ReportsTable.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import ButtonRound from '@/components/ButtonRound.vue';
import Report_form from '@/components/Report_form.vue';

// import ModalWindow from '@/components/ModalWindow.vue';

export default {
  name: 'ReportsView',
  components: {
    ReportsTable,
    ButtonRound,
    ModalWindow,
    Report_form,
  },
  data: function () {
    return {
      showModal: false,
      week: [],
    };
  },
  mounted() {
    this.weekDefiner();
  },
  methods: {
    weekDefiner: function () {
      let currDay = new Date();
      for (let i = 1; i <= 7; i++) {
        let first = currDay.getDate() - currDay.getDay() + i;
        let day = new Date(currDay.setDate(first)).toISOString().slice(0, 10);
        this.week.push(day);
      }
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
