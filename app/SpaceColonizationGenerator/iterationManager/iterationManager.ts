export class IterationManager {
  private _actIteration: number

  constructor() {
    this._actIteration = 0
  }

  get actIteration(): number {
    return this._actIteration
  }
}
