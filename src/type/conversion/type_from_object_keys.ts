/**
 * Create a type literal from all object keys.
 * 
 * @type TypeFromObjectKeys<ObjectType>
 */
export type TypeFromObjectKeys<ObjectType extends unknown> = keyof ObjectType;
