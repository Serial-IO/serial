import type { conversion } from '../type/index.ts';

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
export type StopBits = conversion.TypeFromObjectValues<typeof stopBits>
