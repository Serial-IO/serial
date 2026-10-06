/**
 * Calculates the hash of the given data and returns it as a hexadecimal string.
 * 
 * @param data The data to hash
 * @returns A promise that resolves to the hexadecimal representation of the hash.
 */
export function hashFromArrayBuffer(
  data : Uint8Array | ArrayBuffer,
  algorithm : string = 'SHA-256'
) : Promise<string> {
  return crypto.subtle.digest(algorithm, new Uint8Array(data))
    .then((hashBuffer) => new Uint8Array(hashBuffer).toHex());
}
