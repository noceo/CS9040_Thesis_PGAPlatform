export interface IParseMeta {
  delimiter: string // Delimiter used
  linebreak: string // Line break sequence used
  aborted: boolean // Whether process was aborted
  fields?: Array<string> | undefined // Array of field names
  truncated: boolean // Whether preview consumed all input
}
