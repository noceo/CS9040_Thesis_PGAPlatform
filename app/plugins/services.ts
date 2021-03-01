import { Context } from '@nuxt/types'
import { provider } from '~/services/provider'

/**
 * Injects a function to all components so that they can access instances of the IoC container
 */
export default (
  _context: Context,
  inject: (key: string, value: any) => void
) => {
  inject('services', provider())
}
