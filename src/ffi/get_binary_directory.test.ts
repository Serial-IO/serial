import { assertEquals } from '@std/assert/equals';
import { getBinaryDirectory } from './get_binary_directory.ts';


Deno.test('getBinaryPath()', () => {
  assertEquals(getBinaryDirectory('foo', () => 'custom'), 'custom/foo/serial')
})
