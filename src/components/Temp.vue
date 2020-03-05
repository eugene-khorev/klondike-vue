<template>
  <div>
    <div class="cards">
      <div class="card card-spades card-2"><span></span></div>
      <div class="card card-spades card-3"><span></span></div>
      <div class="card card-spades card-4"><span></span></div>
      <div class="card card-spades card-5"><span></span></div>
      <div class="card card-spades card-6"><span></span></div>
      <div class="card card-spades card-7"><span></span></div>
      <div class="card card-spades card-8"><span></span></div>
      <div class="card card-spades card-9"><span></span></div>
      <div class="card card-spades card-10"><span></span></div>
      <div class="card card-spades card-j"><span></span></div>
      <div class="card card-spades card-q"><span></span></div>
      <div class="card card-spades card-k"><span></span></div>
      <div class="card card-spades card-a"><span></span></div>
      <div class="card card-clubs card-2"><span></span></div>
      <div class="card card-clubs card-3"><span></span></div>
      <div class="card card-clubs card-4"><span></span></div>
      <div class="card card-clubs card-5"><span></span></div>
      <div class="card card-clubs card-6"><span></span></div>
      <div class="card card-clubs card-7"><span></span></div>
      <div class="card card-clubs card-8"><span></span></div>
      <div class="card card-clubs card-9"><span></span></div>
      <div class="card card-clubs card-10"><span></span></div>
      <div class="card card-clubs card-j"><span></span></div>
      <div class="card card-clubs card-q"><span></span></div>
      <div class="card card-clubs card-k"><span></span></div>
      <div class="card card-clubs card-a"><span></span></div>
      <div class="card card-diamonds card-2"><span></span></div>
      <div class="card card-diamonds card-3"><span></span></div>
      <div class="card card-diamonds card-4"><span></span></div>
      <div class="card card-diamonds card-5"><span></span></div>
      <div class="card card-diamonds card-6"><span></span></div>
      <div class="card card-diamonds card-7"><span></span></div>
      <div class="card card-diamonds card-8"><span></span></div>
      <div class="card card-diamonds card-9"><span></span></div>
      <div class="card card-diamonds card-10"><span></span></div>
      <div class="card card-diamonds card-j"><span></span></div>
      <div class="card card-diamonds card-q"><span></span></div>
      <div class="card card-diamonds card-k"><span></span></div>
      <div class="card card-diamonds card-a"><span></span></div>
      <div class="card card-hearts card-2"><span></span></div>
      <div class="card card-hearts card-3"><span></span></div>
      <div class="card card-hearts card-4"><span></span></div>
      <div class="card card-hearts card-5"><span></span></div>
      <div class="card card-hearts card-6"><span></span></div>
      <div class="card card-hearts card-7"><span></span></div>
      <div class="card card-hearts card-8"><span></span></div>
      <div class="card card-hearts card-9"><span></span></div>
      <div class="card card-hearts card-10"><span></span></div>
      <div class="card card-hearts card-j"><span></span></div>
      <div class="card card-hearts card-q"><span></span></div>
      <div class="card card-hearts card-k"><span></span></div>
      <div class="card card-hearts card-a"><span></span></div>
      <div class="card card-hearts card-a card-downturned"><span></span></div>
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
