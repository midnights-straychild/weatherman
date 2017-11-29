INSERT INTO sensortypes (sensortype_id, sensortype_name) VALUES (1, 'Temperature');

INSERT INTO sensors (sensor_id, sensor_name, sensortype_id) VALUES (1, 'Keller', 1);
INSERT INTO sensors (sensor_id, sensor_name, sensortype_id) VALUES (2, 'Veranda', 1);
INSERT INTO sensors (sensor_id, sensor_name, sensortype_id) VALUES (3, 'Schuppen', 1);

INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 20.4, to_timestamp(1511897475));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 19.2, to_timestamp(1511897475 + 1000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 18.4, to_timestamp(1511897475 + 2000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 17.3, to_timestamp(1511897475 + 3000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 16.4, to_timestamp(1511897475 + 4000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 15.4, to_timestamp(1511897475 + 5000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 14.4, to_timestamp(1511897475 + 6000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 11.4, to_timestamp(1511897475 + 7000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 10.4, to_timestamp(1511897475 + 8000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 9.4, to_timestamp(1511897475 + 9000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 12.4, to_timestamp(1511897475 + 10000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 13.4, to_timestamp(1511897475 + 11000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 14.4, to_timestamp(1511897475 + 12000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 15.4, to_timestamp(1511897475 + 13000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 16.4, to_timestamp(1511897475 + 14000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 17.4, to_timestamp(1511897475 + 15000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 17.4, to_timestamp(1511897475 + 16000));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 20.4, to_timestamp(1511897475 + 17000));
