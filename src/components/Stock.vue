<template>
  <div class="stock">
    <div class="cards">
      <div class="next-card" v-on:click="switchToNextStockCard">
        <Card
          v-if="getNextStockCard"
          v-bind:card="getNextStockCard" 
          v-bind:isUpturned="false"
        />
        <Placeholder v-else />
      </div>
      
      <div class="current-card">
        <Card
          v-if="getCurrentStockCard"
          v-bind:card="getCurrentStockCard" 
          v-bind:isUpturned="true"
          v-on:dblclick="moveToFoundation"
          v-on:dragstart="onDragStart"
        />
        <Placeholder v-else />
      </div>
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
      cardIndex: (state) => state.stockCardIndex,
    }),
    ...mapGetters('cards', [
      'getStockCards',
      'getCurrentStockCard',
      'getNextStockCard',
    ]),
  },
  
  methods: {
    ...mapActions('cards', [
      'switchToNextStockCard',
      'moveToFoundationFromStock',
    ]),
    moveToFoundation() {
      this.moveToFoundationFromStock();
    },
    onDragStart(event) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify({
        source: 'stock',
        card: this.getCurrentStockCard,
      }));
    },
  },
};
</script>
