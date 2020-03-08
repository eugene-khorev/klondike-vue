<template>
  <div class="pile"
    v-on:dragenter.prevent="onDragEnter"
    v-on:dragover.prevent="onDragOver"
    v-on:drop="onDrop"
    >
    <div class="cards">
      <Placeholder
        v-on:dragenter="onDragEnter"
        v-on:dragover="onDragOver"
        v-on:drop="onDrop"
      />
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
        v-on:dragstart="onDragStart"
        v-on:drop="onDrop"
      />
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
      'moveToPileFromPile',
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
    onDragStart(event, cardIndex) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify({
        source: 'pile',
        pileIndex: this.index,
        cardIndex,
      }));
    },
    onDragEnter(event) {
      this.$emit('dragenter', event, this.index)
    },
    onDragOver(event) {
      this.$emit('dragover', event, this.index)
    },
    onDrop() {
      try {
        let data = JSON.parse(event.dataTransfer.getData('text/plain'));
        switch (data.source) {
          case 'stock':
            this.moveToPileFromStock(this.index);
            break;

          case 'pile':
            this.moveToPileFromPile({
              cardIndex: data.cardIndex,
              srcPileIndex: data.pileIndex,
              dstPileIndex: this.index,
            });
            break;
        }
      } catch (e) {
        // Invalid source
      }
    },
  },
}
</script>
