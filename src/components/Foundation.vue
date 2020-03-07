<template>
  <div class="foundation">
    <div class="cards">
      <Card 
        v-if="getCurrentFoundationCard(index)"
        v-bind:card="getCurrentFoundationCard(index)" 
        v-bind:isUpturned="true"
      />
      <Placeholder v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Card from '@/components/Card.vue';
import Placeholder from '@/components/Placeholder.vue';

export default {
  components: { Card, Placeholder },

  props: ['index', 'cards'],

  computed: {
    ...mapGetters('cards', [
      'getCurrentFoundationCardIndex',
      'getCurrentFoundationCard',
    ]),
  },
}
</script>
