<template>
  <div class="pile">
    <div class="cards">
      <Card
        v-for="(card, index) in cards"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:card="card" 
        v-bind:isUpturned="index >= upturnedIndex" 
        v-on:click="makeUpturned"
        v-on:dblclick="moveToFoundation"
        v-on:dragenter="onDragEnter"
        v-on:dragover="onDragOver"
        v-on:drop="onDrop"
      />
      <Placeholder v-if="cards.length <= 0" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Card from "@/components/Card";
import Placeholder from "@/components/Placeholder";

export default {
  components: {
    Card,
    Placeholder,
  },

  props: ['index', 'upturnedIndex', 'cards'],

  methods: {
    ...mapActions('cards', [
      'makePileCardUpturned',
      'moveToFoundationFromPile',
      'moveToPileFromStock',
    ]),
    makeUpturned(cardIndex) {
      if (cardIndex < this.upturnedIndex) {
        this.makePileCardUpturned({ pileIndex: this.index, cardIndex });
      }
    },
    moveToFoundation(cardIndex) {
      if (cardIndex >= this.upturnedIndex) {
        this.moveToFoundationFromPile({ pileIndex: this.index, cardIndex });
      }
    },
    onDragEnter(event) {
      event.preventDefault();
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDrop() {
      this.moveToPileFromStock(this.index);
    },
  },
}
</script>
