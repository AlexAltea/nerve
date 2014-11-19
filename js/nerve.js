/**
 * Global Nerve object
 */
Nerve = {
    // IP:Port of the back-end server
    server: undefined,

    /**
     * Connect to the debugger back-end.
     * Since the back-end is a RESTful API, no real permanent connection is established, the only
     * putpose of this function is validating the user's server address and updating the UI.
     */
    connect: function(server){
        $("#nerve-server-btn").html("<div class='loader'>Loading...</div>");
        
        // Get and server address
        server = server.trim();
        if (!(/^http/).test(server)) {
            server = "http://" + server;
        }

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
            
            uiTabsEnableAll();

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
    },
    
    /**
     * Disconnect from the debugger back-end.
     * Since the back-end is a RESTful API, no real disconnection happens here, just the UI
     * is updated to allow the user connect to a different server.
     */
    disconnect: function() {
        $("#nerve-server-status").hide();
        $("#nerve-server-actions").hide();
        $("#nerve-server-addr").val("");
        $("#nerve-server-form").show();
    },

    /**
     * AJAX request to the back-end server
     */
    request: function(method, uri, handler) {
        $.getJSON(this.server + uri, function(data) {
            return handler(data);
        }).error(function(){
            // TODO: Show error message and disconnect
        });
    }
};

// Entry
$(document).ready(function() {

    // Activate Bootstrap components
    $("[data-toggle=tooltip]").tooltip({container: 'body', html: true});

    // Load tab content
    $("#intro").load("nerve/intro.html");
    $("#general").load("nerve/general.html");
    $("#cpu").load("nerve/cpu.html");
    $("#gpu").load("nerve/gpu.html");
    $("#memory").load("nerve/memory.html");
    $("#system").load("nerve/system.html");
    
    // Events
    $("#nerve-server-form").submit(function() {
        Nerve.connect($("#nerve-server-addr").val());
        return false;
    });
    $('.disabled').click(function() { 
        return false;
    });
    
    // UI
    uiTabsDisableAll();
    initRegisters();

    // Debugging purposes
    /*Nerve.connect("private-fd795-nerve2.apiary-mock.com");
    uiTabsShow("#cpu");*/
});

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    uiTabsChanged($(e.target).attr('href'));
});

/**
 * Utils
 */
function valueToHex(value, bytes) {
    return ("0000000000000000" + value.toString(16).toUpperCase()).substr(-bytes*2); 
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
