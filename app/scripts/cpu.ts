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
    memoryAddress: number;
    memoryAddressHex: string;
    memoryWidth: number;
    memoryHeight: number;

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
        $scope.memoryWidth = 16;
        $scope.memoryAddress = 0x10000;
        $scope.$watch('memoryAddress', () => {
            $scope.memoryAddressHex = convertNumberToHex($scope.memoryAddress);
        });
        $scope.$watch('memoryAddressHex', () => {
            if ($scope.memoryAddressHex.length == 8) {
                $scope.memoryAddress = convertHexToNumber($scope.memoryAddressHex);
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
