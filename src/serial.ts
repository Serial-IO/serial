import type { Device } from './connection/device.ts';

/**
 * This class represents a serial instance.
 */
export class Serial {
  /** 
   * The port for the serial connection.
   * 
   * @readonly
   */
  public readonly port : string;

  /**
   * Create an new serial instance.
   */
  constructor(port : string) {
    this.port = port;
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
   * });
   * 
   * // Found device "Arduino (www.arduino.cc)" on port "COM5".
   * ```
   * @returns A list of available devices.
   */
  public static getAvailableDevices() : Promise<Device[]> {
    return new Promise(() => ([]))
  }
}
