import { IDataRow } from '../dataRow'
import { IVizParameter } from '../vizParameter/vizParameter.types'
import { IVisualizationTool } from './visualizationTool.types'

export default abstract class VisualizationTool implements IVisualizationTool {
  protected _canvas: HTMLCanvasElement
  protected abstract _availableParameters: Array<IVizParameter>

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
  }

  abstract onNewDataRow(data: IDataRow): void

  abstract getAvailableParameters(): Array<IVizParameter>

  abstract generateFullyRenderedContent(): void
}
