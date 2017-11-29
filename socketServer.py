import socketserver
from src.db import DB


class WeatherTCPHandler(socketserver.BaseRequestHandler):
    """
    The request handler class for our server.

    It is instantiated once per connection to the server, and must
    override the handle() method to implement communication to the
    client.
    """

    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = str(self.request.recv(1024), "utf-8").strip()
        print("{} wrote:".format(self.client_address[0]))
        print(self.data)
        # just send back the same data, but upper-cased

        dbcur = DB()
        dbcur.connect()

        status = b'error'

        mode, values = str(self.data).split('|')

        print(mode)
        print(values)

        if mode == 'input':
            print('Mode:' + mode)
            sensor_id, value = values.split(';')
            print('Values:' + sensor_id + ' ' + value)
            status = dbcur.set_sensordata_by_sensor(sensor_id, value)

        self.request.sendall(status.encode())


if __name__ == "__main__":
    HOST, PORT = "localhost", 9999

    # Create the server, binding to localhost on port 9999
    with socketserver.TCPServer((HOST, PORT), WeatherTCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()
