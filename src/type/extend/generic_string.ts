/**
 * Extend a string type literal to a generic string for better autocompletion.
 * 
 * @type GenericString<NumberType>
 */
// (number & {}) converts string to generic object, needed for autocompletion
// deno-lint-ignore ban-types
export type GenericString<StringType extends string> = StringType | (string & {});
