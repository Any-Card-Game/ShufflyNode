function Gateway(gatewayServer) {
    var self = this;
    self.gatewaySocket = io.connect(gatewayServer);

    self.gatewaySocket.on("Client.Message", function (data) {
         self.channels[data.channel](data.content);
    });

    self.channels = {};
    self.on = function (channel, callback) {
        self.channels[channel] = callback;
    };
    self.emit = function (channel, content) {
        self.gatewaySocket.emit("Gateway.Message", { channel: channel, content: content });
    };
    self.login = function(uname) {
        self.gatewaySocket.emit('Gateway.Login', { userName: uname });
    };
    return self;
 }