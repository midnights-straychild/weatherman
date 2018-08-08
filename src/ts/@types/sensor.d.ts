export interface Sensor {
    id: number;
    sensor_name: string;
    sensortype_id: number;
}

export interface SensorType {
    id: number;
    sensortype_name: number;
}

export interface SensorData {
    sensor_id: string;
    value: number;
    timestamp: Date
}