import { Context } from '@nuxt/types'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'

/**
 * Appends a global key listener to the documents body
 */
export default (context: Context) => {
  document.body.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'd') {
      const vizDebugActive =
        context.store.getters[
          `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_VIZ_DEBUG_STATE}`
        ]
      context.store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VIZ_DEBUG_STATE}`,
        !vizDebugActive
      )
    }
  })
}
