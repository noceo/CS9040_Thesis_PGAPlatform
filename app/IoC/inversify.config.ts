import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from './types'
import { CSVParser } from '~/services/fileParserService/CSVParser'
import { IFileParser } from '~/services/fileParserService/FileParser.types'
import {
  INotification,
  INotificationService,
} from '~/services/notificationService/notificationService.types'
import { NotificationService } from '~/services/notificationService/notificationService'
import defaultLocale from '~/locales/en-EN'
import { IDataManager } from '~/services/dataManager/dataManager.types'
import { DataManager } from '~/services/dataManager/dataManager'

const container = new Container()
container.bind<IFileParser<object>>(TYPES.IFileParser).to(CSVParser)
container.bind<INotificationService>(TYPES.INoticationService).toConstantValue(
  new NotificationService(
    {
      title: defaultLocale.common.defaultSuccess.title,
      text: defaultLocale.common.defaultSuccess.text,
    },
    {
      title: defaultLocale.common.defaultError.title,
      text: defaultLocale.common.defaultError.title,
    }
  )
)
container.bind<IDataManager>(TYPES.IDataManager).to(DataManager)

type locale = {
  defaultSuccess: INotification
  defaultError: INotification
}

export const onLanguageUpdate = (newLocale: locale): void => {
  container
    .rebind<INotificationService>(TYPES.INoticationService)
    .toConstantValue(
      new NotificationService(
        {
          title: newLocale.defaultSuccess.title,
          text: newLocale.defaultSuccess.text,
        },
        {
          title: newLocale.defaultError.title,
          text: newLocale.defaultError.title,
        }
      )
    )
}

export default container
