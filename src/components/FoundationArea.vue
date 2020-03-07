<template>
  <div class="foundation-area">
    <Foundation v-bind:cards="getFoundationCards(0)" v-bind:index="0" />
    <Foundation v-bind:cards="getFoundationCards(1)" v-bind:index="1" />
    <Foundation v-bind:cards="getFoundationCards(2)" v-bind:index="2" />
    <Foundation v-bind:cards="getFoundationCards(3)" v-bind:index="3" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Foundation from '@/components/Foundation.vue';
import '@/styles/FoundationArea.scss';

export default {
  components: { Foundation },

  computed: {
    ...mapGetters('cards', [
      'getFoundationCards',
    ]),
  },
}
</script>