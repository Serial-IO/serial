/**
 * Options for writing.
 * 
 * @interface
 */
export interface WriteOptions {
    /**
     * Time after which the write operation should be canceled.
     * 
     * @property
     */
    timeout? : number,

    /**
     * The offset from which to write. This refers to the buffer of bytes that is passed into the function.
     * 
     * @property
     */
    offset? : number,

    /**
     * The maximum number of bytes to write.
     * 
     * @property
     */
    maxBytesToWrite? : number
}
