<template>
  <div class="stock cards">
    <div class="next-card" v-on:click="switchToNextStockCard">
      <card
        v-if="getNextStockCard"
        v-bind:card="getNextStockCard" 
        v-bind:isUpturned="false"
      />
      <placeholder v-else />
    </div>
    
    <div class="current-card">
      <card
        v-if="getCurrentStockCard"
        v-bind:card="getCurrentStockCard" 
        v-bind:isUpturned="true"
      />
      <placeholder v-else />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import Card from "@/components/Card";
import Placeholder from "@/components/Placeholder";

export default {
  components: {
    Card,
    Placeholder,
  },

  computed: {
    ...mapState('cards', {
      cardIndex: (state) => state.stock.cardIndex,
    }),
    ...mapGetters('cards', [
      'getStockCards',
      'getCurrentStockCard',
      'getNextStockCard',
    ]),
  },
  
  methods: {
    ...mapActions('cards', ['switchToNextStockCard']),
  },
};
</script>
