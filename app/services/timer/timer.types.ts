export interface ICountdownEvents {
  tick(): void
  stop(): void
}

export type EventMap<T> = { [K in keyof T]: Array<Function> }

export interface ITimer {
  on<K extends keyof ICountdownEvents>(
    eventName: K,
    listener: ICountdownEvents[K]
  ): void

  off<K extends keyof ICountdownEvents>(
    eventName: K,
    listener: ICountdownEvents[K]
  ): void

  start(): void
  stop(): void
  reset(): void
  isRunning(): boolean
}
