/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

interface INerveCpuControllerScope extends ng.IScope {
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
    memCache: IMemoryPage[];
    memLines: any;

    // Registers
    regMode: string;

    // Stack
    stackAddress: number;
    stackAddressHex: string;
    stackCache: IMemoryPage[];

    updateThreads();
    updateMemory();
    setCurrentThread(IThread);
}

/**
 * CPU controller
 */
class NerveCpuController {
    public static $inject = ['$scope', '$server', 'ThreadResource', 'MemoryPageResource'];

    // Resources
    public Thread: IThreadResource;
    public MemoryPage: IMemoryPageResource;

    constructor($scope: INerveCpuControllerScope, $server: IServerProvider, Thread: IThreadResource, MemoryPage: IMemoryPageResource) {
        this.Thread = Thread;
        this.MemoryPage = MemoryPage;

        $scope.threadCurrent = undefined;

        // Update the list of threads
        $scope.updateThreads = () => {
            $scope.threadList = Thread.query();
        }

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
        $scope.memCache = [];
        $scope.memLines = [];

        $scope.$watch('memAddress', () => {
            $scope.memAddressHex = convertNumberToHex($scope.memAddress);
            this.updateMemoryCache($scope.memAddress, $scope.memCache);
            $scope.updateMemory();
        });
        $scope.$watch('memWidth', () => {
            $scope.updateMemory();
        });
        $scope.$watch('memHeight', () => {
            $scope.updateMemory();
        });
        $scope.$watch('memCache', () => {
            $scope.updateMemory();
        }, true);
        $scope.$watch('memAddressHex', () => {
            if ($scope.memAddressHex.length == 8) {
                $scope.memAddress = convertHexToNumber($scope.memAddressHex);
            }
        });

        // Update content of memory panel
        $scope.updateMemory = () => {
            var start = $scope.memAddress;
            var end = $scope.memAddress + $scope.memWidth * $scope.memHeight;
            var step = $scope.memWidth;

            $scope.memLines = [];
            for (var line = start; line < end; line += step) {
                for (var i = 0; i < $scope.memCache.length; i++) {
                    if (!$scope.memCache[i]) {
                        return;
                    }
                    if ($scope.memCache[i].address <= line && line < $scope.memCache[i].address + $scope.memCache[i].size) {
                        var bytes = $scope.memCache[i].data.substring(
                            (line - $scope.memCache[i].address)  * 2,
                            (line - $scope.memCache[i].address + $scope.memWidth) * 2
                        );
                        $scope.memLines.push({
                            addr: line,
                            bytesHex: bytes.match(/.{2}/g),
                            bytesStr: convertHexToString(bytes).split('')
                        });
                        break;
                    }
                }
            }
        };

        // Registers
        $scope.regMode = 'Integer';

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

    /**
     * Controller methods
     */
    updateMemoryCache(currentAddress: number, cache: IMemoryPage[]) {
        var requiredPages = [
            (currentAddress & ~(4096 - 1)) - 4096,
            (currentAddress & ~(4096 - 1)),
            (currentAddress & ~(4096 - 1)) + 4096
        ];

        // Remove old cache
        for (var i = 0; i < cache.length; i++) {
            var requiredIndex = requiredPages.indexOf(cache[i].address);
            if (requiredIndex < 0) {
                cache.splice(i, 1);
            } else {
                requiredPages.splice(requiredIndex, 1);
            }
        }

        // Cache new pages
        for (var i = 0; i < requiredPages.length; i++) {
            console.log("Memory: Requested page: " + requiredPages[i]);
            cache.push(this.MemoryPage.get({ address: requiredPages[i] }));
        }
    }
}
