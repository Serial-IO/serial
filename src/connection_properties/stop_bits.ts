import { TypeFromObject } from "../type/conversion/type_from_object.ts";

/**
 * Available stop bits.
 */
export const stopBits = {
  ONE: 0,
  TWO: 1
} as const;

/**
 * This type represents the stop bits.
 */
export type StopBits = TypeFromObject<typeof stopBits>
