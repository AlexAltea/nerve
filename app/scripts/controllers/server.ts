/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

'use-strict';

// System that provides the LV2 environment
interface IServerDevice {
    name: string;     // E.g. 'PlayStation 3', 'Nucleus', 'RPCS3'
    type: string;     // E.g. 'console', 'emulator'
    version: string;  // E.g. '4.65 CEX', '1.0.0', '0.0.0.5'
}

// System that hosts the device providing the LV2 environment (emulators only)
interface IServerHost {
    os: string;       // E.g. 'Windows 7 SP1'
    cpu: string;      // E.g. 'Intel Core i7-4770HQ (x86-64)'
}

// Information about the remote debugging server
interface IServerInformation {
    version: string;  // E.g. Version of Nerve designed for
    device: IServerDevice;
    host: IServerHost;
}


interface IServerControllerScope extends ng.IScope {
    // Represent server status
    connected: boolean;
    connecting: boolean;
    serverAddress: string;
    serverInfo: IServerInformation;

    // Manage $server address
    connect(string);
    disconnect();
}


class ServerController {
    private scope: IServerControllerScope;

    constructor($scope: IServerControllerScope, $server: IServerProvider) {
        this.scope = $scope;

        $scope.connected = false;
        $scope.connecting = false;
        $scope.serverAddress = undefined;

        /**
         * Connect to the debugger back-end.
         * Since the back-end is a RESTful API, no real permanent connection is established, the only
         * putpose of this function is validating the user's server address and updating the UI.
         */
        $scope.connect = (address: string) => {
            // Normalize server address
            address.trim();
            if (!(/^http/).test(address)) {
                address = "http://" + address;
            }

            // Try to connect to the specified server
            $scope.connecting = true;
            $server.setAddress(address);
            $server.get('/connect', (resp) => {
                console.log("Connect: Success");
                $scope.connected = true;
                $scope.connecting = false;
                $scope.serverAddress = address.replace("http://", "");
                $scope.serverInfo = resp;
            },(err) => {
                console.log("Connect: Error");
                $scope.connected = false;
                $scope.connecting = false;
                showModal({
                    title: "Connection error",
                    body: "<p>Could not connect to the specified Nerve back-end server. Make sure the debugger is running, and the address is correct and entered in the format <b>IP:Port</b>.</p><p>For example: <i>127.0.0.1:8080</i></p>",
                    footer: "<button type='button' class='btn btn-primary' data-dismiss='modal'>Close</button>"
                });
            });
        };

        /**
         * Disconnect from the debugger back-end.
         * Since the back-end is a RESTful API, no real disconnection happens here, just the UI
         * is updated to allow the user connect to a different server.
         */
        $scope.disconnect = () => {
            console.log("Disconnected");
            $scope.connected = false;
            $scope.connecting = false;
        }

        //$scope.connect('private-26787-nerve.apiary-mock.com');
    }
}
