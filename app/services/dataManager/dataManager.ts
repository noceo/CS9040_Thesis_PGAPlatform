import { inject, injectable } from 'inversify'
import { IFileParser } from '../fileParserService/FileParser.types'
import { IParseError } from '../fileParserService/IParseError'
import { INotificationService } from '../notificationService/notificationService.types'
import { IParseResult } from '../fileParserService/IParseResult'
import { ITimer } from '../timer/timer.types'
import { IDataManager } from './dataManager.types'
import TYPES from '~/IoC/types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { store } from '~/store'
import { StoreModule } from '~/store/store-modules'
import { IDataRow } from '~/model'

@injectable()
export class DataManager implements IDataManager {
  private _parser: IFileParser<object>
  private _notificationService: INotificationService
  private _timer: ITimer

  private _data?: Array<IDataRow>
  private _currentDataRowIndex?: number

  constructor(
    @inject(TYPES.IFileParser) parser: IFileParser<object>,
    @inject(TYPES.INoticationService)
    notificationsService: INotificationService,
    @inject(TYPES.ITimer) timer: ITimer
  ) {
    this._parser = parser
    this._notificationService = notificationsService
    this._timer = timer
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

  startDataPropagation(): void {
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VISUALIZATION_ACTIVE}`,
      true
    )
    this._timer.on('tick', this.writeNewDataRowToStore)
    this._timer.start()
  }

  stopDataPropagation(): void {
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VISUALIZATION_ACTIVE}`,
      false
    )
    this._timer.stop()
  }

  private writeNewDataRowToStore(): void {
    if (
      typeof this._data !== 'undefined' &&
      typeof this._currentDataRowIndex !== 'undefined'
    ) {
      store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_CURRENT_DATAROW}`,
        this._data[this._currentDataRowIndex]
      )
    }
  }

  private writeAllDataToStore(): void {}
}
