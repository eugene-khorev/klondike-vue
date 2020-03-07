import _ from 'lodash';

/**
 * Card ranks and suits
 */
export const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a'];
export const SUITS = ['spades', 'clubs', 'diamonds', 'hearts'];

/**
 * Mutations
 */
export const MUTATION_SET_INITIAL_STATE = 'MUTATION_SET_INITIAL_STATE';
export const MUTATION_SET_CURRENT_STOCK_CARD = 'MUTATION_SET_CURRENT_STOCK_CARD';

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
    getCurrentFoundationCardIndex: (state) => (foundation) => state.foundationCards[foundation].lenght-1,
    getCurrentFoundationCard: (state, getters) => (foundation) => state.deck[state.foundationCards[foundation][getters.getCurrentFoundationCardIndex]],
  },

  mutations: {
    /**
     * Initialize game state
     * @param {Object} state 
     * @param {Object.<CardListState, Array.CardListState>} payload
     */
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
    }
  },

  actions: {
    /**
     * Generate new game state
     * @param {Object} context
     */
    generateInitialState(context) {
      // Generate shuffled deck
      let deck = _.shuffle(_.times(SUITS.length * RANKS.length, index => {
        return {
          foundation: null,
          pile: null,
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
          cards.push(card);
          deck[card++].pile = pile;
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
      // Set store state
      context.commit(MUTATION_SET_CURRENT_STOCK_CARD, context.getters.getNextStockCardIndex);
    },
  },
}