const PADS = {
    //Variables
    pad: Pads.get(0),

    // Functions
    init: function () {
        this.pad = Pads.get(0);
        UTILS.log("Pads initialized!");
    },
    update: function () {
        this.pad.update();
        this.padsHandler();
    },
    padsHandler: function () {
        if (this.pad.justPressed(Pads.CROSS)) {
            if (!STATE.isDownloadModalFocused) STATE.isDownloadModalFocused = true;

            if (!STATE.isDownloading) {
                let item = UTILS.findItem(STATE.itemOnFocus);
                if (item) NETWORK.download(item.url, SAVE_PATH + item.name);
            }
        }
        if (this.pad.justPressed(Pads.CIRCLE)) {
            if (!STATE.isDownloading && !STATE.isExtracting) STATE.isDownloadModalFocused = false;
        }
        if (this.pad.justPressed(Pads.SQUARE)) {

        }
        if (this.pad.justPressed(Pads.UP)) {
            if (STATE.itemOnFocus > DEFAULT_FIRST_ID && !STATE.isDownloadModalFocused) STATE.itemOnFocus--;
        }
        if (this.pad.justPressed(Pads.DOWN)) {
            if (STATE.itemOnFocus < STATE.list.length && !STATE.isDownloadModalFocused) STATE.itemOnFocus++;
        }
        if (this.pad.pressed(Pads.R1)) {
            if (STATE.itemOnFocus < STATE.list.length && !STATE.isDownloadModalFocused) STATE.itemOnFocus++;
        }
        if (this.pad.pressed(Pads.L1)) {
            if (STATE.itemOnFocus > DEFAULT_FIRST_ID && !STATE.isDownloadModalFocused) STATE.itemOnFocus--;
        }
    }
}