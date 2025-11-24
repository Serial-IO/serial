import type { conversion } from '../type/index.ts';

/**
 * Available data bits.
 */
export const dataBits = {
  FIVE: 'FIVE',
  SIX: 'SIX',
  SEVEN: 'SEVEN',
  EIGHT: 'EIGHT'
} as const;

/**
 * This type represents data bits.
 */
export type DataBits = conversion.TypeFromObjectKeys<typeof dataBits>;
