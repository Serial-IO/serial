import type { TypeFromArray } from "../type/conversion/type_from_array.ts";

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
// (number & {}) converts number to generic object, needed for autocompletion
// deno-lint-ignore ban-types
export type Baudrate = TypeFromArray<typeof baudrates> | (number & {});
