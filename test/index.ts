const dll = Deno.dlopen(
  './libcpp_windows_bindings.dll',
  {
    getVersion: { parameters: ["pointer"], result: "void" },
    serialOpen: { parameters: ["pointer", "i32", "i32", "i32", "i32"], result: "pointer" },
    serialClose: { parameters: ["pointer"], result: "void" },
    serialWrite: { parameters: ["pointer", "pointer", "i32", "i32", "i32"], result: "i32" },
    serialReadUntil: {
      parameters: ["pointer", "pointer", "i32", "i32", "i32", "pointer"],
      result: "i32",
    },
    serialClearBufferIn: { parameters: ["pointer"], result: "void" },
    serialOnError: { parameters: ["function"], result: "void", nonblocking: true },
    serialGetPortsInfo: { parameters: ["function"], result: "i32" }
  },
);

// -----------------------------------------------------------------------------
// Helper utilities for C interop
// -----------------------------------------------------------------------------
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function cString(str : string) : Uint8Array {
    // Encodes JavaScript string as null-terminated UTF-8 byte array.
    const bytes = encoder.encode(str);
    const buf = new Uint8Array(bytes.length + 1);
    buf.set(bytes, 0);
    buf[bytes.length] = 0;
    return buf;
}

function pointer(view : Uint8Array) : Deno.PointerValue {
    return Deno.UnsafePointer.of(view);
}

const errorCallback = new Deno.UnsafeCallback(
  { parameters: ["i32", "buffer"], result: "void" },
  (code : number) => {
      console.error(`Serial-Error! Code = ${code}`);
  },
);

dll.symbols.serialOnError(errorCallback.pointer);

const verBuf = new Uint8Array(12);                // 3 x 4 Byte
const verPtr = Deno.UnsafePointer.of(verBuf);
dll.symbols.getVersion(verPtr);
const version = new Uint32Array(verBuf.buffer);

console.log(`Version ${version[0]}.${version[1]}.${version[2]}`);


// -----------------------------------------------------------------------------
// 1. List available ports
// -----------------------------------------------------------------------------
interface PortInfo {
    port : string | undefined;
    path : string | undefined;
    manufacturer : string | undefined;
    serial : string | undefined;
    pnpId : string | undefined;
    location : string | undefined;
    productId : string | undefined;
    vendorId : string | undefined;
}

function cstr(ptr : Deno.PointerValue) : string | undefined {
  if (ptr === null) {
    return undefined;
  }
  return Deno.UnsafePointerView.getCString(ptr);
}

const portInfos : PortInfo[] = [];

const collectCb = new Deno.UnsafeCallback({
    parameters: [
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
    ],
    result: "void",
}, (
    portPtr,
    pathPtr,
    manufacturerPtr,
    serialPtr,
    pnpPtr,
    locationPtr,
    productPtr,
    vendorPtr,
) => {
    portInfos.push({
        port: cstr(portPtr),
        path: cstr(pathPtr),
        manufacturer: cstr(manufacturerPtr),
        serial: cstr(serialPtr),
        pnpId: cstr(pnpPtr),
        location: cstr(locationPtr),
        productId: cstr(productPtr),
        vendorId: cstr(vendorPtr),
    });
});

dll.symbols.serialGetPortsInfo(collectCb.pointer);

console.log("Available ports:");
for (const info of portInfos) {
  console.log(JSON.stringify(info, null, 2));
}

if (portInfos.length === 0) {
    console.error("No serial ports found. Exiting.");
    collectCb.close();
    dll.close();
    Deno.exit(1);
}

// Convert to simple list of paths for later selection
const ports = portInfos.map((i) => i.port);

// const ports = cPortsStr ? cPortsStr.split(";") : [];
if (ports.length === 0) {
    console.error("No serial ports found (ttyUSB). Exiting.");
    dll.close();
    Deno.exit(1);
}

// -----------------------------------------------------------------------------
// 2. Echo test on selected port
// -----------------------------------------------------------------------------
const portPath = portInfos[1].port as string
console.log(`\nUsing port: ${portPath}`);

const portBuf = cString(portPath);
const handle = dll.symbols.serialOpen(pointer(portBuf), 115200, 8, 0, 0);
if (handle === null) {
  console.error("Failed to open port!");
  dll.close();
  Deno.exit(1);
}

// Give MCU a moment to reboot (similar to C++ tests)

await new Promise((r) => setTimeout(r, 100));
dll.symbols.serialClearBufferIn(handle);

const msg = "HELLO";
const msgBuf = encoder.encode(msg);
const written = dll.symbols.serialWrite(handle, pointer(msgBuf), msgBuf.length, 100, 1);
if (written !== msgBuf.length) {
  console.error(`Write failed (wrote ${written}/${msgBuf.length})`);
  dll.symbols.serialClose(handle);
  dll.close();
  Deno.exit(1);
}

const readBuf = new Uint8Array(64);
const untilBuf = new Uint8Array(["\n".charCodeAt(0)]);

const read = dll.symbols.serialReadUntil(handle, pointer(readBuf), readBuf.length, 500, 1, pointer(untilBuf));
if (read <= 0) {
    console.error("Read failed or timed out.");
    dll.symbols.serialClose(handle);
    dll.close();
    Deno.exit(1);
}

const echo = decoder.decode(readBuf.subarray(0, read));
console.log(`Echo response (${read} bytes): '${echo}'`);

if (echo === msg) {
    console.log("Echo test: success");
} else {
    console.error("Echo test: mismatch");
}

dll.symbols.serialOnError(null);
errorCallback.close();
dll.symbols.serialClose(handle);
dll.close(); 
