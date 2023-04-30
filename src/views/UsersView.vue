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
        <NewUser_form />
      </template>
    </modal-window>
    <UsersTable />
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
    };
  },
  methods: {},
};
</script>
