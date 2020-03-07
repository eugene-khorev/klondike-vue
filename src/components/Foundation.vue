<template>
  <div class="foundation cards">
    <div class="top-card">
      <card  v-if="upturnedIndex >= 0" v-bind:type="type" v-bind:index="upturnedIndex" />
      <placeholder v-else />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CardList from "@/components/CardList";
import Placeholder from '@/components/CardPlaceholder.vue';

export default {
  mixins: [CardList],

  components: { Placeholder },

  props: {
    type: {
      type: String,
      default: 'foundations',
    }
  },  

  computed: {
    ...mapState({
      upturnedIndex() {
        return this.cardCount > 0 ? this.cardCount : -1;
      },
    }),
  },
}
</script>
