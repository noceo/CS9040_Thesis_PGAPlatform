import { ITextDataParameter } from '../ITextDataParameter'
import { INumericVizParameter } from '../INumericVizParameter'
import { ILiveVizParameter } from '../ILiveVizParameter'
import {
  IStoreLiveParams,
  IStoreVizParams,
} from '~/store/modules/global/state/state.types'

export interface IVisualizationTool {
  onNewData(data: {
    vizParams: Array<INumericVizParameter>
    textParams: Array<ITextDataParameter>
  }): void
  onNewLiveParams(data: Array<ILiveVizParameter>): void
  getAvailableParameters(): IStoreVizParams
  getAvailableLiveParameters(): IStoreLiveParams
  generateFullyRenderedContent(): void
  getScreenshot(): string
}
