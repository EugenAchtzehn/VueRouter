// 增加尚未廣泛支援的 Web API: Bluetooth
interface Bluetooth {
  requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
}

interface Navigator {
  bluetooth: Bluetooth;
}
