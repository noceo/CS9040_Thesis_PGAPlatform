import { inject, injectable } from 'inversify'
import { IFileParser } from '../fileParserService/FileParser.types'
import { IParseError } from '../fileParserService/IParseError'
import { INotificationService } from '../notificationService/notificationService.types'
import { IParseResult } from '../fileParserService/IParseResult'
import { IDataManager } from './dataManager.types'
import TYPES from '~/IoC/types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { store } from '~/store'
import { StoreModule } from '~/store/store-modules'

@injectable()
export class DataManager implements IDataManager {
  private _parser: IFileParser<object>
  private _notificationService: INotificationService

  constructor(
    @inject(TYPES.IFileParser) parser: IFileParser<object>,
    @inject(TYPES.INoticationService) notificationsService: INotificationService
  ) {
    this._parser = parser
    this._notificationService = notificationsService
  }

  processNewFile(file: File, config: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const onSuccess = (result: IParseResult<any>, file: File): void => {
        this._notificationService.success({
          title: `Imported file ${file.name} successfully`,
          text: `${result.errors.length} errors occured while parsing.`,
        })
        // Write to vuex ...
        store.commit(
          `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATAFIELDS}`,
          result.meta.fields
        )
        resolve({ result, file })
      }

      const onError = (error: IParseError, file: File): void => {
        this._notificationService.error({
          title: `Import error`,
          text: `Oops something went wrong while importing.`,
        })
        reject(new Error(`Error: ${error}, File: ${file || 'unknown'}`))
      }

      // Parse file
      this._parser.parse(file, {
        ...config,
        complete: onSuccess,
        error: onError,
      })
    })
  }
}
