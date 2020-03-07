<template>
  <div class="pile">
    <div class="cards">
      <card
        v-for="(card, index) in getPileCards(index)"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:card="card" 
        v-bind:isUpturned="index >= upturnedIndex" 
      />
      <placeholder v-if="getPileCards(index).length <= 0" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "@/components/Card";
import Placeholder from "@/components/Placeholder";

export default {
  components: {
    Card,
    Placeholder,
  },

  props: ['index', 'upturnedIndex'],

  computed: {
    ...mapGetters('cards', ['getPileCards']),
  },
}
</script>
