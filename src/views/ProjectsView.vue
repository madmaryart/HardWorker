<template>
  <div>
    <label>
      <button-round @showModal="showModal = !showModal" />
      Создать новый проект
    </label>
    <div class="deleteProjectIcon" @click="DeleteProject">
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
    <projects-table
      :allProjects="allProjects"
      :totalPagesArr="totalPagesArr"
      @GetSelectedProject="SetSelectedProject"
    />
    <modal-window v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <p>Новый проект</p>
      </template>
      <template v-slot:body>
        <NewProject_form
          @EmitSubmitProject="
            (payload) => {
              SubmitProject(payload);
            }
          "
        />
        <!-- @haveResponse="PushTheValue()" -->
      </template>
    </modal-window>
  </div>
</template>

<script>
import ButtonRound from '@/components/ButtonRound.vue';
import ProjectsTable from '@/components/ProjectsTable.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import NewProject_form from '@/components/NewProject_form.vue';

export default {
  components: {
    ButtonRound,
    ProjectsTable,
    ModalWindow,
    NewProject_form,
  },
  name: 'ProjectsView',
  data: function () {
    return {
      showModal: false,
      allProjects: [],
      totalPagesArr: [],
      selectedProject: '',
    };
  },
  mounted: function () {
    this.GetProjects();
  },

  methods: {
    GetProjects: function () {
      this.$store.dispatch('Get_projects').then(() => {
        this.allProjects = this.$store.state.allProjects;
        this.totalPagesArr = this.$store.state.totalPages;
        console.log('i');
      });
    },
    SetSelectedProject: function (projectId) {
      this.selectedProject = projectId;
    },
    DeleteProject: function () {
      this.$store.dispatch('Delete_project', this.selectedProject).then(() => {
        if (this.$store.state.responseStatus) {
          this.GetProjects();
        }
      });

      console.log(this.selectedProject);
      this.selectedProject = '';
      //после удаления в зависимости от ответа зделать повторный запрос списка проекта
    },
    SubmitProject: function (payload) {
      this.$store.dispatch('SubmitProject', payload).then(() => {
        if (this.$store.state.responseStatus) {
          this.GetProjects();
        }
      });
    },
  },
};
</script>
