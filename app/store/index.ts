import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { global } from './modules/global/index'

export interface IRootState {
  version: string
}

export default () => {
  return new Vuex.Store<IRootState>({
    state: {
      version: '1.0.0',
    },
    modules: {
      global,
    },
    plugins: [new VuexPersistence<IRootState>().plugin],
  })
}
