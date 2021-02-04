import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from './types'
import { CSVParser } from '~/services/fileParserService/CSVParser'
import { IFileParser } from '~/services/fileParserService/FileParser.types'
import { INotificationService } from '~/services/notificationService/notificationService.types'
import { NotificationService } from '~/services/notificationService/notificationService'
import { IDataManager } from '~/services/dataManager/dataManager.types'
import { DataManager } from '~/services/dataManager/dataManager'
import { ITimer } from '~/services/timer/timer.types'
import { Timer } from '~/services/timer/timer'

const container = new Container()
container.bind<IFileParser<object>>(TYPES.IFileParser).to(CSVParser)
container.bind<INotificationService>(TYPES.INoticationService).toConstantValue(
  new NotificationService(
    {
      title: 'Success',
      text: 'Operation successful.',
    },
    {
      title: 'Error',
      text: 'Oops, something went wrong.',
    },
    4000
  )
)
container.bind<ITimer>(TYPES.ITimer).to(Timer)
container.bind<IDataManager>(TYPES.IDataManager).to(DataManager)

// type locale = {
//   defaultSuccess: INotification
//   defaultError: INotification
// }

// export const onLanguageUpdate = (newLocale: locale): void => {
//   container
//     .rebind<INotificationService>(TYPES.INoticationService)
//     .toConstantValue(
//       new NotificationService(
//         {
//           title: 'Success',
//           text: 'Operation successful.',
//         },
//         {
//           title: newLocale.defaultError.title,
//           text: newLocale.defaultError.title,
//         },
//         4000
//       )
//     )
// }

export default container
