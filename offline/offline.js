var https = require('https');

module.exports = function(RED) {
    function OfflineNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.time = config.time;
        node.defaultTopic = config.defaultTopic;

        node.timeout = null;
        node.lastMsg = {topic:node.defaultTopic, payload:false};

        node.status({fill:"blue",shape:"ring",text:"No data"});

        startTimer();

        function startTimer() {
            stopTimer();
            if( node.timeout == null ) {
                var delayMs = 1000 * node.time;
                node.timeout = setTimeout(reportOffline, delayMs);
            }
        }

        function stopTimer() {
            if( node.timeout != null ) {
                clearTimeout(node.timeout);
                node.timeout = null;
            }
        }

        function reportOffline() {
            node.status({fill:"red",shape:"dot",text:"Offline"});
            stopTimer();

            node.send(node.lastMsg);
        }

        this.on('input', function(msg) {
            node.lastMsg = msg;
            startTimer();
            node.status({fill:"green",shape:"dot",text:"OK"});
        });

        this.on('close', function() {
            stopTimer();
        });
    };

    RED.nodes.registerType("offline",OfflineNode, { });
};