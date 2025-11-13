import type { Baudrate, DataBits, Parity, StopBits } from './connection/index.ts';

/**
 * Options for the serial connection.
 */
export interface Options {
  /**
   * The baudrate to use for the serial device.
   */
  baudrate? : Baudrate,

  /**
   * The data bits to use for the serial device.
   */
  dataBits? : DataBits,

  /**
   * The parity to use for the serial device.
   */
  parity? : Parity,

  /**
   * The stop bits to use for the serial device.
   */
  stopBits? : StopBits

}
