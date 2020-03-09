import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";

import * as cards from './modules/cards'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    cards: cards.store,
  },
  // plugins: [createPersistedState()],
});

store.subscribe((mutation, state) => {
  let savedState;
  try {
    savedState = JSON.parse(localStorage.getItem('vuex'));
  } catch(e) {
    // Invalid JSON
  }

  if (!savedState) {
    savedState = [];
  }
  savedState.push(state);

  localStorage.setItem('vuex', JSON.stringify(savedState));
});

export default store;
