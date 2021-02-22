import { IDataRow } from '../dataRow/dataRow.types'
import { IVisualizationTool } from './visualizationTool.types'
import { IStoreVizParams } from '~/store/modules/global/state/state.types'

export default abstract class VisualizationTool implements IVisualizationTool {
  protected _canvas: HTMLCanvasElement
  protected _debugMode: boolean
  protected abstract _availableParameters: IStoreVizParams

  constructor(canvas: HTMLCanvasElement, debugMode: boolean) {
    this._canvas = canvas
    this._debugMode = debugMode
  }

  abstract onNewDataRow(data: IDataRow): void

  abstract getAvailableParameters(): IStoreVizParams

  abstract generateFullyRenderedContent(): void

  abstract play(): void

  get debugMode(): boolean {
    return this._debugMode
  }

  set debugMode(debugMode: boolean) {
    this._debugMode = debugMode
  }
}
