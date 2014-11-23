/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

// Converts a number into a "%08X" string
function convertNumberToHex(n: number) {
    var s = '00000000' + n.toString(16).toUpperCase();
    return s.slice(-8)
}

// Converts a "%08X" string into a number
function convertHexToNumber(s: string) {
    return parseInt(s, 16);
}
