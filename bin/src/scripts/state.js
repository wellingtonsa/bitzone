const STATE = {
    // Variables
    list: [],
    itemsShown: 13,
    itemOnFocus: 1,
    isLoading: false,
    isDownloading: false,
    isExtracting: false,
    isDownloadModalFocused: false,

    // Functions
    init: function () {

        this.list = DATABASE.get();

        UTILS.log("State initialized!");
    }
}