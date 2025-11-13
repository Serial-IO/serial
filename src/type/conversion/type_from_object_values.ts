/**
 * Create a type literal from all object values.
 * 
 * @type TypeFromObjectValues<ObjectType>
 */
export type TypeFromObjectValues<ObjectType extends unknown> = ObjectType[keyof ObjectType];
