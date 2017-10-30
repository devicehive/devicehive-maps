const gateways = [
  {
    deviceId: 'lora-gateway-0',
    coordinates: {
      lng: 51.06,
      lat: 32.14,
    },
  },
  {
    deviceId: 'lora-gateway-1',
    coordinates: {
      lng: 51,
      lat: 32.1,
    },
  },
  {
    deviceId: 'lora-gateway-2',
    coordinates: {
      lng: 51,
      lat: 32.18,
    },
  },
]

const macs = [
  {
    mac: '123124',
    rssi: 15
  },
  {
    mac: '333333',
    rssi: 15,
  }
]

module.exports = { gateways, macs };
