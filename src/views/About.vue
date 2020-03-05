<template>
  <div class="about">
    <CardList type="stock"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CardList from '@/components/CardList.vue'

export default {
  components: {
    CardList,
  },

  methods: {
    ...mapActions("cards", {
      initGameState: "GenerateInitialState"
    }),
  },

  created() {
    this.initGameState();
  },
}
</script>

