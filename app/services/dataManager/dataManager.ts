import { inject, injectable } from 'inversify'
import { IFileParser } from '../fileParserService/FileParser.types'
import { IParseError } from '../fileParserService/IParseError'
import { INotificationService } from '../notificationService/notificationService.types'
import { IParseResult } from '../fileParserService/IParseResult'
import { ITimer } from '../timer/timer.types'
import { IDataManager } from './dataManager.types'
import { mappingFunctions } from './mappingFunctions'
import TYPES from '~/IoC/types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { store } from '~/store'
import { StoreModule } from '~/store/store-modules'
import { IDataRow } from '~/model/dataRow/dataRow.types'
import { generateID } from '~/model/helpers/idGenerator'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { IDataParameter } from '~/model/IDataParameter'
import { IVizParameter } from '~/model/IVizParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { IMappingFunctionCollection } from '~/model/IMappingFunctionCollection'

@injectable()
export class DataManager implements IDataManager {
  private _parser: IFileParser<object>
  private _notificationService: INotificationService
  private _timer: ITimer

  private _data?: Array<IDataRow>
  private _currentDataRowIndex: number
  private _mappingFunctions: IMappingFunctionCollection

  constructor(
    @inject(TYPES.IFileParser) parser: IFileParser<object>,
    @inject(TYPES.INoticationService)
    notificationsService: INotificationService,
    @inject(TYPES.ITimer) timer: ITimer
  ) {
    this._parser = parser
    this._notificationService = notificationsService
    this._timer = timer
    this._currentDataRowIndex = 0
    this._mappingFunctions = mappingFunctions
    this.addMutationHandlers()
  }

  processNewFile(file: File, config: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const onSuccess = (result: IParseResult<any>, file: File): void => {
        this._notificationService.success({
          title: `Imported file ${file.name} successfully`,
          text: `${result.errors.length} errors occured while parsing.`,
        })

        if (result.meta.fields) {
          // Write to vuex ...
          const dataParams: Array<INumericDataParameter> = []
          result.meta.fields?.forEach((element) => {
            dataParams.push({
              id: generateID(),
              name: element,
              min: 0,
              max: 0,
              value: 0,
              dataConnectionId: '',
            })
          })
          store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATA_PARAMS_NUMERIC}`,
            dataParams
          )
          resolve({ result, file })
        }
        reject(new Error('Data Fields not readable'))
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

  onMappingChanged(
    dataParam: IDataParameter,
    vizParam: IVizParameter,
    mappingFunction: ParamMappingType
  ): void {
    // connection already exists
    if (dataParam.dataConnectionId !== '') {
      store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_DATA_CONNECTION}`,
        { dataParamId: dataParam.id, vizParamId: vizParam.id, mappingFunction }
      )
      return
    }

    // connection does not exist / create new connection
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.ADD_DATA_CONNECTION}`,
      { dataParamId: dataParam.id, vizParamId: vizParam.id, mappingFunction }
    )
  }

  private addMutationHandlers(): void {
    store.subscribe((mutation: any) => {
      switch (mutation.type) {
        case `${StoreModule.GLOBAL}/${GlobalStoreMutation.ADD_DATA_CONNECTION}`: {
          console.log('ADD_CONNECTION', mutation)
          break
        }
        case `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_DATA_CONNECTION}`: {
          console.log('UPDATE_CONNECTION', mutation)
          break
        }
        case `${StoreModule.GLOBAL}/${GlobalStoreMutation.REMOVE_DATA_CONNECTION}`: {
          console.log('REMOVE_CONNECTION', mutation)
          break
        }
      }
    })
  }

  private writeNewDataRowToStore(): void {
    if (typeof this._data !== 'undefined') {
      console.log('CUR_DATA_ROW', this._data[this._currentDataRowIndex])
      store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_CURRENT_DATAROW}`,
        this._data[this._currentDataRowIndex]
      )
      this._currentDataRowIndex++
    }
  }

  private writeAllDataToStore(): void {}
}
