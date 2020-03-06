<template>
  <div class="about">
    <StockArea/>
    <PileArea/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import StockArea from '@/components/StockArea.vue';
import PileArea from '@/components/PileArea.vue';

export default {
  components: {
    StockArea,
    PileArea,
  },

  methods: {
    ...mapActions("cards", {
      initGameState: "generateInitialState"
    }),
  },

  created() {
    this.initGameState();
  },
}
</script>

