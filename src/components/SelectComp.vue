<template>
  <div class="select-wrapper">
    <div
      class="select"
      @click="ToggleHandler()"
      :isSelectedName="isSelectedName"
      :class="{ opened: isOpened }"
    >
      {{ isSelectedName }}
      <svg
        class="select__arrow"
        v-if="!isOpened"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 6L0 0H10L5 6Z" fill="#5F5F5F" />
      </svg>
    </div>
    <div class="select__body" v-if="isOpened">
      <div
        class="select__body__option"
        v-for="item in itemList"
        :key="Object.values(item)[0]"
        @click="setSelectedProp(Object.values(item)[1], Object.values(item)[0])"
      >
        {{ Object.values(item)[1] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectComp',
  data: function () {
    return {
      isOpened: false,
      isSelectedName: 'Выберите',
      isSelectedId: '',
    };
  },
  props: {
    itemList: [],
  },
  methods: {
    ToggleHandler: function () {
      this.isOpened = !this.isOpened;
    },
    HideSelect: function (e) {
      if (!e.target.classList.contains('select__body__option')) {
        //ха ха ха!!!
        this.isOpened = false;
      }

      console.log(e.target);
    },
    setSelectedProp: function (name, id) {
      this.isSelectedName = name;
      this.isSelectedId = id;
      console.log(this.isSelectedName, this.isSelectedId);
      this.$emit('GetSelectedItem', [this.isSelectedId, this.isSelectedName]);
      this.isOpened = !this.isOpened;
    },
  },

  mounted() {
    document.addEventListener('click', this.HideSelect, true);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.HideSelect, true);
  },
};
</script>

<style scoped>
.select {
  margin: 0;
  display: flex;
  height: 26px;
  width: 100%;
  padding: 4px;
  border: 1px solid #bbbbbb;
  border-radius: 2px;
  font-size: 14px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}
.select__arrow {
  margin: 2px;
}
.select__body {
  position: fixed;
}
.select__body__option {
  height: 26px;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 8px 15px #c0c0c0;
  width: 100%;
  font-size: 14px;
  padding: 4px;
  box-sizing: border-box;
}
.select__body__option:hover {
  background-color: #ebebeb;
}
.opened {
  border: 1px solid #b163ff;
}
</style>
