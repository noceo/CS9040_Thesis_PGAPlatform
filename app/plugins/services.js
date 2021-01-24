import { provider } from '~/services/provider'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context, inject) => {
  inject('services', provider())
}
