/**
 * Options for reading.
 * 
 * @interface
 */
export interface ReadOptions {
    /**
     * Time after which the read operation should be canceled.
     * 
     * @property
     */
    timeout? : number,

    /**
     * The offset from which to read. This refers to the buffer of bytes that is passed into the function.
     * 
     * @property
     */
    offset? : number,
    
    /**
     * The maximum number of bytes to read.
     * 
     * @property
     */
    maxBytesToRead? : number
}
