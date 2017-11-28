DROP TABLE IF EXISTS sensors;
DROP TABLE IF EXISTS sensordata;
DROP TABLE IF EXISTS sensortypes;

CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sensortype_id INTEGER NOT NULL
);

CREATE TABLE sensortypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE sensordata (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER NOT NULL,
    value FLOAT NOT NULL,
    timestamp TIMESTAMP
);