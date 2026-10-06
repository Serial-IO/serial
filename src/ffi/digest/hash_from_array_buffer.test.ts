import { assertEquals } from '@std/assert/equals';
import { hashFromArrayBuffer } from './hash_from_array_buffer.ts';



Deno.test('saveBinary()', async (test) => {
  await test.step('empty string', async () => {
    assertEquals(
      await hashFromArrayBuffer(new TextEncoder().encode('')),
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    )
  });

  await test.step('non empty string', async () => {
    assertEquals(
      await hashFromArrayBuffer(new TextEncoder().encode('Hello World!')),
      '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    )
  });
})
