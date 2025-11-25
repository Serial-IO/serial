import { cStringFrom } from './c_string_from.ts'

const getDevices : Deno.ForeignFunction = {
  parameters: [
    'pointer',
    'pointer'
  ],
  result: 'i32',
  nonblocking: true
}



const devices : any[] = [];
const deviceCallback = new Deno.UnsafeCallback(
  {
    parameters: [
      "buffer", "buffer", "buffer", "buffer",
      "buffer", "buffer", "buffer", "buffer",
    ],
    result: "void",
  },
  (
    port,
    path,
    manufacturer,
    serial_number,
    pnp_id,
    location_id,
    product_id,
    vendor_id,
  ) => {
    devices.push({
      port: cStringFrom(port),
      path: cStringFrom(path),
      manufacturer: cStringFrom(manufacturer),
      serial_number: cStringFrom(serial_number),
      pnp_id: cStringFrom(pnp_id),
      location_id: cStringFrom(location_id),
      product_id: cStringFrom(product_id),
      vendor_id: cStringFrom(vendor_id),
    });
  }
);

const errorCallback = new Deno.UnsafeCallback(
  { parameters: ["buffer"], result: "void" },
  (errPtr) => console.error("Error:", cStringFrom(errPtr)),
);

const {symbols} = Deno.dlopen('lib.dll', {
  getDevices
})

await symbols.getDevices(
  deviceCallback.pointer,
  errorCallback.pointer
)

console.log(devices);
