DROP TABLE IF EXISTS sensordata;
DROP TABLE IF EXISTS sensors;
DROP TABLE IF EXISTS sensortypes;

CREATE TABLE sensortypes (
    id SERIAL PRIMARY KEY,
    sensortype_name VARCHAR(255) NOT NULL
);

CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    sensor_name VARCHAR(255) NOT NULL,
    sensortype_id INTEGER NOT NULL,
    FOREIGN KEY (sensortype_id) REFERENCES sensortypes (id)
);

CREATE TABLE sensordata (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER NOT NULL,
    value FLOAT NOT NULL,
    timestamp TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensors (id)
);