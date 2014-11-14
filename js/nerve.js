/**
 * Global Nerve object
 */
Nerve = {};

/**
 * Connect to the debugger back-end.
 * Since the back-end is a RESTful API, no real permanent connection is established, the only
 * putpose of this function is validating the user's server address and updating the UI.
 */
function connect(server) {
    
    // Get and server address
    server = server.trim();
    if (!(/^http/).test(server)) {
        server = "http://" + server;
    }
    
    $("#nerve-server-btn").html("<div class='loader'>Loading...</div>");
    
    // Connect to server
    $.getJSON(server + "/connect", function(data) {
        // Make tooltip
        var serverTooltip = "<table style='text-align: left'>";
        serverTooltip += "<tr><td style='width: 50px;'></td><td></td></tr>";
        serverTooltip += "<tr><td>Device:</td><td>" + data.device.name + " (" + data.device.version + ")</td></tr>";
        if (data.host) {
            serverTooltip += "<tr><td>Host:</td><td>" + data.host.os + " (" + data.host.cpu + ")</td></tr>";
        }
        serverTooltip += "</table>"
        
        // Replace form with server information
        var ipPort = server.replace("http://", "").replace("/", "");
        $("#nerve-server-btn").html("Connect...");
        $("#nerve-server-form").hide();
        $("#nerve-server-status").html("Connected to: <i>" + ipPort + "</i>");
        $("#nerve-server-status").attr('data-original-title', serverTooltip);
        $("#nerve-server-status").tooltip({container: 'body'});
        $("#nerve-server-status").show();
        $("#nerve-server-actions").show();
        
        // Save information
        Nerve.server = server;
        
    }).error(function(){
        $("#nerve-server-btn").html("Connect...");
        showModal({
            title: "Connection error",
            body: "<p>Could not connect to the specified Nerve back-end server. " +
            "Make sure the debugger is running, and the address is correct " + 
            "and entered in the format <b>IP:Port</b>.</p>" +
            "<p>For example: <i>127.0.0.1:8080</i></p>",
            footer: "<button type='button' class='btn btn-primary' data-dismiss='modal'>Close</button>"
        });
    });
}

/**
 * Disconnect from the debugger back-end.
 * Since the back-end is a RESTful API, no real disconnection happens here, just the UI
 * is updated to allow the user connect to a different server.
 */
function disconnect() {
    $("#nerve-server-status").hide();
    $("#nerve-server-actions").hide();
    $("#nerve-server-addr").val("");
    $("#nerve-server-form").show();
}

// Entry
$(document).ready(function() {
    
    // Activate Bootstrap components
    $("[data-toggle=tooltip]").tooltip({container: 'body', html: true});
    
    // Events
    $("#nerve-server-form").submit(function() {
        connect($("#nerve-server-addr").val());
        return false;
    });
    $('.disabled').click(function() { 
        return false;
    });
    
    // UI
    initRegisters();
    
    // Debugging purposes
    //connect("127.0.0.1");
});

/**
 * Nerve
 */
function valueToHex(value, bytes) {
    return ("0000000000000000" + value.toString(16).toUpperCase()).substr(-bytes*2); 
}

var app = angular.module("Nerve", []);

app.controller("cpuController", function($scope) {
    // Disassembler
    $scope.disassembler = {
        addr : 0x00000000,
        
        lines : function () {
            var lines = [];
            for (var i=0; i<16; i++) {
                lines.push({
                    breakpoint : "",
                    addr : valueToHex($scope.disassembler.addr + 4*i, 4),
                    value : "????????",
                    instruction : "????????",
                    comment : ""
                });
            }
            return lines;
        }
    };

    
    
    
    // Registers
    $scope.registers = [];
    for (var i=0; i<32; i++) $scope.registers.push({ "name" : "r" +i, "value" : "????????????????" });
    for (var i=0; i<32; i++) $scope.registers.push({ "name" : "fr"+i, "value" : "????????????????" });
    for (var i=0; i<32; i++) $scope.registers.push({ "name" : "v" +i, "value" : "???????? ???????? ???????? ????????" });
});
