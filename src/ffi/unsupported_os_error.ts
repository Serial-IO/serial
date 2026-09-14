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
    super(`Unsupported OS: ${os}\nSupported OS: '${supported.join('\', \'')}'`);
    this.os = os;
  }
}
