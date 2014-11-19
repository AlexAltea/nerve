/**
 * CPU Tab
 */
Nerve.cpu = {
    threads: {
        // List of threads
        list: undefined,
        setList: function(list) {
            Nerve.cpu.threads.list = list;
            uiCpuThreadsList(list);
        },

        // ID of the current thread
        current: undefined,
        setCurrent: function(thread) {
            Nerve.cpu.threads.current = thread.id;
            uiCpuThreadsCurrent(thread);
        },

        update: function(){
            Nerve.request("GET", "/cpu/threads", this.setList);
        }

    },
    disassembler: {
        addr: 0x10000
    }
};


/**
 * CPU UI
 */
// Update the thread dropdown list
function uiCpuThreadsList(list) {
    $("#nerve-cpu-threads-list").html("");
    for (var i=0; i<list.length; i++) {
        var threadItem = "<li class='nerve-cpu-threads-item'>"
        threadItem += "<a href='#'>ID #" + list[i].id;
        threadItem += list[i].name ? " (<i>" + list[i].name + "</i>) " : " ";
        threadItem += "<span class='label ";
        threadItem += list[i].type == "PPU" ? "label-default" : "label-primary";
        threadItem += "' style='padding: 2px 4px; font-size: 9px'>" + list[i].type + "</span></a></li>";
        $("#nerve-cpu-threads-list").append(threadItem);
    }
    
    // Event: Thread dropdown list item was clicked -> Update the current thread
    $(".nerve-cpu-threads-item").click(function(e) {
        var clickedThread = Nerve.cpu.threads.list[$(e.currentTarget).index()];
        Nerve.cpu.threads.setCurrent(clickedThread);
    });
}

// Update the dropdown button text to reference the current thread
function uiCpuThreadsCurrent(thread) {
    var currentThread = "ID #" + thread.id;
    currentThread += thread.name ? " (<i>" + thread.name + "</i>) " : " ";
    currentThread += "<span class='label ";
    currentThread += thread.type == "PPU" ? "label-default" : "label-primary";
    currentThread += "' style='padding: 2px 4px; font-size: 9px'>" + thread.type + "</span> ";
    currentThread += "&nbsp; <span class='caret'></span>";
    $("#nerve-cpu-threads-selector > button").html(currentThread);
}


/**
 * CPU Events
 */

// Thread dropdown list was opened -> Update list of threads
$("#nerve-cpu-threads-selector").on('shown.bs.dropdown', function(e) {
    if ($(e.target).attr("id") == "nerve-cpu-threads-selector") {
        Nerve.cpu.threads.update();
    }
});
