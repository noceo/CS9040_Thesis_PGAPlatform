import { IDataRow } from '../dataRow/dataRow.types'
import { IStoreVizParams } from '~/store/modules/global/state/state.types'

export interface IVisualizationTool {
  onNewDataRow(data: IDataRow): void
  getAvailableParameters(): IStoreVizParams
  generateFullyRenderedContent(): void
  play(): void
}
