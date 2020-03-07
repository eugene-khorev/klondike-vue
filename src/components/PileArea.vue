<template>
  <div class="pile-area">
    <Pile v-for="(pile, index) in piles" v-bind:key="index" v-bind:index="index" v-bind:upturnedIndex="pile.upturnedIndex" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Pile from "@/components/Pile.vue";
import "@/styles/PileArea.scss";

export default {
  components: { Pile },

  computed: {
    ...mapState({
      piles: (state) => state.cards.piles,
    })
  }
};
</script>
