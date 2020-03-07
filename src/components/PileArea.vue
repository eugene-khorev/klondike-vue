<template>
  <div class="pile-area">
    <pile
      v-for="(upturnedIndex, index) in pileUpturnedIndexes"
      v-bind:key="index"
      v-bind:index="index"
      v-bind:upturnedIndex="upturnedIndex"
      v-bind:cards="getPileCards(index)"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Pile from "@/components/Pile.vue";
import "@/styles/PileArea.scss";

export default {
  components: { Pile },

  computed: {
    ...mapState('cards', {
      pileUpturnedIndexes: (state) => { return state.pileUpturnedIndexes },
    }),
    ...mapGetters('cards', ['getPileCards']),
  }
};
</script>
