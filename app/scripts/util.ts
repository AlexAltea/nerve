/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

var printableCharacters = [];
for (var i = 0x00; i < 0x020; i++) printableCharacters.push('.');
for (var i = 0x20; i < 0x07F; i++) printableCharacters.push(String.fromCharCode(i));
for (var i = 0x7F; i < 0x100; i++) printableCharacters.push('.');

// Converts a number into a "%08X" string
function convertNumberToHex(n: number) {
    var str = '00000000' + n.toString(16).toUpperCase();
    return str.slice(-8)
}

// Converts a "%08X" string into a number
function convertHexToNumber(s: string) {
    return parseInt(s, 16);
}

// Converts a hexadecimal string "%02X%02X%02X" intro a string "aaa"
function convertHexToString(hexStr: string) {
    var str = '';
    for (var i = 0; i < hexStr.length; i += 2) {
        str += printableCharacters[parseInt(hexStr.substr(i, 2), 16)];
    }
    return str;
}
