////////////////////////////// INIT //////////////////////////////

std.loadScript("./src/scripts/config.js"); 		// General app config
std.loadScript("./src/scripts/database.js");    // Database management
std.loadScript("./src/scripts/state.js"); 		// Global state management
std.loadScript("./src/scripts/network.js"); 	// Network management
std.loadScript("./src/scripts/archive.js"); 	// Archive management
std.loadScript("./src/scripts/pads.js"); 		// Pads definition
std.loadScript("./src/scripts/utils.js"); 		// General utilities
std.loadScript("./src/scripts/ui.js"); 		    // UI components and interactions



function init() {
    IOP.reset();
    // Set background color
    Screen.clearColor(COLORS.background);

    IOP.loadDefaultModule(IOP.hdd);
    IOP.loadDefaultModule(IOP.cdfs);
    IOP.loadDefaultModule(IOP.memcard);
    IOP.loadDefaultModule(IOP.usb_mass);
    IOP.loadDefaultModule(IOP.pads);
    IOP.loadDefaultModule(IOP.network);

    STATE.init();
    NETWORK.init();
    ARCHIVE.init();
    PADS.init();
    UTILS.init();
    UI.init();

}

function run() {

    PADS.update();
    UI.update();
}

init();

Screen.display(run);