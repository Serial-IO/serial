import type { Parity, StopBits, Baudrate, DataBits } from "../../connection_properties/index.ts";
import type { ErrorCallback } from "../error_callback.ts";

/**
 * Open and configure a serial port.
 * 
 * @param port Null-terminated device identifier (e.g. "COM3", "/dev/ttyUSB0"). Passing `nullptr` results in a failure.
 * @param baudrate Desired baud rate in bit/s (≥ 300).
 * @param data_bits Number of data bits (5–8).
 * @param parity 0 = none, 1 = even, 2 = odd.
 * @param stopBits 0 = 1 stop bit, 2 = 2 stop bits.
 * @param error_callback [optional] Callback to invoke on error. Defined in error_callback.h. Default is `nullptr`.
 * @return A positive opaque handle on success or a negative value from ::cpp_core::StatusCodes on failure.
 */
export function open(
  port : string,
  baudrate : Baudrate,
  dataBits : DataBits,
  parity : Parity,
  stopBits : StopBits,
  errorCallback : ErrorCallback
) {

}
