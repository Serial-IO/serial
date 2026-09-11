import { assertEquals } from '@std/assert/equals';
import { getCacheDir } from './get_cache_dir.ts';

Deno.test('getCacheDir()', async (test) => {
  await test.step('windows', () => {
    assertEquals(
      getCacheDir("windows", () => 'C:/users/foo/Local'),
      "C:/users/foo/Local"
    );
  });

  await test.step('windows fallback', () => {
    assertEquals(
      getCacheDir("windows", (key) => key === 'LOCALAPPDATA' ? undefined : 'C:/users/foo'),
      "C:/users/foo/AppData/Local"
    );
  });

  await test.step('darwin', () => {
    assertEquals(
      getCacheDir("darwin", () => '/Users/foo'),
      "/Users/foo/Library/Caches",
    );
  });

  await test.step('linux', () => {
    assertEquals(
      getCacheDir("linux", () => '/custom'),
      "/custom",
    );
  });
  await test.step('linux fallback', () => {
    assertEquals(
      getCacheDir("linux", () => '/custom'),
      "/custom",
    );
  });
});
