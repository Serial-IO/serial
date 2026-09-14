import type { extend } from '../type/index.ts';

/**
 * This error class throws on an unsupported OS.
 */
export class UnsupportedOSError extends Error {
  public readonly os : string;

  /**
   * @param os The OS
   * @param [supported=['windows', 'linux', 'darwin']] The supported OS
   */
  constructor(
    os : string,
    supported : extend.GenericString<typeof Deno.build.os>[] = ['windows', 'linux', 'darwin']
  ) {
    super(`Unsupported OS\n    Only the following OS are currently supported: '${supported.join('\', \'')}'\n    But got: '${os}'`);
    this.os = os;
  }
}
