const RANKS = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
const SUITS = ['spades', 'clubs', 'diamonds', 'hearts'];

const getRankIndex = () => (rank) => RANKS.indexOf(rank)

const getRankByIndex = () => (index) => RANKS[index]

const getLowerRank = (state, getters) => (rank) => getters.getRankByIndex(getters.getRankIndex(rank) - 1)

const getPileCards = (state) => (pileIndex) => state.pileCards[pileIndex].map(card => state.deck[card])

const getPileCardByIndex = (state) => (pileIndex, cardIndex) => state.deck[state.pileCards[pileIndex][cardIndex]]

const getTopPileCard = (state) => (pileIndex) => state.deck[state.pileCards[pileIndex][state.pileCards[pileIndex].length-1]]

const getStockCards = (state) => state.stockCards.map(cardIndex => state.deck[cardIndex])

const getUpturnedStockCards = (state) => {
  return state.stockCardIndex !== null 
    ? state.stockCards
        .filter((card, index) => index <= state.stockCardIndex)
        .map(card => state.deck[card])
    : [];
}

const getCurrentStockCard = (state) => state.deck[state.stockCards[state.stockCardIndex]]

const getNextStockCardIndex = (state) => {
  let cardIndex = state.stockCardIndex !== null 
    ? state.stockCardIndex + 1
    : 0;
  if (cardIndex >= state.stockCards.length) {
    cardIndex = null;
  }
  return cardIndex;
}

const getNextStockCard = (state, getters) => state.deck[state.stockCards[getters.getNextStockCardIndex]]

const getFoundationCards = (state) => (foundationIndex) => state.foundationCards[foundationIndex].map(card => state.deck[card])

const getCurrentFoundationCardIndex = (state) => (foundationIndex) => state.foundationCards[foundationIndex].length-1

const getCurrentFoundationCard = (state) => (foundationIndex) => {
  let lastCardIndex = state.foundationCards[foundationIndex].length-1;
  return state.deck[state.foundationCards[foundationIndex][lastCardIndex]];
}

const getSuitableFoundationForCard = (state, getters) => (card)=> {
  let lowerRank = getters.getLowerRank(card.rank);
  return state.foundationCards.findIndex((cards, foundationIndex) => {
    if (!lowerRank) {
      return cards.length === 0;
    } else {
      let lastCardIndex = state.foundationCards[foundationIndex].length-1;
      let lastCard  = state.deck[state.foundationCards[foundationIndex][lastCardIndex]];
      return lastCard.rank === lowerRank && lastCard.suit === card.suit;
    }
  })
}

const generateNewInitialState = () => {
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

  return {
    deck,
    pileCards,
    pileUpturnedIndexes,
    foundationCards,
    stockCards,
    stockCardIndex: null,
  };
}

export default {
  getRankIndex,
  getRankByIndex,
  getLowerRank,
  getPileCards,
  getPileCardByIndex,
  getTopPileCard,
  getStockCards,
  getUpturnedStockCards,
  getCurrentStockCard,
  getNextStockCardIndex,
  getNextStockCard,
  getFoundationCards,
  getCurrentFoundationCardIndex,
  getCurrentFoundationCard,
  getSuitableFoundationForCard,
  generateNewInitialState,
}
