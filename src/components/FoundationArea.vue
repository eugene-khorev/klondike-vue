<template>
  <div class="foundation-area">
    <Foundation
      v-for="(cards, index) in foundations"
      v-bind:key="index"
      v-bind:cards="getFoundationCards(index)"
      v-bind:index="index"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Foundation from '@/components/Foundation.vue';
import '@/styles/FoundationArea.scss';

export default {
  components: { Foundation },

  computed: {
    ...mapState('cards', {
      foundations: (state) => state.foundationCards
    }),
    ...mapGetters('cards', [
      'getFoundationCards',
    ]),
  },
}
</script>