import type { conversion } from '../type/index.ts';

/**
 * Available data bits.
 */
export const dataBits = {
  FIVE: 0,
  SIX: 1,
  SEVEN: 2,
  EIGHT: 3
} as const;

/**
 * This type represents data bits.
 */
export type DataBits = conversion.TypeFromObjectValues<typeof dataBits>;
