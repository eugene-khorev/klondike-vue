<template>
  <div class="pile">
    <div class="cards">
      <card v-for="(n, i) in cardCount" v-bind:key="i" v-bind:type="type" v-bind:index="i" v-bind:listIndex="index" />
      <placeholder v-if="cardCount <= 0" />
    </div>
  </div>
</template>

<script>
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
      default: 'piles',
    },
    index: {
      type: Number
    },
  },
}
</script>
