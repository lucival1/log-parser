import { Injectable } from '@nestjs/common';

// Current TS has a issue when transpiling dynamic import from commonJS modules.
// This is the only workaround to the issue.
@Injectable()
export class DynamicImport {
  private slowComputing: any;

  constructor() {
    (async () => {
      this.slowComputing = await this.dynamicImport();
    })();
  }

  async dynamicImport() {
    // @ts-ignore
    return Function('return import("../../../lib/slowComputation.js")')
    () as Promise<typeof import("../../../lib/slowComputation")>;
  }
}
