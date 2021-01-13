import Vue from 'vue'
import Vuex from 'vuex'

import cards from './modules/cards'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    cards,
  },
});

export default store;
