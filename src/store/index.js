import Vue from 'vue';
import Vuex from 'vuex';
import { Base64 } from 'js-base64';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLogin: '',
    userPassword: '',
    profileInfo: [],
    coded: '',
    allReports: [],
    reportDetails: [],
    reportId: null,
    allProjects: [],
    allUsers: [],
    allRoles: [],
    allDepartments: [],
    page: 0, //текущая страница результатов
    size: 50, //показано результатов на странице
    totalPages: null, //всего страниц результатов (в зависимости от size в т.ч.)
    totalElements: null, //всего результатов
    project: {},
  },
  getters: {},
  mutations: {
    // Мутации - для изменения state
    auth_request(state, { userLogin, userPassword }) {
      state.userLogin = userLogin;
      state.userPassword = userPassword;
      state.coded = Base64.encode(userLogin + ':' + userPassword); // Переменная - кодировка авторизационных данных
    },
    profile_answer(state, profileInfo) {
      state.profileInfo = profileInfo; // Из ответа записываем данные о авторизованном пользователе
    },
    allReports_request(state, allReports) {
      state.allReports = allReports.data; // Из ответа записываем в переменную store данные с существующими табелями
      state.totalPages = allReports.totalPages; // Из ответа записываем в переменную store данные с количеством страниц
      state.totalElements = allReports.totalElements; // Из ответа записываем в переменную store данные с количеством элементов (табелей)
    },
    reportDetails_request(state, reportId) {
      state.reportId = reportId; // Записали в переменную store ID табеля, детали которого нужны
    },
    reportDetails_answer(state, reportDetails) {
      state.reportDetails = reportDetails.data; //Записали данные в переменную store (детали табеля)
    },
    allProjects_request(state, allProjects) {
      state.allProjects = allProjects.data;
      state.totalPages = allProjects.totalPages;
      state.totalElements = allProjects.totalElements;
    },
    allUsers_request(state, allUsers) {
      state.allUsers = allUsers.data;
      state.totalPages = allUsers.totalPages;
      state.totalElements = allUsers.totalElements;
    },
    allRoles_request(state, allRoles) {
      state.allRoles = allRoles.data;
    },
    allDepartments_request(state, allDepartments) {
      state.allDepartments = allDepartments.data;
    },
    allProject_response(state, project) {
      state.project = project;
    },
  },
  actions: {
    // Здесь я делаю запросы :)
    login({ commit }, { userLogin, userPassword }) {
      return new Promise((resolve, reject) => {
        commit('auth_request', { userLogin, userPassword });
        let myHeaders = new Headers();
        console.log(this.state.coded);
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/profile', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('profile_answer', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
        console.log(this.state.profileInfo);
      });
    },
    Get_reports({ commit }) {
      // Запрос списка табелей
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'http://127.0.0.1:8085/hardworker/tables?page=' +
            this.state.page +
            '&size=' +
            this.state.size,
          requestOptions
        )
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('allReports_request', data);
                console.log(this.state.totalPages);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    Get_report_details({ commit }, reportId) {
      //Запрос детальной информации табеля по ID
      return new Promise((resolve, reject) => {
        commit('reportDetails_request', reportId);
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'http://127.0.0.1:8085/hardworker/tables/data?tableId=' +
            this.state.reportId,
          requestOptions
        )
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('reportDetails_answer', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    Update_profile_info({ commit }) {
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        console.log(this.state.coded);
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/profile', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('profile_answer', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    SubmitReport(commit, reportForSubmit) {
      // Отправка заполненного табеля
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(reportForSubmit);
        console.log(reportForSubmit);
        console.log(raw);
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/table', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              commit(resolve());
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    Get_projects({ commit }) {
      // Запрос списка проектов
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'http://127.0.0.1:8085/hardworker/projects?page=' +
            this.state.page +
            '&size=' +
            this.state.size,
          requestOptions
        )
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('allProjects_request', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    Get_users({ commit }) {
      // Запрос списка пользователей
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'http://127.0.0.1:8085/hardworker/users?page=' +
            this.state.page +
            '&size=' +
            this.state.size,
          requestOptions
        )
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('allUsers_request', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    SubmitUser({ commit }, userForSubmit) {
      // Отправка нового пользователя
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(userForSubmit);
        console.log(userForSubmit);
        console.log(raw);
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/user', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              commit(resolve());
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    SubmitProject({ commit }, projectForSubmit) {
      // Отправка нового проекта
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify(projectForSubmit);

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/project?', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('allProject_response', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
        console.log(projectForSubmit);
      });
    },
    Get_AllRoles({ commit }) {
      // Получить список ролей (для выпадающего списка)
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/roles', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('allRoles_request', data);
                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    Get_allDepartments({ commit }) {
      // Запрос списка всех отделов (для выпадающего списка)
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch('http://127.0.0.1:8085/hardworker/departments', requestOptions)
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                commit('allDepartments_request', data);

                resolve();
              });
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
    Delete_project(commit, projectId) {
      return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + this.state.coded);
        let requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(
          'http://127.0.0.1:8085/hardworker/project?id=' + projectId,
          requestOptions
        )
          .then((response) => {
            if (response.status == 200) {
              commit(resolve());
            } else reject(console.log('no'));
          })
          .catch((error) => {
            reject(error, console.log('no'));
          });
      });
    },
  },
  modules: {},
});
