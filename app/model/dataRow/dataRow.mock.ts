import { DataRow } from './dataRow'
import { IDataRow, IDataRowData } from './dataRow.types'

const mock = (): Array<IDataRowData> => [
  {
    id: 1,
    timestamp: '',
    dataFields: [],
  },
]

export const mockDataRow = (
  data: Array<IDataRowData> = mock()
): Array<IDataRow> => data.map((item) => new DataRow(item))
