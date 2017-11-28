INSERT INTO sensors (name, sensortype_id) VALUES ('Keller', 1);
INSERT INTO sensors (name, sensortype_id) VALUES ('Veranda', 1);
INSERT INTO sensors (name, sensortype_id) VALUES ('Schuppen', 1);

INSERT INTO sensortypes (id, name) VALUES (1, 'Temperature');

INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 20.4, to_timestamp(1511897475));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 19.2, to_timestamp(1511897475 + 10));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 18.4, to_timestamp(1511897475 + 20));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 17.3, to_timestamp(1511897475 + 30));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 16.4, to_timestamp(1511897475 + 40));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 15.4, to_timestamp(1511897475 + 50));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 14.4, to_timestamp(1511897475 + 60));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 11.4, to_timestamp(1511897475 + 70));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 10.4, to_timestamp(1511897475 + 80));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 9.4, to_timestamp(1511897475 + 90));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 12.4, to_timestamp(1511897475 + 100));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 13.4, to_timestamp(1511897475 + 110));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 14.4, to_timestamp(1511897475 + 120));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 15.4, to_timestamp(1511897475 + 130));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 16.4, to_timestamp(1511897475 + 140));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 17.4, to_timestamp(1511897475 + 150));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 17.4, to_timestamp(1511897475 + 160));
INSERT INTO sensordata (sensor_id, value, timestamp) VALUES (1, 20.4, to_timestamp(1511897475 + 170));
