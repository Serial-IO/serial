import { hashFromArrayBuffer } from './digest/hash_from_array_buffer.ts';
import { getBinaryDirectory } from './get_binary_directory.ts';


/**
 * @param data The data to write to disk
 * @param writeFn The function for writing the binary to disk
 * @returns The path of the written binary on disk.
 */
export async function saveBinary(
  data : Uint8Array,
  writeFn? : (path : string) => string | Promise<string>
) : Promise<string> {
  const binaryPath = `${getBinaryDirectory()}/${await hashFromArrayBuffer(data)}`;

  if (!writeFn) {
    return Deno.writeFile(
      binaryPath,
      data,
    ).then(() => binaryPath);
  }

  return writeFn(binaryPath);
}
