import _ from 'lodash';

/**
 * Card ranks and suits
 */
export const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
export const SUITS = ['spades', 'clubs', 'diams', 'hearts'];

/**
 * Mutations
 */
export const MUTATION_SET_INITIAL_STATE = 'MUTATION_SET_INITIAL_STATE';

/**
 * Unified card шеуь
 */
class CardState {
    /**
     * @constructor
     * @param {strin} rank - Card rank
     * @param {string} suit - Card suit
     */
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

/**
 * Unified card list
 */
class CardListState {
    /**
     * @constructor
     * @param {string} type - List type (i.e. 'stock', 'piles', 'foundations')
     * @param {Array.<CardState>} cards - Array of cards (e.g. { rank: 'Q', suit: 'spades' })
     * @param {number} [index] - Index of the list (for piles and foundations)
     * @param {number} [upturnedIndex] - Index of the first upturned card in the list
     */
    constructor(type, cards, index, upturnedIndex) {
        this.type = type;
        this.cards = cards;
        this.index = index;
        this.upturnedIndex = upturnedIndex;
    }
}

/**
 * Card store
 */
export default {
    namespaced: true,

    state: {
        stock: [],
        piles: [],
        foundations: [],
    },

    getters: {
        /**
         * @param {string} path - Path to specified card(s) [@see lodash _.get() method]
         */
        getCards: (state) => (path) => {
            return _.get(state, path);
        },
    },

    mutations: {
        /**
         * Initialize game state
         * @param {Object} state 
         * @param {Object.<CardListState, Array.CardListState>} payload
         */
        [MUTATION_SET_INITIAL_STATE] (state, { stock, piles }) {
            state.stock = _.clone(stock);
            state.piles = _.clone(piles);
            state.foundations = [];
        }
    },

    actions: {
        /**
         * Generate new game state
         * @param {Object} context
         */
        GenerateInitialState(context) {
            let deck = _.shuffle(_.times(SUITS.length * RANKS.length, index => {
                let rank = RANKS[index % RANKS.length];
                let suit = SUITS[_.floor(index / RANKS.length)];
                return new CardState(rank, suit);
            }));
            let piles = _.times(7, index => new CardListState('piles', deck.splice(0, index + 1), index));
            let stock = new CardListState('stock', deck);
            context.commit(MUTATION_SET_INITIAL_STATE, { stock, piles });
        },
    },
}
