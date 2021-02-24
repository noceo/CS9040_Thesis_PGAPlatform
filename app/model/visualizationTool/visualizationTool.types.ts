import { ITextDataParameter } from '../ITextDataParameter'
import { INumericVizParameter } from '../INumericVizParameter'
import { IStoreVizParams } from '~/store/modules/global/state/state.types'

export interface IVisualizationTool {
  onNewData(data: {
    vizParams: Array<INumericVizParameter>
    textParams: Array<ITextDataParameter>
  }): void
  getAvailableParameters(): IStoreVizParams
  generateFullyRenderedContent(): void
  play(): void
}
