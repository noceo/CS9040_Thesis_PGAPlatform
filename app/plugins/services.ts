import { Context } from '@nuxt/types'
import { provider } from '~/services/provider'

export default (
  _context: Context,
  inject: (key: string, value: any) => void
) => {
  inject('services', provider())
}
