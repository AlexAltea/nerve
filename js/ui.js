/**
 * Tabs management
 */

// Disable all tabs
function uiTabsDisableAll() {
    $(".navbar-nav > li > a").not("#tab-intro").addClass("disabled");
    $(".navbar-nav > li > a").not("#tab-intro").removeAttr("data-toggle");
}

// Enable all tabs
function uiTabsEnableAll() {
    $(".navbar-nav > li > a").not("#tab-intro").removeClass('disabled');
    $(".navbar-nav > li > a").not("#tab-intro").attr("data-toggle", "tab")
}

// Resize containers based on the current tab
function uiTabsChanged(currentTab) {
    if (currentTab == "#intro") {
        originalWidth = $(".container").data('originalWidth');
        $(".container").animate({width: originalWidth});
        $(".container").data('originalWidth', undefined);
    }
    else {
        if (!$(".container").data('originalWidth')) {
            originalWidth = $(".container").css('width');
            $(".container").data('originalWidth', originalWidth);
        }
        $(".container").animate({width: "100%"});
    }
}

// Change to a different tab
function uiTabsShow(targetTab) {
    $(".tab-pane").removeClass("active");
    $(targetTab).addClass("active");
    uiTabsChanged(targetTab);
}

/**
 * Display Bootstrap Modal:
 * It adjusts the Modal parameters and displays it
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
