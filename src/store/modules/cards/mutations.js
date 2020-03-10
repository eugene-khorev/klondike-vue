import Vue from 'vue';

const MUTATION_SET_INITIAL_STATE = (state, { deck, pileCards, pileUpturnedIndexes, foundationCards, stockCards, stockCardIndex }) => {
  state.deck = deck;
  state.pileCards = pileCards;
  state.pileUpturnedIndexes = pileUpturnedIndexes;
  state.foundationCards = foundationCards;
  state.stockCards = stockCards;
  state.stockCardIndex = stockCardIndex;
}

const MUTATION_SET_CURRENT_STOCK_CARD = (state, cardIndex) => {
  state.stockCardIndex = cardIndex;
}

const MUTATION_SET_PILE_UPTURNED_INDEX = (state, { pile, index }) => {
  Vue.set(state.pileUpturnedIndexes, pile, index);
}

const MUTATION_MOVE_TO_FOUNDATION_FROM_STOCK = (state, { foundationIndex }) => {
  Vue.set(
    state.foundationCards, 
    foundationIndex,
    [
      ...state.foundationCards[foundationIndex], 
      state.stockCards[state.stockCardIndex],
    ]
  );
  state.stockCards.splice(state.stockCardIndex, 1);
  state.stockCardIndex--;
}

const MUTATION_MOVE_TO_FOUNDATION_FROM_PILE = (state, { foundationIndex, pileIndex, cardIndex }) => {
  Vue.set(
    state.foundationCards, 
    foundationIndex,
    [
      ...state.foundationCards[foundationIndex], 
      state.pileCards[pileIndex][cardIndex]
    ]
  );
  Vue.set(state.pileCards, pileIndex, state.pileCards[pileIndex].slice(0, cardIndex));
}

const MUTATION_NOVE_TO_PILE_FROM_STOCK = (state, { pileIndex }) => {
  Vue.set(
    state.pileCards, 
    pileIndex,
    [
      ...state.pileCards[pileIndex], 
      state.stockCards[state.stockCardIndex]
    ]
  );
  state.stockCards.splice(state.stockCardIndex, 1);
  state.stockCardIndex--;
}

const MUTATION_MOVE_TO_PILE_FROM_PILE = (state, { srcPileIndex, dstPileIndex, cardIndex }) => {
  Vue.set(
    state.pileCards, 
    dstPileIndex,
    [
      ...state.pileCards[dstPileIndex],
      ...state.pileCards[srcPileIndex].slice(cardIndex),
    ]
  );
  Vue.set(state.pileCards, srcPileIndex, state.pileCards[srcPileIndex].slice(0, cardIndex));
}

export default {
  MUTATION_SET_INITIAL_STATE,
  MUTATION_SET_CURRENT_STOCK_CARD,
  MUTATION_SET_PILE_UPTURNED_INDEX,
  MUTATION_MOVE_TO_FOUNDATION_FROM_STOCK,
  MUTATION_MOVE_TO_FOUNDATION_FROM_PILE,
  MUTATION_NOVE_TO_PILE_FROM_STOCK,
  MUTATION_MOVE_TO_PILE_FROM_PILE,
}
