import { inject, injectable } from 'inversify'
import Vue from 'vue'
import { IFileParser } from '../fileParserService/IFileParser'
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
import { generateID } from '~/model/helpers/idGenerator'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { IDataParameter } from '~/model/IDataParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { IMappingFunctionCollection } from '~/model/IMappingFunctionCollection'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericVizParameter } from '~/model/INumericVizParameter'
import { ITextDataParameter } from '~/model/ITextDataParameter'

interface DataConnections {
  [key: string]: {
    id: string
    inputParam: INumericDataParameter
    mappingType: ParamMappingType
    outputParam: INumericVizParameter
  }
}

@injectable()
export class DataManager implements IDataManager {
  private _parser: IFileParser<object>
  private _notificationService: INotificationService
  private _timer: ITimer

  private _data?: Array<any>
  private _currentDataIndex: number
  private _dataParams?: Array<IDataParameter>
  private _mappingFunctions: IMappingFunctionCollection
  private _dataConnections: DataConnections
  private _updateFunction: () => void

  constructor(
    @inject(TYPES.IFileParser) parser: IFileParser<object>,
    @inject(TYPES.INoticationService)
    notificationsService: INotificationService,
    @inject(TYPES.ITimer) timer: ITimer
  ) {
    this._parser = parser
    this._notificationService = notificationsService
    this._timer = timer
    // this._currentDataRowIndex = 0
    this._mappingFunctions = mappingFunctions
    const functionTypes = []
    for (const element of Object.keys(this._mappingFunctions)) {
      functionTypes.push(element)
    }
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_MAPPING_FUNCTIONS}`,
      functionTypes
    )
    this._currentDataIndex = 0
    this._dataConnections = {}
    this._updateFunction = this.writeUpdatedValuesToStore.bind(this)
    this.addMutationHandlers()
  }

  /**
   * Processes a given file. If processing is successful, data is saved to the store
   * @param file
   * @param config A parser configuration
   */
  processNewFile(file: File, config: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const onSuccess = (result: IParseResult<any>, file: File): void => {
        this._notificationService.success({
          title: `Imported file ${file.name} successfully`,
          text: `${result.errors.length} errors occured while parsing.`,
        })

        if (result.meta.fields) {
          this.createDataParams(result.meta.fields)
          this._data = result.data
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

  /**
   * Starts the data update cycle
   */
  startDataPropagation(): void {
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VISUALIZATION_ACTIVE}`,
      true
    )
    this._timer.on('tick', this._updateFunction)
    this._timer.start()
  }

  /**
   * Stops the data update cycle
   */
  stopDataPropagation(): void {
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VISUALIZATION_ACTIVE}`,
      false
    )
    this._timer.off('tick', this._updateFunction)
    this._timer.stop()
  }

  /**
   * Creates objects for each data parameter to save to the store
   * @param fileHeaders List of parameter names
   */
  private createDataParams(fileHeaders: Array<string>): void {
    const numericDataParams: Array<INumericDataParameter> = []
    const textDataParams: Array<ITextDataParameter> = []
    const headerStringRegex = /^.*_(string)$/
    const headerNumberRegex = /^.*_(number)_(0|-?[1-9][0-9]{0,3})_(0|-?[1-9][0-9]{0,3})$/
    for (const header of fileHeaders) {
      const headerStringArray = header.split('_')
      const paramName = headerStringArray[0]
      if (headerStringRegex.test(header)) {
        textDataParams.push({
          id: generateID(),
          name: paramName,
          value: '',
          dataConnectionId: '',
        })
      } else if (headerNumberRegex.test(header)) {
        const min = parseInt(headerStringArray[2])
        const max = parseInt(headerStringArray[3])
        numericDataParams.push({
          id: generateID(),
          name: paramName,
          min,
          max,
          value: 0,
          dataConnectionId: '',
        })
      }
    }
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATA_PARAMS_NUMERIC}`,
      numericDataParams
    )
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATA_PARAMS_TEXT}`,
      textDataParams
    )
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_FILE_STATE}`,
      true
    )
    this._dataParams = [...numericDataParams, ...textDataParams]
  }

  /**
   * Add handlers for store mutations concerning changes of data connections
   */
  private addMutationHandlers(): void {
    store.subscribe((mutation: { type: string; payload: IDataConnection }) => {
      switch (mutation.type) {
        case `${StoreModule.GLOBAL}/${GlobalStoreMutation.ADD_DATA_CONNECTION}`: {
          const dataParam = store.getters[
            `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_DATA_PARAM_NUMERIC_BY_ID}`
          ](mutation.payload.dataParamId)
          const vizParam = store.getters[
            `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_VIZ_PARAM_NUMERIC_BY_ID}`
          ](mutation.payload.vizParamId)
          const newDataConnection = {
            id: mutation.payload.id,
            inputParam: dataParam,
            mappingType: mutation.payload.mappingType,
            outputParam: vizParam,
          }
          this._dataConnections[mutation.payload.id] = newDataConnection
          break
        }
        case `${StoreModule.GLOBAL}/${GlobalStoreMutation.REMOVE_DATA_CONNECTION}`: {
          const foundConnectionId = Object.keys(this._dataConnections).find(
            (connectionId) => connectionId === mutation.payload.id
          )
          if (foundConnectionId) {
            delete this._dataConnections[foundConnectionId]
          }
          break
        }
      }
    })
  }

  /**
   * Writes the updates parameters to the store
   */
  private writeUpdatedValuesToStore(): void {
    if (!this._data) {
      return
    }
    // set new dataParamValues
    const currentDataRow = this._data[this._currentDataIndex]
    const numberRegex = /^((0[.|,]\d*)|(([1-9]{1}\d*[.|,]\d*))|(0|[1-9]*))$/
    for (const dataParam of Object.entries(currentDataRow)) {
      if (dataParam[1] !== '-' && dataParam[1] !== '') {
        const paramName = dataParam[0].split('_')[0]
        const paramValue = dataParam[1] as string
        let parsedValue: any
        if (numberRegex.test(dataParam[1] as string)) {
          parsedValue = parseFloat(paramValue.replace(',', '.'))
          store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_DATA_PARAM_NUMERIC_BY_NAME}`,
            { name: paramName, value: parsedValue }
          )
        } else {
          parsedValue = paramValue
          store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_DATA_PARAM_TEXT_BY_NAME}`,
            { name: paramName, value: parsedValue }
          )
        }
      }
    }
    if (this._currentDataIndex > this._data.length - 1) {
      this._currentDataIndex = 0
    } else {
      this._currentDataIndex++
    }

    // update all mapped vizParams
    for (const dataConnection of Object.values(this._dataConnections)) {
      const inputParam = dataConnection.inputParam
      const mappingFunction = this._mappingFunctions[dataConnection.mappingType]
      const outputParam = dataConnection.outputParam
      const newVizParamValue = mappingFunction(
        inputParam.value,
        inputParam.min,
        inputParam.max,
        outputParam.min,
        outputParam.max
      )
      const newVizParam: INumericVizParameter = {
        id: outputParam.id,
        name: outputParam.name,
        value: newVizParamValue,
        min: outputParam.min,
        max: outputParam.max,
        valueModifier: outputParam.valueModifier,
        dataConnectionId: dataConnection.id,
      }
      store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_VIZ_PARAM_NUMERIC}`,
        newVizParam
      )
    }
    store.commit(
      `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATA_TRANSFER_STATE}`,
      true
    )
    Vue.nextTick(() => {
      store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATA_TRANSFER_STATE}`,
        false
      )
    })
  }

  private writeAllDataToStore(): void {}
}
