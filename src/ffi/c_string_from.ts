export function cStringFrom(ptr: Deno.PointerValue): string | null {
  return ptr === null ? null : Deno.UnsafePointerView.getCString(ptr);
}
