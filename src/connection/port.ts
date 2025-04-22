import { Baudrate } from "./baudrates.ts";
import { DataBits } from "./data_bits.ts";
import { Parity } from "./parities.ts";
import { StopBits } from "./stop_bits.ts";


export interface Port {
    /**
     * Path/name to the port. (E.g. `/dev/ttyACM2`, `COM5`, ...)
     * 
     * @property
     */
    path : string,
    
    /**
     * The baudrate to use for the port.
     * 
     * @property
     */
    baudrate : Baudrate,

    /**
     * The parity to use for the port.
     * 
     * @property
     */
    parity? : Parity,

    /**
     * The data bits to use for the port.
     * 
     * @property
     */
    dataBits? : DataBits,

    /**
     * The stop bits to use for the port.
     * 
     * @property
     */
    stopBits? : StopBits
}
