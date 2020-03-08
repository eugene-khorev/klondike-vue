import Vue from 'vue';
import _ from 'lodash';
import * as immutable from 'object-path-immutable';

/**
 * Card ranks and suits
 */
export const RANKS = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
export const SUITS = ['spades', 'clubs', 'diamonds', 'hearts'];

/**
 * Mutations
 */
export const MUTATION_SET_INITIAL_STATE = 'MUTATION_SET_INITIAL_STATE';
export const MUTATION_SET_CURRENT_STOCK_CARD = 'MUTATION_SET_CURRENT_STOCK_CARD';
export const MUTATION_SET_PILE_UPTURNED_INDEX = 'MUTATION_SET_PILE_UPTURNED_INDEX';
export const MUTATION_ADD_TO_FOUNDATION = 'MUTATION_ADD_TO_FOUNDATION';
export const MUTATION_REMOVE_FROM_PILE = 'MUTATION_REMOVE_FROM_PILE';
export const MUTATION_REMOVE_FROM_STOCK = 'MUTATION_REMOVE_FROM_STOCK';

/**
 * Card store
 */
export default {
  namespaced: true,

  state: {
    deck: [],
    
    pileCards: [],
    pileUpturnedIndexes: [],
    
    foundationCards: [],

    stockCards: [],
    stockCardIndex: null,
  },

  getters: {
    getPileCards: (state) => (pile) => state.pileCards[pile].map(card => state.deck[card]),
    getPileCardByIndex: (state) => (pile, card) => state.deck[state.pileCards[pile][card]],
    
    getStockCards: (state) => state.stockCards.map(card => state.deck[card]), 
    getCurrentStockCard: (state) => state.deck[state.stockCards[state.stockCardIndex]],
    getNextStockCardIndex: (state) => {
      let cardIndex = (state.stockCardIndex || 0) + 1;
      if (cardIndex >= state.stockCards.length) {
        cardIndex = null;
      }
      return cardIndex;
    },
    getNextStockCard: (state, getters) => state.deck[state.stockCards[getters.getNextStockCardIndex]],

    getFoundationCards: (state) => (foundation) => state.foundationCards[foundation].map(card => state.deck[card]),
    getCurrentFoundationCardIndex: (state) => (foundation) => state.foundationCards[foundation].length-1,
    getCurrentFoundationCard: (state) => (foundation) => state.deck[state.foundationCards[foundation][state.foundationCards[foundation].length-1]],
    getAllCurrentFoundationCards: (state) => {
      // debugger;
      return state.foundationCards.map((cards, foundation) => {
        // debugger;
        // let res = getters.getCurrentFoundationCard(foundation);
        let res = state.deck[state.foundationCards[foundation][state.foundationCards[foundation].length-1]];
        return res;
      });
    },
  },

  mutations: {
    [MUTATION_SET_INITIAL_STATE] (state, { deck, pileCards, pileUpturnedIndexes, foundationCards, stockCards, stockCardIndex }) {
      state.deck = deck;
      state.pileCards = pileCards;
      state.pileUpturnedIndexes = pileUpturnedIndexes;
      state.foundationCards = foundationCards;
      state.stockCards = stockCards;
      state.stockCardIndex = stockCardIndex;
    },

    [MUTATION_SET_CURRENT_STOCK_CARD] (state, cardIndex) {
      state.stockCardIndex = cardIndex;
    },

    [MUTATION_SET_PILE_UPTURNED_INDEX] (state, { pile, index }) {
      Vue.set(state.pileUpturnedIndexes, pile, index);
    },

    [MUTATION_ADD_TO_FOUNDATION] (state, { foundation, card }) {
      state.foundationCards = immutable.insert(state.foundationCards, foundation, card, state.foundationCards[foundation].length);
    },

    [MUTATION_REMOVE_FROM_PILE] (state, { pile, card }) {
      state.pileCards = immutable.del(state.pileCards, [pile, card]);
    },

    [MUTATION_REMOVE_FROM_STOCK] (state, cardIndex) {
      state.stockCards.splice(cardIndex, 1);
    },
  },

  actions: {
    generateInitialState(context) {
      // Generate shuffled deck
      let deck = _.shuffle(_.times(SUITS.length * RANKS.length, index => {
        return {
          rank: RANKS[index % RANKS.length],
          suit: SUITS[_.floor(index / RANKS.length)],
        };
      }));

      // Fill piles
      let pileCards = [];
      let pileUpturnedIndexes = [];
      let card = 0;
      for (let pile = 0; pile < 7; pile++) {
        let counter = 0;
        let cards = [];
        do {
          cards.push(card++);
        } while (counter++ < pile);
        pileCards.push(cards);
        pileUpturnedIndexes.push(pile);
      }

      // Fill stock
      let stockCards = _.range(card, deck.length);

      // Create empty foundationCards
      let foundationCards = new Array(4).fill([]);

      // Set store state
      context.commit(MUTATION_SET_INITIAL_STATE, {
        deck,
        pileCards,
        pileUpturnedIndexes,
        foundationCards,
        stockCards,
        stockCardIndex: null,
      });
    },

    switchToNextStockCard(context) {
      context.commit(MUTATION_SET_CURRENT_STOCK_CARD, context.getters.getNextStockCardIndex);
    },

    makePileCardUpturned(context, { pileIndex, cardIndex }) {
      context.commit(MUTATION_SET_PILE_UPTURNED_INDEX, { pile: pileIndex, index: cardIndex });
    },

    findFoundationForCard(context, card) {
      let lowerRankIndex = RANKS.indexOf(card.rank) - 1;
      if (lowerRankIndex >= 0) {
        return _.findLastIndex(context.getters.getAllCurrentFoundationCards, { rank: RANKS[lowerRankIndex], suit: card.suit });
      } else {
        return _.findLastIndex(context.state.foundationCards, { length: 0 });
      }
    },

    moveToFoundationFromPile(context, { pileIndex, cardIndex }) {
      if (cardIndex >= context.state.pileUpturnedIndexes[pileIndex]) {
        let card = context.getters.getPileCardByIndex(pileIndex, cardIndex);
         context.dispatch('findFoundationForCard', card).then((foundationIndex) => {
          if (foundationIndex >= 0) {
            context.commit(MUTATION_ADD_TO_FOUNDATION, {
              foundation: foundationIndex,
              card: context.state.pileCards[pileIndex][cardIndex],
            });
            context.commit(MUTATION_REMOVE_FROM_PILE, { pile: pileIndex, card: cardIndex });
          }
        });
      }
    },

    moveToFoundationFromStock(context) {
      let cardIndex = context.state.stockCards[context.state.stockCardIndex];
      let card = context.getters.getCurrentStockCard;
      context.dispatch('findFoundationForCard', card).then((foundationIndex) => {
        if (foundationIndex >= 0) {
          context.commit(MUTATION_ADD_TO_FOUNDATION, {
            foundation: foundationIndex,
            card: cardIndex,
          });
          context.commit(MUTATION_REMOVE_FROM_STOCK, context.state.stockCardIndex);
          context.commit(MUTATION_SET_CURRENT_STOCK_CARD, context.state.stockCardIndex-1);
        }
      });
    },
  },
}
