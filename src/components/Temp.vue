<template>
  <div>
    <h1>Stock</h1>
    <ul>
      <li v-for="card in getCards('stock.cards')" v-bind:key="getCardKey(card)">{{ getCardKey(card) }}</li>
    </ul>
  </div>
</template>

<script>
import '@/styles/Temp.scss'

import { mapState, mapGetters, mapActions } from 'vuex'
import  '@/store/modules/cards'

export default {
  computed: {
    ...mapState({
      stock: state => state.stock,
      piles: state => state.piles,
    }),
    ...mapGetters('cards', {
      getCards: 'getCards',
    })
  },

  methods: {
    ...mapActions('cards', {
      initGameState: 'GenerateInitialState',
    }),
    getCardKey: (card) => card.rank + ' of ' + card.suit,
  },

  created() {
    this.initGameState();
  },

  mounted() {
  },
}
</script>
