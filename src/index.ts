/**
 * This module contains functions and types for the serial communication.
 * 
 * @example
 * ```ts
 * const ports = await Serial.listPorts();
 * 
 * ports.forEach((port) => {
 *   console.log(`Found device "${port.manufacturer}" on port "${port.name}".`);
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
 * @module
 */

export { Serial } from './serial.ts'
export type { Options } from './options.ts'
