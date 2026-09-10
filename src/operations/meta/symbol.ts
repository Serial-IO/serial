/**
 * Copy metadata for the loaded library.
 * 
 * [`cpp_core/interface/meta.h`](https://github.com/Serial-IO/cpp-core/blob/main/include/cpp_core/interface/meta.h)
 */
export const symbol : Deno.ForeignFunction = {
  name: 'meta',
  parameters: [
    /** Structure receiving the metadata. Passing `nullptr` is a no-op. */
    {struct: [
      /** Semantic-version major component. */
      'i32',
      /** Semantic-version minor component. */
      'i32',
      /** Semantic-version patch component. */
      'i32',
      /** Commits since the closest Git tag. */
      'i32',
      /** 1 for uncommitted changes, otherwise 0. */
      'bool',
      /** Complete generated version string. */
      'buffer',
      /** Prerelease identifier, or an empty string. */
      'buffer',
      /** Prerelease kind such as `alpha` or `rc`. */
      'buffer',
      /** Prerelease number, or an empty string. */
      'buffer',
      /** Closest Git tag. */
      'buffer',
      /** Hash component reported by Git describe. */
      'buffer',
      /** Abbreviated commit hash. */
      'buffer',
      /** Full commit hash. */
      'buffer',
      /** Commit timestamp including timezone. */
      'buffer',
      /** Branch name used for the build. */
      'buffer',
      /** `-dirty` or an empty string. */
      'buffer',
    ]}
  ],
  result: 'void'
}
