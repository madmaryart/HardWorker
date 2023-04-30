<template>
  <div>
    <p v-for="index in this.totalPagesArr" :key="index">{{ index }}</p>
  </div>
</template>

<script>
export default {
  name: 'PaginationBar',
  components: {},
  data: function () {
    return {};
  },
  props: {
    totalPagesArr: [],
  },
  mounted: function () {},
  methods: {},
};
</script>
<style scoped></style>
