/**
 * Options for reading.
 */
export interface Options {
    /**
     * Time after which the read operation should be canceled.
     */
    timeout? : number,

    /**
     * The offset from which to read. This refers to the buffer of bytes that is passed into the function.
     */
    offset? : number,
    
    /**
     * The maximum number of bytes to read.
     */
    maxBytesToRead? : number

    /**
     * Abort signal for reading.
     */
    signal? : AbortSignal
}
