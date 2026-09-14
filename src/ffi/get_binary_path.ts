import { getCacheDirectory } from './get_cache_directory.ts';

/**
 * This function returns the path for the binary file.
 * 
 * @param [namespace='serial__serial'] The namespace to use
 * @param [getCacheDirectoryFn=getCacheDirectory] The function for getting the cache directory
 * @returns The path for the binary file.
 */
export function getBinaryPath(
  namespace : string = 'serial__serial',
  getCacheDirectoryFn : typeof getCacheDirectory = getCacheDirectory
) : string {
  // TODO: implement hash of binary instead of just writing the binary as "binary"
  return `${getCacheDirectoryFn()}/${namespace}/binary`
}
