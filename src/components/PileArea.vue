<template>
  <div class="pile-area">
    <Pile v-for="(n, index) in pileCount" v-bind:key="index" v-bind:index="index" />
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
      pileCount(state) {
        return state.cards.piles.length;
      }
    })
  }
};
</script>
