<template>
  <div class="pile">
    <div class="cards">
      <Card
        v-for="(card, index) in cards"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:card="card" 
        v-bind:isUpturned="index >= upturnedIndex" 
      />
      <Placeholder v-if="cards.length <= 0" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Placeholder from "@/components/Placeholder";

export default {
  components: {
    Card,
    Placeholder,
  },

  props: ['index', 'upturnedIndex', 'cards'],

  methods: {
    tryMoveToFoundation() {

    },
  },
}
</script>
