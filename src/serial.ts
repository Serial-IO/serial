import { dataBits, parities, stopBits, type Device } from './connection/index.ts';
import type { read, write } from './operations/index.ts';
import type { Options } from './options.ts';

/**
 * This class represents a serial instance.
 * 
 * @example
 * ```ts
 * const devices = await Serial.getAvailableDevices();
 * 
 * devices.forEach((device) => {
 *   console.log(`Found device "${device.manufacturer}" on port "${device.port}".`);
 *   // Found device "Arduino (www.arduino.cc)" on port "COM5".
 * });
 * 
 * 
 * const serial = new Serial('COM5');
 * 
 * const buffer = new Uint8Array(256);
 * const bytesRead = await serial.read(buffer);
 * 
 * const data = new TextDecoder().decode(buffer);
 * 
 * console.log(`Read ${bytesRead} byte(s), data:\n${data}`);
 * // Read 12 byte(s), data:
 * // Hello World!
 * ```
 */
export class Serial {
  /** 
   * The port for the serial connection.
   * 
   * @readonly
   */
  public readonly port : string;
  private readonly options : Options;

  /**
   * Create an new serial instance.
   * 
   * @param port Port to connect to (ex. `ttyACM2`, `COM5`, ...)
   * @param options Options for the serial connection
   */
  constructor(
    port : string,
    options? : Options
  ) {
    this.port = port;
    this.options = Object.assign<
      Options,
      Options
    >(
      {
        baudrate: 9600,
        dataBits: dataBits.EIGHT,
        parity: parities.NONE,
        stopBits: stopBits.ONE
      },
      options ?? {}
    );
  }

  /**
   * Get a list of available serial devices.
   * 
   * @example
   * ```ts
   * const devices = await Serial.getAvailableDevices();
   * 
   * devices.forEach((device) => {
   *   console.log(`Found device "${device.manufacturer}" on port "${device.port}".`);
   *   // Found device "Arduino (www.arduino.cc)" on port "COM5".
   * });
   * ```
   * @returns A list of available devices.
   */
  public static getAvailableDevices() : Promise<Device[]> {
    return new Promise((resolve) => resolve([]))
  }

  /**
   * Read data from a serial device.
   * 
   * @param buffer Buffer to read from the serial device
   * @param options Options for reading
   * @returns A Promise that resolves to the number of bytes read.
   */
  public read(
    buffer : Uint8Array,
    options? : read.Options
  ) : Promise<number> {
    return new Promise((resolve) => resolve(0))
  }

  /**
   * write data to a serial device.
   * 
   * @param buffer Buffer to write to the serial device
   * @param options Options for writing
   * @returns A Promise that resolves to the number of bytes written.
   */
  public write(
    buffer : Uint8Array,
    options? : write.Options
  ) : Promise<number> {
    return new Promise((resolve) => resolve(0))
  }
}
