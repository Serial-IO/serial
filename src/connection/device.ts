/**
 * This interface represents a device object.
 */
export interface Device {
  /**
   * The name of the port (E.g. `ttyACM2`, `COM5`, ...)
   */
  port : string,

  /**
   * The full path to the port. (E.g. `/dev/ttyACM2`, `\\\\?\\acpi#pnp0501#0#{86e0d1e0-8089-11d0-9ce4-08003e301f73}`, ...)
   */
  path : string,

  /**
   * The manufacturer of the device. (E.g. `Arduino (www.arduino.cc)`, `Arduino LLC (www.arduino.cc)`, ...)
   */
  manufacturer : string | undefined,
  
  /**
   * The serial number of the device. (E.g. `698471028216477376C1`, ...)
   */
  serialNumber : string | undefined,

  /**
   * The Plug and Play ID of the device. (E.g. `usb-Arduino__www.arduino.cc__0043_698471028216477376-if00`,
   * `USB\\VID_5678&PID_1234\\698471028216477376`)
   */
  pnpId : string | undefined,

  /**
   * The location ID of the device on where it is connected. (E.g. `Port_#0007.Hub_#0002`)
   */
  locationId : string | undefined,

  /**
   * The product ID of the device. (E.g. `1234`)
   */
  productId : string | undefined,

  /**
   * The vendor ID of the device. (E.g. `5678`)
   */
  vendorId : string | undefined
}
