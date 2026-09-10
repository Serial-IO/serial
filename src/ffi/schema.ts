/**
 * A callback parameter as represented by FFI.
 *
 * This is intentionally kept small for now.
 * Additional properties can be added without changing the mapper.
 */
export type FFICallbackParameter = {
  readonly name? : string;
  readonly type : string;
};


/**
 * A callback/function-pointer description.
 */
export type FFICallback = {
  readonly returnType : string;

  readonly parameters : readonly FFICallbackParameter[];
};


/**
 * A function parameter from ASTrein.
 */
export type FFIParameter = {
  readonly name? : string;

  /**
   * Original C type.
   *
   * @example
   * ```
   * "int"
   * "int64_t"
   * "void *"
   * "const char *"
   * "void (*)(int)"
   * ```
   */
  readonly type : string;

  readonly size : number;

  readonly alignment : number;

  /**
   * Present when this parameter is a function pointer.
   *
   * @example
   * ```ts
   * {
   *   type: "void (*)(int)",
   *   callback: {
   *     returnType: "void",
   *     parameters: [
   *       { type: "int" }
   *     ]
   *   }
   * }
   * ```
   */
  readonly callback? : FFICallback;
};


/**
 * A FFI function.
 */
export type FFIFunction = {
  readonly name : string;

  /**
   * Exported symbol name.
   */
  readonly symbol : string;

  readonly returnType : string;

  readonly parameters : readonly FFIParameter[];
};

export interface FFIEnumValue {
  name : string;
  value : number;
}

export interface FFIEnum {
  name : string;
  underlyingType : string;
  values : FFIEnumValue[];
}


/**
 * Schema v3 FFI API.
 */
export type FFISchema = {
  readonly schema : "astrein_ffi_api";

  readonly schemaVersion : 3;

  readonly functions : readonly FFIFunction[];

  readonly enums? : readonly FFIEnum[];

  readonly structs? : readonly unknown[];
};


/**
 * Primitive C types.
 */
export type FFIPrimitiveType =
  | "void"

  | "bool"

  | "char"
  | "signed char"
  | "unsigned char"

  | "short"
  | "unsigned short"

  | "int"
  | "unsigned int"

  | "long"
  | "unsigned long"

  | "long long"
  | "unsigned long long"

  | "int8_t"
  | "uint8_t"
  | "int16_t"
  | "uint16_t"
  | "int32_t"
  | "uint32_t"
  | "int64_t"
  | "uint64_t"

  | "size_t"
  | "ssize_t"

  | "float"
  | "double";


/**
 * Maps primitive C types to FFI native types.
 */
export type FFIPrimitiveTypeToNativeType<T extends string> =
  T extends "void"
    ? "void"

    : T extends "bool"
      ? "bool"

    : T extends
        | "char"
        | "signed char"
        | "int8_t"
      ? "i8"

    : T extends
        | "unsigned char"
        | "uint8_t"
      ? "u8"

    : T extends
        | "short"
        | "int16_t"
      ? "i16"

    : T extends
        | "unsigned short"
        | "uint16_t"
      ? "u16"

    : T extends
        | "int"
        | "int32_t"
      ? "i32"

    : T extends
        | "unsigned int"
        | "uint32_t"
      ? "u32"

    : T extends "long"
      ? "i64"

    : T extends "unsigned long"
      ? "u64"

    : T extends
        | "long long"
        | "int64_t"
        | "ssize_t"
      ? "i64"

    : T extends
        | "unsigned long long"
        | "uint64_t"
        | "size_t"
      ? "u64"

    : T extends "float"
      ? "f32"

    : T extends "double"
      ? "f64"

    : never;


/**
 * Maps normal C types to FFI native types.
 *
 * Pointers and references are represented as "pointer".
 *
 * Function pointers are handled separately through the `callback`
 * property on FFIParameter.
 */
export type FFINormalTypeToNativeType<Type extends string> =
  Type extends "void"
    ? "void"

    /**
     * Pointer.
     *
     * @example
     * ```
     * "void *"
     * "char *"
     * "const char *"
     * "MyStruct *"
     * ```
     */
    : Type extends `${string}*`
      ? "pointer"

    /**
     * Reference.
     *
     * @example
     * ```
     * "Foo &"
     * "const Foo &"
     * ```
     */
    : Type extends `${string}&`
      ? "pointer"

    /**
     * Primitive.
     */
    : FFIPrimitiveTypeToNativeType<Type>;


/**
 * Converts one callback parameter into its Deno FFI type.
 */
export type FFICallbackParameterTypeToNativeType<Parameter extends FFICallbackParameter> =
  FFINormalTypeToNativeType<Parameter["type"]>;


/**
 * Converts the complete callback signature.
 *
 * @example
 * ```ts
 * {
 *   returnType: "void",
 *   parameters: [
 *     { type: "int" }
 *   ]
 * }
 * ```
 * becomes:
 * ```ts
 * {
 *   parameters: ["i32"],
 *   result: "void"
 * }
 * ```
 */
export type FFICallbackTypeToNativeType<CallbackType extends FFICallback> = {
  parameters : {
    [Key in keyof CallbackType["parameters"]]:
      CallbackType["parameters"][Key] extends FFICallbackParameter
        ? FFICallbackParameterTypeToNativeType<CallbackType["parameters"][Key]>
        : never;
  };

  result: FFINormalTypeToNativeType<CallbackType["returnType"]>;
};

/**
 * Converts a parameter into the corresponding FFI type.
 *
 * @example
 * ```ts
 * {
 *   type: "void (*)(int)",
 *   callback: {
 *     returnType: "void",
 *     parameters: [
 *       { type: "int" }
 *     ]
 *   }
 * }
 * ```
 * becomes:
 * ```ts
 * {
 *   parameters: ["i32"],
 *   result: "void"
 * }
 * ```
 */
export type FFIParameterTypeToNativeParameterType<ParameterType extends FFIParameter> =
  ParameterType extends {
    readonly callback: infer CallbackType;
  }
    ? CallbackType extends FFICallback
      ? FFICallbackTypeToNativeType<CallbackType>
      : never

    : FFINormalTypeToNativeType<ParameterType["type"]>;

/**
 * Converts an entire parameter tuple.
 *
 * @example
 * ```ts
 * ["pointer", "i32", "i32"]
 * ```
 * must NOT become:
 * ```ts
 * ("pointer" | "i32")[]
 * ```
 */
export type FFIParametersTypeToNativeParametersType<ParameterType extends readonly FFIParameter[]> = {
  [K in keyof ParameterType]:
    ParameterType[K] extends FFIParameter
      ? FFIParameterTypeToNativeParameterType<ParameterType[K]>
      : never;
};

/**
 * Converts a function into a FFI function definition.
 *
 * @example
 * ```ts
 * {
 *   symbol: "serialOpen",
 *   returnType: "int64_t",
 *   parameters: [
 *     { type: "const char *", ... },
 *     { type: "int32_t", ... }
 *   ]
 * }
 * ```
 * becomes:
 * ```ts
 * {
 *   parameters: ["pointer", "i32"],
 *   result: "i64"
 * }
 * ```
 */
export type FFIFunctionTypeToNativeFunctionType<FunctionType extends FFIFunction> = {
  parameters: FFIParametersTypeToNativeParametersType<FunctionType["parameters"]>;
  result: FFINormalTypeToNativeType<FunctionType["returnType"]>;
};

/**
 * Converts an entire schema into the object accepted by Deno.dlopen().
 *
 * The key is the actual exported `symbol`, not the schema `name`.
 *
 * @example
 * ```ts
 * functions: [
 *   {
 *     name: "serialOpen",
 *     symbol: "serialOpen",
 *     ...
 *   }
 * ]
 * ```
 * becomes:
 * ```ts
 * {
 *   serialOpen: {
 *     parameters: [...],
 *     result: ...
 *   }
 * }
 * ```
 */
export type FFISchemaToNativeSchema<Schema extends FFISchema> = {
  [FunctionsType in Schema["functions"][number] as FunctionsType["symbol"]]:
    FFIFunctionTypeToNativeFunctionType<FunctionsType>;
};

/**
 * Alias specifically describing the object passed to Deno.dlopen().
 */
export type FFISymbols<Schema extends FFISchema> = FFISchemaToNativeSchema<Schema>;

/**
 * Runtime conversion from a primitive C type string to a native FFI type.
 *
 * This function mirrors {@link FFIPrimitiveTypeToNativeType<T>}.
 */
export function ffiTypeToNativeType(
  type : string,
  schema : FFISchema
) : Deno.NativeType {

  /**
   * Function pointers should normally be handled through the
   * `callback` property before reaching this function.
   *
   * This fallback exists for incomplete AST data.
   */
  if (
    type.includes("(*") ||
    type.includes("(*)")
  ) {
    throw new Error(
      `Function pointer "${type}" has no callback metadata.`,
    );
  }

  /**
   * Pointer.
   */
  if (type.endsWith("*")) {
    return "pointer";
  }


  /**
   * Reference.
   */
  if (type.endsWith("&")) {
    return "pointer";
  }

  const enumType = schema.enums?.find(
    (e) => e.name === type,
  );

  if (enumType) {
    return ffiTypeToNativeType(enumType.underlyingType, schema);
  }

  switch (type) {
    case "bool":
      return "bool";

    case "char":
    case "signed char":
    case "int8_t":
      return "i8";

    case "unsigned char":
    case "uint8_t":
      return "u8";

    case "short":
    case "int16_t":
      return "i16";

    case "unsigned short":
    case "uint16_t":
      return "u16";

    case "int":
    case "int32_t":
      return "i32";

    case "unsigned int":
    case "uint32_t":
      return "u32";

    case "long":
      return "i64";

    case "unsigned long":
      return "u64";

    case "long long":
    case "int64_t":
    case "ssize_t":
      return "i64";

    case "unsigned long long":
    case "uint64_t":
    case "size_t":
      return "u64";

    case "float":
      return "f32";

    case "double":
      return "f64";
    
    case "intptr_t":
      return "isize";

    case "uintptr_t":
      return "usize";

    default:
      throw new Error(
        `Unsupported C type: "${type}"`,
      );
  }
}

/**
 * Runtime conversion from a normal C type string to a native FFI type.
 * 
 * This function mirrors {@link FFINormalTypeToNativeType<T>}.
 */
export function ffiTypeToNativeResultType(type : string, schema : FFISchema) : Deno.NativeResultType {
  /**
   * void
   */
  if (type === "void") {
    return "void";
  }

  return ffiTypeToNativeType(type, schema);
}

/**
 * Runtime conversion of an ASTrein callback.
 */
export function createNativeCallbackDefinition(callback : FFICallback, schema : FFISchema) : Deno.ForeignFunction {
  return {
    parameters: callback.parameters.map(
      (parameter) => ffiTypeToNativeType(parameter.type, schema),
    ),

    result: ffiTypeToNativeResultType(callback.returnType, schema),
  };
}


/**
 * Runtime conversion of an parameter.
 */
export function createNativeParameterDefinition(parameter : FFIParameter, schema : FFISchema) : Deno.ForeignFunction | Deno.NativeType {
  /**
   * Callback / function pointer.
   */
  if (parameter.callback) {
    return createNativeCallbackDefinition(
      parameter.callback,
      schema
    );
  }

  /**
   * Normal parameter.
   */
  return ffiTypeToNativeType(parameter.type, schema);
}

/**
 * Creates the symbol definition.
 *
 * @example
 * ```ts
 * const symbols = createFfiSymbols(ffi);
 *
 * const library = Deno.dlopen(
 *   "./serial.dll",
 *   symbols,
 * );
 */
export function createFfiSymbols<const Schema extends FFISchema>(schema: Schema) : FFISchemaToNativeSchema<Schema> {
  const symbols: Record<string, unknown> = {};

  for (const fn of schema.functions) {
    symbols[fn.symbol] = {
      parameters: fn.parameters.map((parameter) => createNativeParameterDefinition(parameter, schema)),

      result: ffiTypeToNativeResultType(fn.returnType, schema),
    };
  }


  return symbols as FFISchemaToNativeSchema<Schema>;
}
