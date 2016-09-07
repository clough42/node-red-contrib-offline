# node-red-contrib-offline
Reports when data has not arrived in a configurable time

You can find source code and more information here:

- GitHub:  https://github.com/clough42/node-red-contrib-offline
- NpmJS:  https://www.npmjs.com/package/node-red-contrib-offline
- Node-Red:  http://flows.nodered.org/node/node-red-contrib-offline

Use this node to monitor a message stream and report if data
does not arrive in a configurable time.  This provides a good way
to tell if a device has gone off-line.

The timer starts on startup and is reset every time a message
arrives.  If the time expires with no data arriving, the most recently received
message is sent to the output.  If no message was ever received, a new message
is sent with the default topic and a payload of "false".

## Settings

- `Name` - The name to display for this node.  Leave blank to use the default.

- `Time` - The allowable gap between messages, in seconds.
If no data arrives before the timer expires, the most recent message (or
a default message) is sent to the output.


## Settings

- `Name` - The name to display for this node.  Leave blank to use the default.

- `Time` - The allowable gap between messages, in seconds.
If no data arrives before the timer expires, the most recent message (or
a default message) is sent to the output.

- `Default Topic` - The topic that will be used to generate a
message on timeout if no packet was ever received.

## Status

While it is running, the node displays its status:

- 'No data' - No messages have been received.
- 'Offline' - The timeout has expired without a message arriving.
- 'OK' - The message source is on-line and messages are being received.
