import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/LoginView';
import RegistrationView from '../views/RegistrationView';
import ReportsView from '../views/ReportsView';
import ProjectsView from '../views/ProjectsView';
import UsersView from '../views/UsersView';
import StatisticView from '../views/StatisticView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView,
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsView,
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: StatisticView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
