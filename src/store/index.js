import Vue from 'vue'
import Vuex from 'vuex'
import * as cards from './modules/cards'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    cards: cards.store,
  },
})
