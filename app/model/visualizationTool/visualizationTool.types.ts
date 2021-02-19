import { IDataRow } from '../dataRow'
import { IVizParameter } from '../vizParameter/vizParameter.types'

export interface IVisualizationTool {
  onNewDataRow(data: IDataRow): void
  getAvailableParameters(): Array<IVizParameter>
  generateFullyRenderedContent(): void
  play(): void
}
