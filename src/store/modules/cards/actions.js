const switchToNextStockCard = ({ commit, getters }) => {
  commit('MUTATION_SET_CURRENT_STOCK_CARD', getters.getNextStockCardIndex);
}

const makePileCardUpturned = ({ commit }, { pileIndex, cardIndex }) => {
  commit('MUTATION_SET_PILE_UPTURNED_INDEX', { pile: pileIndex, index: cardIndex });
}

const moveToFoundationFromPile = ({ commit, state, getters }, { pileIndex, cardIndex }) => {
  if (cardIndex >= state.pileUpturnedIndexes[pileIndex]) {
    let card = getters.getPileCardByIndex(pileIndex, cardIndex);
    let foundationIndex = getters.getSuitableFoundationForCard(card);

    if (foundationIndex >= 0) {
      commit('MUTATION_MOVE_TO_FOUNDATION_FROM_PILE', {
        foundationIndex,
        pileIndex,
        cardIndex,
      });
    }
  }
}

const moveToFoundationFromStock = ({ commit, getters }) => {
  let card = getters.getCurrentStockCard;
  let foundationIndex = getters.getSuitableFoundationForCard(card);
  if (foundationIndex >= 0) {
    commit('MUTATION_MOVE_TO_FOUNDATION_FROM_STOCK', { foundationIndex });
  }
}

const moveToPileFromStock = ({ commit, getters }, pileIndex) => {
  let stockCard = getters.getCurrentStockCard;
  let pileCard = getters.getTopPileCard(pileIndex);

  if (pileCard) {
    if (stockCard.rank === getters.getLowerRank(pileCard.rank)) {
      if (((pileCard.suit === 'spades' || pileCard.suit === 'clubs')
        && (stockCard.suit === 'diamonds' || stockCard.suit === 'hearts'))
        || ((stockCard.suit === 'spades' || stockCard.suit === 'clubs')
        && (pileCard.suit === 'diamonds' || pileCard.suit === 'hearts'))
      ) {
        commit('MUTATION_NOVE_TO_PILE_FROM_STOCK', { pileIndex });
      }
    }
  } else if (stockCard.rank === 'k') {
    commit('MUTATION_NOVE_TO_PILE_FROM_STOCK', { pileIndex });
  }
}

const moveToPileFromPile = ({ commit, getters }, { cardIndex, srcPileIndex, dstPileIndex } ) => {
  let srcCard = getters.getPileCardByIndex(srcPileIndex, cardIndex);
  let dstCard = getters.getTopPileCard(dstPileIndex);

  if (dstCard) {
    if (srcCard.rank === getters.getLowerRank(dstCard.rank)) {
      if (((dstCard.suit === 'spades' || dstCard.suit === 'clubs')
        && (srcCard.suit === 'diamonds' || srcCard.suit === 'hearts'))
        || ((srcCard.suit === 'spades' || srcCard.suit === 'clubs')
        && (dstCard.suit === 'diamonds' || dstCard.suit === 'hearts'))
      ) {
        commit('MUTATION_MOVE_TO_PILE_FROM_PILE', { srcPileIndex, dstPileIndex, cardIndex });
      }
    }
  } else if (srcCard.rank === 'k') {
    commit('MUTATION_MOVE_TO_PILE_FROM_PILE', { srcPileIndex, dstPileIndex, cardIndex });
  }
}

export default {
  switchToNextStockCard,
  makePileCardUpturned,
  moveToFoundationFromPile,
  moveToFoundationFromStock,
  moveToPileFromStock,
  moveToPileFromPile,
}
