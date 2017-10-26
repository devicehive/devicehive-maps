const app = require('express')();
const server = require('http').Server(app);
const DeviceHive = require('devicehive');
const path = require('path');

const config = require('./config');
const data = require('./data');

let devices;
let timeouts = {};

const getConnection = () => {
  return new DeviceHive({ serverURL: config.api_url, accessToken: config.accessToken, refreshToken: config.refreshToken });
}

const fillDevices = async (connection) => {
  for (let i = 0; i < 3; i++) {
    connection.putDevice(`lora-gateway-${i}`, { data: data.gateways[i] });
  }
}


const sendNotificationToDevice = (device) => {
  data.macs
  .map((item) =>
    device.sendNotification('mac signal', { parameters: { rssi: -65 - (Math.random() * item.rssi), mac: item.mac }})
  );
}

const init = async () => {
  const connection = await getConnection();
  await fillDevices(connection);

  devices = await connection.listDevices();
  const ids = devices.map(device => {
    setInterval(() => {
      sendNotificationToDevice(device);
    }, 5000);
    return device.id;
  });

}

init();

app.use('/', require('express').static(path.join(__dirname, '/public')));

server.listen(process.env.PORT || config.PORT);
