<template>
  <div class="home card-grid">
    <div class="card-row">
      <div class="card-column two-cards">
        <!--StockArea/-->
      </div>
      <div class="card-column one-card"></div>
      <div class="card-column four-cards">
        <!--FoundationArea/-->
      </div>
    </div>
    <div class="card-row">
      <div class="card-column seven-cards">
        <PileArea/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import StockArea from '@/components/StockArea.vue';
// import FoundationArea from '@/components/FoundationArea.vue';
import PileArea from '@/components/PileArea.vue';
import '@/styles/CardGrid.scss';
import '@/styles/Cards.scss';

export default {
  components: {
    // StockArea,
    // FoundationArea,
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
