<template>
  <div>
    <h1>List</h1>
    <div class="cards">
      <card
        v-for="(n, index) in cardCount"
        v-bind:key="index"
        v-bind:type="type"
        v-bind:index="index"
      >
        <span></span>
      </card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/CardItem";

import "@/styles/Cards.scss";

export default {
  components: {
    Card
  },

  props: ['type', 'index'],

  computed: {
    ...mapState({
      cardCount(state) {
        return this.index >= 0
          ? state.cards[this.type][this.index].cards.length
          : state.cards[this.type].cards.length;
      },
      upturnedIndex(state) {
        return this.index >= 0
          ? state.cards[this.type][this.index].upturnedIndex
          : state.cards[this.type].upturnedIndex
      },
    }),
  },

};
</script>
