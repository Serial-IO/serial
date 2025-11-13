import type { conversion, extend } from "../type/index.ts";

/**
 * Common default baudrates.
 */
export const baudrates = [
  300,
  600,
  1200,
  1800,
  2400,
  4800,
  9600,
  14400,
  19200,
  38400,
  57600,
  115200,
  128000,
  256000
] as const;

/**
 * This type represents a baudrate.
 */
export type Baudrate = extend.GenericNumber<conversion.TypeFromArray<typeof baudrates>>;
