<template>
  <div class="stock cards">
    <div class="next-card" v-on:click="nextCard">
      <card  v-if="upturnedIndex > 0" v-bind:type="type" v-bind:index="upturnedIndex - 1" />
      <placeholder v-else />
    </div>
    
    <div class="current-card">
      <card v-if="upturnedIndex < cardCount" v-bind:type="type" v-bind:index="upturnedIndex" />
      <placeholder v-else />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import CardList from "@/components/CardList";
import Card from "@/components/CardItem";
import Placeholder from "@/components/CardPlaceholder";

export default {
  mixins: [CardList],

  components: {
    Card,
    Placeholder,
  },

  props: {
    type: {
      type: String,
      default: 'stock',
    }
  },

  methods: {
    ...mapActions('cards', {
      setUpturnedIndex: 'setUpturnedCardIndex',
    }),
    
    nextCard() {
      let index = this.upturnedIndex - 1;
      if (index < 0) {
        index = this.cardCount;
      }
      this.setUpturnedIndex({ cardType: this.type, index });
    },
  },
};
</script>
