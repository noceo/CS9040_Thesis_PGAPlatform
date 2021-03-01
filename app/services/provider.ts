import { IProvider } from './provider.types'
import { IFileParser } from './fileParserService/IFileParser'
import { INotificationService } from './notificationService/notificationService.types'
import { IDataManager } from './dataManager/dataManager.types'
import container from '~/IoC/inversify.config'
import TYPES from '~/IoC/types'

/**
 * Returns all IoC instances
 */
export const provider = (): IProvider => ({
  fileParser: container.get<IFileParser<object>>(TYPES.IFileParser),
  notifications: container.get<INotificationService>(TYPES.INoticationService),
  dataManager: container.get<IDataManager>(TYPES.IDataManager),
})
