<template>
  <div>
    <div class="cards">
      <div class="card card-spades card-5"><span></span></div>
      <div class="card card-clubs card-4"><span></span></div>
      <div class="card card-diamonds card-3"><span></span></div>
      <div class="card card-hearts card-2"><span></span></div>
      <div class="card card-spades card-a"><span></span></div>
      <div class="card card-hearts card-10"><span></span></div>
      <div class="card card-clubs card-j"><span></span></div>
      <div class="card card-hearts card-a card-downturned"><span></span></div>
      <div class="clear"></div>
    </div>
    
    <h1>Stock</h1>
    <ul>
      <li v-for="card in getCards('stock.cards')" v-bind:key="getCardKey(card)">{{ getCardKey(card) }}</li>
    </ul>
  </div>
</template>

<script>
import '@/styles/Temp.scss'
import '@/styles/Cards.scss'

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
