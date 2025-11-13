import type { conversion } from '../type/index.ts';

/**
 * Available parities.
 */
export const parities = {
  NONE: 0,
  EVEN: 1,
  MARK: 2,
  ODD: 3,
  SPACE: 4
} as const;

/**
 * This type represents the parity.
*/
export type Parity = conversion.TypeFromObjectValues<typeof parities>
