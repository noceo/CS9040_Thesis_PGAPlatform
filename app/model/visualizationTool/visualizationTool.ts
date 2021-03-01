import { IVizParameter } from '../IVizParameter'
import { ITextDataParameter } from '../ITextDataParameter'
import { ILiveVizParameter } from '../ILiveVizParameter'
import { IVisualizationTool } from './visualizationTool.types'
import {
  IStoreLiveParams,
  IStoreVizParams,
} from '~/store/modules/global/state/state.types'

export default abstract class VisualizationTool implements IVisualizationTool {
  protected _canvas: HTMLCanvasElement
  protected _debugMode: boolean
  protected abstract _availableParameters: IStoreVizParams

  constructor(canvas: HTMLCanvasElement, debugMode: boolean) {
    this._canvas = canvas
    this._debugMode = debugMode
  }

  /**
   * Callback function for triggering visaulization change on new data
   * @param data
   */
  abstract onNewData(data: {
    vizParams: Array<IVizParameter>
    textParams: Array<ITextDataParameter>
  }): void

  /**
   * Callback function for triggering visaulization change on new live data
   * @param data
   */
  abstract onNewLiveParams(data: Array<ILiveVizParameter>): void

  /**
   * Gets all available visualization paramters
   */
  abstract getAvailableParameters(): IStoreVizParams

  /**
   * Gets all available visualization live paramters
   */
  abstract getAvailableLiveParameters(): IStoreLiveParams

  /**
   * Generates visual content depending on all available data
   */
  abstract generateFullyRenderedContent(): void

  /**
   * Returns a screenshot in base64 encoding
   */
  abstract getScreenshot(): string

  get debugMode(): boolean {
    return this._debugMode
  }

  set debugMode(debugMode: boolean) {
    this._debugMode = debugMode
  }
}
