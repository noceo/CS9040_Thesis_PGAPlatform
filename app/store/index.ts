import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { global } from './modules/global/index'

export interface IRootState {
  version: string
}

export const store = new Vuex.Store({
  state: {
    version: '1.0.0',
  },
  modules: {
    global,
  },
  // plugins: [new VuexPersistence().plugin],
})

export default () => {
  return store
}
