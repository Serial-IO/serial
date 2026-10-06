import { assertEquals } from '@std/assert/equals';
import { saveBinary } from './save_binary.ts';


Deno.test('saveBinary()', async () => {
  assertEquals(
    await saveBinary(new TextEncoder().encode(''), (path) => path.split('serial_io')[1]),
    '/serial/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  )
})
