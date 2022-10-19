import { createStore } from 'vuex'

export default createStore({
  state: {
    language: sessionStorage.getItem("localeLang") || 'zhCn'
  },
  mutations: {
    // 修改语言
    CHANGE_LANGUAGE(state, value: string) {
      state.language = value;
      sessionStorage.setItem("localeLang", value);
    }
  },
  getters: {
    getLanguage: state => {
      return state.language;
    }
  },
  actions: {
  },
  modules: {
  }
})
