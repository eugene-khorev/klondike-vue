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

  computed: {
    savedStateList: {
      get() {
        let savedStateList;
        try {
          savedStateList = JSON.parse(localStorage.getItem('vuex-state-list'));
        } catch(e) { /* Invalid JSON*/ }
        return savedStateList || [];
      },
      set(value) {
        localStorage.setItem('vuex-state-list', JSON.stringify(value));
        return value;
      },
    },

    lastSavedState: {
      get() {
        return this.savedStateList[this.savedStateList.length - 1];
      },
      set(value) {
        this.savedStateList = [...this.savedStateList, value];
        return value;
      },
    },
  },

  beforeCreate() {
    this.$store.subscribe((mutation, state) => {
      this.lastSavedState = state;
    });

    if (!this.lastSavedState) {
      this.lastSavedState = { cards: this.getNewInitialState() };
    }

    this.$store.replaceState(this.lastSavedState);
  },

  methods: {
    ...mapGetters('cards', {
      getNewInitialState: 'getNewInitialState',
    }),

    undoLastState() {
      if (this.savedStateList.length > 1) {
        this.savedStateList.pop();
        this.$store.replaceState(this.lastSavedState);
      }
    },

    undoAction(event) {
      event.target.blur();
      this.undoLastState();
    },

    newGame(event) {
      event.target.blur();
      this.savedStateList = [{ cards: this.getNewInitialState() }];
    },
  },
}
</script>
