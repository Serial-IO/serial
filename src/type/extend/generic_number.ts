/**
 * Extend a number type literal to a generic number for better autocompletion.
 * 
 * @type GenericNumber<NumberType>
 */
// (number & {}) converts number to generic object, needed for autocompletion
// deno-lint-ignore ban-types
export type GenericNumber<NumberType extends number> = NumberType | (number & {});
