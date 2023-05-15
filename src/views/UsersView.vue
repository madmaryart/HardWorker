<template>
  <div>
    <label>
      <button-round @showModal="modalOpened = true" />
      Создать нового пользователя
    </label>
    <modal-window v-if="modalOpened" @close="modalOpened = false">
      <template v-slot:header>
        <p>Новый пользователь</p>
      </template>
      <template v-slot:body>
        <NewUser_form
          @EmitSubmitUser="
            (payload) => {
              SubmitUser(payload);
            }
          "
        />
      </template>
    </modal-window>
    <UsersTable :allUsers="allUsers" />
  </div>
</template>

<script>
import ButtonRound from '@/components/ButtonRound.vue';
import UsersTable from '../components/UsersTable.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import NewUser_form from '@/components/NewUser_form.vue';
export default {
  components: {
    UsersTable,
    ButtonRound,
    ModalWindow,
    NewUser_form,
  },
  name: 'UserView',
  data() {
    return {
      modalOpened: false,
      allUsers: [],
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
    SubmitUser: function (payload) {
      this.$store.dispatch('SubmitUser', payload).then(() => {
        if (this.$store.state.responseStatus) {
          this.GetUsers();
        }
      });
    },
  },
};
</script>
