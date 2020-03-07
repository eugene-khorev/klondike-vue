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

/**
 * Card store
 */
export default {
  namespaced: true,

  state: {
    deck: [],
  },

  getters: {
    getPileCards: (state) => (pile) => {
      let cards = state.deck.filter(card => card.pile === pile);
      return cards;
    },
  },

  mutations: {
    /**
     * Initialize game state
     * @param {Object} state 
     * @param {Object.<CardListState, Array.CardListState>} payload
     */
    [MUTATION_SET_INITIAL_STATE](state, { deck, piles, stock }) {
      state.deck = deck;
      state.piles = piles;
      state.stock = stock;
    },
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
      let piles = [];
      for (let pile = 0, card = 0; pile < 7; pile++) {
        piles.push({ upturnedIndex: pile });
        let counter = 0;
        do {
          deck[card++].pile = pile;
        } while (counter++ < pile);
      }

      // Set store state
      context.commit(MUTATION_SET_INITIAL_STATE, {
        deck, 
        piles,
        stock: { cardIndex: 24 },
      });
    },
  },
}