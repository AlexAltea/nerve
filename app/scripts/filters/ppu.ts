/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

// Disassemble a PPU instruction given its 32-bit opcode and current address (for branch offset calculation)
function PPUFilter() {
    return (value: any, address: number = 0) => {
        return "AAA" + value + "aaa" + address + "bbb";
    };
}
