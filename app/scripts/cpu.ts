/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

interface IThread {
    id: number;
    type: string;
    name: string;
    state: string;
}

interface INerveCpuController extends ng.IScope {
    // Threading
    threadList: IThread[];
    threadCurrent: IThread;

    // Disassembler
    disasmAddress: number;
    disasmAddressHex: string;

    // Memory
    memAddress: number;
    memAddressHex: string;
    memWidth: number;
    memHeight: number;
    memLines: any;

    // Stack
    stackAddress: number;
    stackAddressHex: string;

    updateThreads();
    setCurrentThread(IThread);
}

class NerveCpuController {
    public static $inject = ['$scope', '$server'];
    
    constructor($scope: INerveCpuController, $server: IServerProvider) {
        $scope.threadCurrent = undefined;

        // Update the list of threads
        $scope.updateThreads = () => {
            $server.get('/cpu/threads', (resp) => {
                console.log("Update Threads: Success");
                $scope.threadList = resp;
            }, (err) => {
                    console.log("Update Threads: Error");
                    $scope.threadList = undefined;
                });
        };

        // Set current thread
        $scope.setCurrentThread = (thread: IThread) => {
            $scope.threadCurrent = thread;
        };

        // Disassembler
        $scope.disasmAddress = 0x10200;
        $scope.$watch('disasmAddress', () => {
            $scope.disasmAddressHex = convertNumberToHex($scope.disasmAddress);
        });
        $scope.$watch('disasmAddressHex', () => {
            if ($scope.disasmAddressHex.length == 8) {
                $scope.disasmAddress = convertHexToNumber($scope.disasmAddressHex);
            }
        });

        // Memory
        $scope.memWidth = 16;
        $scope.memHeight = 12;
        $scope.memAddress = 0x10000;
        $scope.$watch('memAddress', () => {
            $scope.memAddressHex = convertNumberToHex($scope.memAddress);
            $scope.memLines = [];

            // Update content of memory panel
            var start = $scope.memAddress;
            var end = $scope.memAddress + $scope.memWidth * $scope.memWidth;
            var step = $scope.memWidth;
            for (var line = start; line < end; line += step) {
                $scope.memLines.push({
                    addr: convertNumberToHex(line),
                    bytesHex: Array.apply(null, new Array($scope.memWidth)).map(String.prototype.valueOf, 'FF'),
                    bytesStr: Array.apply(null, new Array($scope.memWidth)).map(String.prototype.valueOf, '.'),
                });
            }
        });
        $scope.$watch('memAddressHex', () => {
            if ($scope.memAddressHex.length == 8) {
                $scope.memAddress = convertHexToNumber($scope.memAddressHex);
            }
        });

        // Stack
        $scope.stackAddress = 0xD0001000;
        $scope.$watch('stackAddress', () => {
            $scope.stackAddressHex = convertNumberToHex($scope.stackAddress);
        });
        $scope.$watch('stackAddressHex', () => {
            if ($scope.stackAddressHex.length == 8) {
                $scope.stackAddress = convertHexToNumber($scope.stackAddressHex);
            }
        });
    }
}

class NerveCpuDirective implements ng.IDirective {
    restrict = 'E';
    templateUrl = 'views/cpu.html';
    controller = NerveCpuController;
}
