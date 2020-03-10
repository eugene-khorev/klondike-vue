export default {
  install(Vue, { store }) {
    store.subscribe((mutation, state) => {
      Vue.prototype.$insertNewState(state)
    });

    Vue.prototype.$getSavedStateFromStarage = () => {
      let savedState;
      try {
        savedState = JSON.parse(localStorage.getItem('vuex-state'));
      } catch(e) { /* Invalid JSON*/ }
      return savedState || [];
    }

    Vue.prototype.$putSavedStateToStorage = (savedState) => {
      localStorage.setItem('vuex-state', JSON.stringify(savedState));
    }

    Vue.prototype.$insertNewState = (state, apply = false) => {
      if (apply) {
        Vue.prototype.$applyState(state);
      }
      let savedState = Vue.prototype.$getSavedStateFromStarage();
      savedState.push(state);
      Vue.prototype.$putSavedStateToStorage(savedState);
    }

    Vue.prototype.$applyState = (state) => {
      store.replaceState(state);
    }

    Vue.prototype.$undoLastState = () => {
      let savedState = Vue.prototype.$getSavedStateFromStarage();
      if (savedState.length > 1) {
        savedState.pop();
        store.replaceState(savedState[savedState.length-1]);
        Vue.prototype.$putSavedStateToStorage(savedState);
      }
    }
  }
}
