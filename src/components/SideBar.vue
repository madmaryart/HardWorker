<template>
  <nav class="sidebar">
    <ul>
      <li>
        <a href="#/reports"> <TabelIcon />Табели </a>
      </li>
      <li>
        <a href="#/projects"><FolderIcon /> Проекты</a>
      </li>
      <li>
        <a href="#/users"><UserIcon /> Пользователи</a>
      </li>
      <li>
        <a href="#/statistic"><StatisticIcon />Статистика</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import TabelIcon from './icons/TabelIcon.vue';
import FolderIcon from './icons/FolderIcon.vue';
import UserIcon from './icons/UserIcon.vue';
import StatisticIcon from './icons/StatisticIcon.vue';
export default {
  name: 'SideBar',
  components: {
    TabelIcon,
    FolderIcon,
    UserIcon,
    StatisticIcon,
  },
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.sidebar {
  height: 90%;
  width: 210px;
  float: left;
  border-right: 1px solid #e0e0e0;
}
.sidebar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.sidebar ul li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.sidebar ul li a {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  height: 46px;
  width: 100%;
  color: #22272b;
  text-decoration: none;
  font-size: 14px;
  padding-left: 28px;
  margin: 0;
}
.sidebar ul li a:hover {
  background-color: #ead9ff;
}
.sidebar ul li a svg {
  padding-right: 28px;
}
.active {
  background-color: #ead9ff;
}
</style>
