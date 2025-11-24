import type { conversion } from '../type/index.ts';

/**
 * Available parities.
 */
export const parities = {
  NONE: 'NONE',
  EVEN: 'EVEN',
  MARK: 'MARK',
  ODD: 'ODD',
  SPACE: 'SPACE'
} as const;

/**
 * This type represents the parity.
*/
export type Parity = conversion.TypeFromObjectKeys<typeof parities>
