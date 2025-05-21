const UTILS = {
    // Functions
    init: function () {
        this.log("Utils initialized!");
    },
    log: function (message) {
        if (DEBUG) console.log(message);
    },
    findItem: function (item) {
        let foundItem = STATE.list.find(i => i.id === STATE.itemOnFocus);

        return foundItem;
    },
    convertSize: function (size) {
        let unit = " MiB";
        let bytesMultipler = 2;
        if (size.includes("GiB")) {
            unit = " GiB"
            bytesMultipler = 3;
        }

        let fileSize = parseFloat(size.replace(unit, ''));

        return fileSize * Math.pow(1024, bytesMultipler);
    }
}