import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorageState from '@/plugins/local-storage-state';

import cards from './modules/cards'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    cards,
  },
});

Vue.use(LocalStorageState, { store });

export default store;
