import { IDataRow } from '../dataRow'
import { IVizParameter } from '../vizParameter/vizParameter.types'
import { IVisualizationTool } from './visualizationTool.types'

export default abstract class VisualizationTool implements IVisualizationTool {
  protected _canvas: HTMLCanvasElement
  protected _debugMode: boolean
  protected abstract _availableParameters: Array<IVizParameter>

  constructor(canvas: HTMLCanvasElement, debugMode: boolean) {
    this._canvas = canvas
    this._debugMode = debugMode
  }

  abstract onNewDataRow(data: IDataRow): void

  abstract getAvailableParameters(): Array<IVizParameter>

  abstract generateFullyRenderedContent(): void

  abstract play(): void

  get debugMode(): boolean {
    return this._debugMode
  }

  set debugMode(debugMode: boolean) {
    this._debugMode = debugMode
  }
}
