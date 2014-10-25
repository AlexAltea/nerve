/**
 * Adjust Modal parameters and display it
 */
function showModal(args) {
    $(".modal-title").html(args.title);
    $(".modal-body").html(args.body);
    $(".modal-footer").html(args.footer);
    $(".modal-close").focus();
    $(".modal").modal('show');
}

/**
 * CPU: Registers
 */
function initRegisters() {
    $("#nerve-cpu-registers").css("height", "calc(100% - 60px)");
}
