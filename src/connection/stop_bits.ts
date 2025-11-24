import type { conversion } from '../type/index.ts';

/**
 * Available stop bits.
 */
export const stopBits = {
  ONE: 'ONE',
  TWO: 'TWO'
} as const;

/**
 * This type represents the stop bits.
 */
export type StopBits = conversion.TypeFromObjectKeys<typeof stopBits>
