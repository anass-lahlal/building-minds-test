export namespace AppActions {
  export class UpdateTags {
    static readonly type = '[App] Update Tags';
    constructor(public readonly tags: string[]) {}
  }
}
