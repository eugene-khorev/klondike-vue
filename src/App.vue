<template>
  <div id="app">
    <div class="container">
      <div id="nav">
        <h1>Klondike</h1>

        <button v-on:click.prevent="undoAction">Undo</button>
        <button v-on:click.prevent="newGame">New</button>
      </div>

      <div class="card-grid">
        <div class="card-row">
          <div class="card-column three-cards">
            <StockArea/>
          </div>
          <div class="card-column four-cards">
            <FoundationArea/>
          </div>
        </div>
        <div class="card-row">
          <div class="card-column seven-cards">
            <PileArea/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #406040	;
  text-align: center;
}
.container {
  display: inline-block;
}
#nav {
  margin: 0.3em 0 0.5em;
  padding: 0.3em 0.4em;
  background: #204020;

  h1 {
    display: inline-block;
    margin: 0;
    line-height: 1.6em;
    font-size: 1em;
    font-weight: normal;
    color: #fff;
  }

  &::after {
    content: " ";
    display: block;
    clear: both;
  }

  button {
    display: block;
    width: 5em;
    padding: 0.3em 0.5em;
    font-size: 0.8em;
    background: #609060;
    color: #102010;
    border: solid 0.1em #030;
    cursor: pointer;

    &:hover {
      background: #bb7;
    }

    &:first-of-type {
      float: left;
    }

    &:last-of-type {
      float: right;
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex';

import StockArea from '@/components/StockArea.vue';
import FoundationArea from '@/components/FoundationArea.vue';
import PileArea from '@/components/PileArea.vue';

import '@/styles/CardGrid.scss';
import '@/styles/Cards.scss';

export default {
  components: {
    StockArea,
    FoundationArea,
    PileArea,
  },

  created() {
    let savedState = this.$getSavedStateFromStarage();
    if (savedState.length < 1) {
      this.$insertNewState({ cards: this.generateNewInitialState() }, true);
    } else {
      this.$applyState(savedState[savedState.length-1]);
    }
  },

  methods: {
    ...mapGetters('cards', [
      'generateNewInitialState'
    ]),
    undoAction(event) {
      event.target.blur();
      this.$undoLastState();
    },
    newGame(event) {
      event.target.blur();
      this.$putSavedStateToStorage([]);
      this.$insertNewState({ cards: this.generateNewInitialState() }, true);
    },
  },
}
</script>
