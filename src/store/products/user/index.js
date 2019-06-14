import state from './modules/state';
import mutations from './modules/mutations';
import actions from './modules/actions';
import getters from './modules/getters';

/**
 * Payments Wrapper
 */
export const products = {
  namespaced: true,

  state,
  mutations,
  actions,
  getters
};
