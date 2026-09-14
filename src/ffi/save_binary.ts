import { getBinaryPath } from './get_binary_path.ts';

/**
 * @param data The base64 encoded data to write
 * @param writeFn The function for writing the binary to disk
 * @returns The path of the written binary on disk.
 */
export function saveBinary(
  data : string
) : Promise<string>;

export function saveBinary(
  data : string,
  writeFn : (path : string) => string
) : string;

export function saveBinary(
  data : string,
  writeFn : (path : string) => Promise<string>
) : Promise<string>;

export function saveBinary(
  data : string,
  writeFn? : (path : string) => string | Promise<string>
) : string | Promise<string> {
  const binaryPath = getBinaryPath();

  if (!writeFn) {
    return Deno.writeFile(
      binaryPath,
      Uint8Array.fromBase64(data),
    ).then(() => binaryPath);
  }

  return writeFn(binaryPath);
}
