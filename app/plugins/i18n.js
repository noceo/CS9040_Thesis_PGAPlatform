import { onLanguageUpdate } from '~/IoC/inversify.config'

export default ({ app }) => {
  app.i18n.onLanguageSwitch = ({ newLocale }) => {
    onLanguageUpdate(newLocale)
  }
}
