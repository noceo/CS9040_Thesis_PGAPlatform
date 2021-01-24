import { IDataManager } from './dataManager/dataManager.types'
import { IFileParser } from './fileParserService/FileParser.types'
import { INotificationService } from './notificationService/notificationService.types'

export interface IProvider {
  fileParser: IFileParser<object>
  notifications: INotificationService
  dataManager: IDataManager
}
