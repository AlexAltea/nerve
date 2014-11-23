/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

// Display Bootstrap Modal: Adjusts the Modal parameters and shows it
function showModal(args) {
    $(".modal-title").html(args.title);
    $(".modal-body").html(args.body);
    $(".modal-footer").html(args.footer);
    $(".modal-close").focus();
    $(".modal").modal('show');
}
