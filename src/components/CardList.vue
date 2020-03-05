<template>
  <div>
    <h1>Stock</h1>
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


import "@/styles/Temp.scss";
import "@/styles/Cards.scss";

export default {
  components: {
    Card
  },

  props: ['type'],

  computed: {
    ...mapState({
      cardCount(state) {
        return state.cards[this.type].cards.length
      },
      upturnedIndex(state) {
        return state.cards[this.type].upturnedIndex
      },
    }),
  },

};
</script>
