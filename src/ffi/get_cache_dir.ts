import type { extend } from '../type/index.ts';
import { UnsupportedOSError } from './unsupported_os_error.ts';

/**
 * This function returns the selected cache location, based on the os.
 * 
 * @param [os=Deno.build.os] Overwrite the defaulted os
 * @param [getEnv=Deno.env.get] Overwrite the default env getter function
 * @returns The cache path of the os
 */
export function getCacheDir(
  os : extend.GenericString<typeof Deno.build.os> = Deno.build.os,
  getEnv : (key : string) => string | undefined = Deno.env.get
) : string {
  switch (os) {
    case 'windows':
      return getEnv("LOCALAPPDATA") ??
        `${getEnv("USERPROFILE")}/AppData/Local`;
    
    case 'linux':
      return getEnv("XDG_CACHE_HOME") ??
        `${getEnv("HOME")}/.cache`;

    case 'darwin':
      return `${getEnv("HOME")}/Library/Caches`;
    
    case 'aix':
    case 'android':
    case 'freebsd':
    case 'illumos':
    case 'netbsd':
    case 'solaris':
    default:
      throw new UnsupportedOSError(os);
  }
}
