import Vue from 'vue';

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
export const MUTATION_ADD_TO_PILE = 'MUTATION_ADD_TO_PILE';
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
    getTopPileCard: (state) => (pile) => state.deck[state.pileCards[pile][state.pileCards[pile].length-1]],
    
    getStockCards: (state) => state.stockCards.map(card => state.deck[card]), 
    getUpturnedStockCards: (state) => {
      return state.stockCardIndex !== null 
        ? state.stockCards
            .filter((card, index) => index <= state.stockCardIndex)
            .map(card => state.deck[card])
        : [];
    },
    getCurrentStockCard: (state) => state.deck[state.stockCards[state.stockCardIndex]],
    getNextStockCardIndex: (state) => {
      let cardIndex = state.stockCardIndex !== null 
        ? state.stockCardIndex + 1
        : 0;
      if (cardIndex >= state.stockCards.length) {
        cardIndex = null;
      }
      return cardIndex;
    },
    getNextStockCard: (state, getters) => state.deck[state.stockCards[getters.getNextStockCardIndex]],

    getFoundationCards: (state) => (foundation) => state.foundationCards[foundation].map(card => state.deck[card]),
    getCurrentFoundationCardIndex: (state) => (foundation) => state.foundationCards[foundation].length-1,
    getCurrentFoundationCard: (state) => (foundation) => state.deck[state.foundationCards[foundation][state.foundationCards[foundation].length-1]],
    getSuitableFoundationForCard: (state) => (card)=> {
      let lowerRankIndex = RANKS.indexOf(card.rank) - 1;
      return state.foundationCards.findIndex((cards, foundation) => {
        if (lowerRankIndex < 0) {
          return cards.length === 0;
        } else {
          let lastCard  = state.deck[state.foundationCards[foundation][state.foundationCards[foundation].length-1]];
          return lastCard.rank === RANKS[lowerRankIndex] && lastCard.suit === card.suit;
        }
      })
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

    [MUTATION_ADD_TO_FOUNDATION] (state, { foundation, cards }) {
      Vue.set(state.foundationCards, foundation, [...state.foundationCards[foundation], cards]);
    },

    [MUTATION_ADD_TO_PILE] (state, { pile, cards }) {

      Vue.set(state.pileCards, pile, [...state.pileCards[pile], cards]);
    },

    [MUTATION_REMOVE_FROM_PILE] (state, { pile, card }) {
      Vue.set(state.pileCards, pile, state.pileCards[pile].slice(0, card));
    },

    [MUTATION_REMOVE_FROM_STOCK] (state, cardIndex) {
      state.stockCards.splice(cardIndex, 1);
    },
  },

  actions: {
    generateInitialState(context) {
      // Generate shuffled deck
      let deck = Array.from(
        { length: SUITS.length * RANKS.length },
        (v, i) => [
          Math.random(), 
          {
            rank: RANKS[i % RANKS.length],
            suit: SUITS[Math.floor(i / RANKS.length)],
          }
        ]
      ).sort((a, b) => a[0] - b[0]).map(a => a[1]);

      // Fill piles
      let cardCounter = 0;
      let pileUpturnedIndexes = Array.from({ length: 7 }, (v, i) => i);
      let pileCards = pileUpturnedIndexes.map((value, index) => {
        let length = index + 1;
        let cards = Array.from({ length }, (v, i) => i + cardCounter);
        cardCounter += length;
        return cards;
      });

      // Fill stock
      let stockCards = Array.from(
        { length: deck.length - cardCounter }, 
        (v, i) => i + cardCounter
      );

      // Create empty foundationCards
      let foundationCards = Array.from({ length: 4 }, () => []);

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

    moveToFoundationFromPile(context, { pileIndex, cardIndex }) {
      if (cardIndex >= context.state.pileUpturnedIndexes[pileIndex]) {
        let card = context.getters.getPileCardByIndex(pileIndex, cardIndex);
        let foundationIndex = context.getters.getSuitableFoundationForCard(card);
        if (foundationIndex >= 0) {
          context.commit(MUTATION_ADD_TO_FOUNDATION, {
            foundation: foundationIndex,
            cards: context.state.pileCards[pileIndex][cardIndex],
          });
          context.commit(MUTATION_REMOVE_FROM_PILE, { pile: pileIndex, card: cardIndex });
        }
      }
    },

    moveToFoundationFromStock(context) {
      let cardIndex = context.state.stockCards[context.state.stockCardIndex];
      let card = context.getters.getCurrentStockCard;
      let foundationIndex = context.getters.getSuitableFoundationForCard(card);
      if (foundationIndex >= 0) {
        context.commit(MUTATION_ADD_TO_FOUNDATION, {
          foundation: foundationIndex,
          cards: cardIndex,
        });
        context.commit(MUTATION_REMOVE_FROM_STOCK, context.state.stockCardIndex);
        context.commit(MUTATION_SET_CURRENT_STOCK_CARD, context.state.stockCardIndex-1);
      }
    },

    moveToPileFromStock(context, pileIndex) {
      let stockCard = context.getters.getCurrentStockCard;
      let pileCard = context.getters.getTopPileCard(pileIndex);

      if (pileCard) {
        let lowerRankIndex = RANKS.indexOf(pileCard.rank) - 1;
        if (stockCard.rank === RANKS[lowerRankIndex]) {
          if (((pileCard.suit === 'spades' || pileCard.suit === 'clubs')
            && (stockCard.suit === 'diamonds' || stockCard.suit === 'hearts'))
            || ((stockCard.suit === 'spades' || stockCard.suit === 'clubs')
            && (pileCard.suit === 'diamonds' || pileCard.suit === 'hearts'))
          ) {
            context.commit(MUTATION_ADD_TO_PILE, {
              pile: pileIndex,
              cards: [ context.state.stockCards[context.state.stockCardIndex] ],
            });
            context.commit(MUTATION_REMOVE_FROM_STOCK, context.state.stockCardIndex);
            context.commit(MUTATION_SET_CURRENT_STOCK_CARD, context.state.stockCardIndex-1);
          }
        }
      } else if (stockCard.rank === 'k') {
        context.commit(MUTATION_ADD_TO_PILE, {
          pile: pileIndex,
          cards: [ context.state.stockCards[context.state.stockCardIndex] ],
        });
        context.commit(MUTATION_REMOVE_FROM_STOCK, context.state.stockCardIndex);
        context.commit(MUTATION_SET_CURRENT_STOCK_CARD, context.state.stockCardIndex-1);
      }
    },

    moveToPileFromPile(context, { cardIndex, srcPileIndex, dstPileIndex } ) {
      let srcCard = context.getters.getPileCardByIndex(srcPileIndex, cardIndex);
      let dstCard = context.getters.getTopPileCard(dstPileIndex);

      if (dstCard) {
        let lowerRankIndex = RANKS.indexOf(dstCard.rank) - 1;
        if (srcCard.rank === RANKS[lowerRankIndex]) {
          if (((dstCard.suit === 'spades' || dstCard.suit === 'clubs')
            && (srcCard.suit === 'diamonds' || srcCard.suit === 'hearts'))
            || ((srcCard.suit === 'spades' || srcCard.suit === 'clubs')
            && (dstCard.suit === 'diamonds' || dstCard.suit === 'hearts'))
          ) {
            context.commit(MUTATION_ADD_TO_PILE, {
              pile: dstPileIndex,
              cards: context.state.pileCards[srcPileIndex].slice(cardIndex),
            });
            context.commit(MUTATION_REMOVE_FROM_PILE, {
              pile: srcPileIndex,
              card: cardIndex,
            });
          }
        }
      } else if (srcCard.rank === 'k') {
        context.commit(MUTATION_ADD_TO_PILE, {
          pile: dstPileIndex,
          cards: context.state.pileCards[srcPileIndex].slice(cardIndex),
        });
        context.commit(MUTATION_REMOVE_FROM_PILE, {
          pile: srcPileIndex,
          card: cardIndex,
        });
      }
    },
  },
}
