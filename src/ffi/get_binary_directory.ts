import { getCacheDirectory } from './get_cache_directory.ts';


/**
 * This function returns the directoy path for the binary file.
 * 
 * @param namespace The namespace to use
 * @param getCacheDirectoryFn The function for getting the cache directory
 * @returns The directory path for the binary file.
 */
export function getBinaryDirectory(
  namespace : string = 'serial_io',
  getCacheDirectoryFn : typeof getCacheDirectory = getCacheDirectory
) : string {
  return `${getCacheDirectoryFn()}/${namespace}/serial`;
}
