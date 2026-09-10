/**
 * Abort a blocking read operation running in a different thread.
 * 
 * The target read function returns immediately with ::cpp_core::StatusCode::Io::kAbortReadError.
 * 
 * @returns 0 on success or a negative error code from ::cpp_core::StatusCode on error.
 * 
 * [`cpp_core/interface/serial_abort_read.h`](https://github.com/Serial-IO/cpp-core/blob/main/include/cpp_core/interface/serial_abort_read.h)
 */
export const symbol : Deno.ForeignFunction = {
  name: 'serialAbortRead',
  parameters: [
    /** Port handle. */
    'i64',
    /** [optional] Callback to invoke on error. Defined in error_callback.h. Default is `nullptr`. */
    'function'
  ],
  result: 'i32'
}
