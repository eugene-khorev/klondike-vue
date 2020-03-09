<template>
  <div id="app">
    <div class="card-grid">
      <div class="card-row">
        <div class="card-column three-cards">
          <StockArea/>
        </div>
        <div class="card-column four-cards">
          <FoundationArea/>
        </div>
      </div>
      <div class="card-row">
        <div class="card-column seven-cards">
          <PileArea/>
        </div>
      </div>
    </div>

    <div class="buttons">
      <button v-on:click="generateNewGame">New game</button>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: #406040	;
  text-align: center;
}
</style>

<script>
import { mapActions } from 'vuex';

import StockArea from '@/components/StockArea.vue';
import FoundationArea from '@/components/FoundationArea.vue';
import PileArea from '@/components/PileArea.vue';

import '@/styles/CardGrid.scss';
import '@/styles/Cards.scss';

export default {
  components: {
    StockArea,
    FoundationArea,
    PileArea,
  },

  methods: {
    ...mapActions('cards', {
      generateNewGame: 'generateInitialState',
    }),
  },
}
</script>
