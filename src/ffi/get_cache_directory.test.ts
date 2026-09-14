import { assertEquals, assertThrows } from '@std/assert';
import { getCacheDirectory } from './get_cache_directory.ts';
import { UnsupportedOSError } from './unsupported_os_error.ts';

Deno.test('getCacheDirectory()', async (test) => {
  await test.step('windows', () => {
    assertEquals(
      getCacheDirectory("windows", () => 'C:/users/foo/Local'),
      "C:/users/foo/Local"
    );
  });

  await test.step('windows (fallback)', () => {
    assertEquals(
      getCacheDirectory("windows", (key) => key === 'LOCALAPPDATA' ? undefined : 'C:/users/foo'),
      "C:/users/foo/AppData/Local"
    );
  });

  await test.step('linux', () => {
    assertEquals(
      getCacheDirectory("linux", () => '/custom'),
      "/custom",
    );
  });

  await test.step('linux (fallback)', () => {
    assertEquals(
      getCacheDirectory("linux", (key) => key === 'XDG_CACHE_HOME' ? undefined : '/custom'),
      "/custom/.cache"
    );
  });

  await test.step('darwin', () => {
    assertEquals(
      getCacheDirectory("darwin", () => '/Users/foo'),
      "/Users/foo/Library/Caches",
    );
  });

  await test.step('unsupported OS', () => {
    assertThrows(() => getCacheDirectory("foo"), UnsupportedOSError);
  })
});
