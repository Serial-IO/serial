import { assertEquals } from '@std/assert/equals';
import { saveBinary } from './save_binary.ts';

Deno.test('saveBinary()', () => {
  assertEquals(saveBinary('', () => '/custom/foo'), '/custom/foo')
})
