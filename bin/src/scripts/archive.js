const ARCHIVE = {
    // Functions
    init: function () {
        UTILS.log("Archive initialized!");
    },
    extract: function () {
        STATE.isDownloading = false;
        STATE.isExtracting = true;
        let item = UTILS.findItem(STATE.itemOnFocus);
        if (item) {
            let zip = Archive.open(ABSOLUTE_SAVE_PATH + item.name);
            os.chdir(SAVE_PATH);
            Archive.extractAll(zip);
            Archive.close(zip);
            os.remove(item.name)
            os.chdir(DEFAULT_ROOT_PATH);
            STATE.isExtracting = false;
            STATE.isDownloadModalFocused = false;
        }
    },
    exists: function (path) {
        return std.exists(path)
    },
    createFolder: function (path) {
        if (!this.exists(path)) {
            return os.mkdir(path);
        }

        return false;
    }
}