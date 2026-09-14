import { assertEquals } from '@std/assert/equals';
import { getBinaryPath } from './get_binary_path.ts';

Deno.test('getBinaryPath()', () => {
  assertEquals(getBinaryPath('foo', () => 'custom'), 'custom/foo/binary')
})
