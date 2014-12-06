/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

// Converts a number into a '%0#X' string, where # is the requested length
function HexadecimalFilter() {
    return (value: any, length: number = 8) => {
        var str = '0000000000000000' + value.toString(16).toUpperCase();
        return str.slice(-length);
    };
}
