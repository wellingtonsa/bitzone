let downloadOnGoing = false;
let downloadStarted = false;
let lastDownloadedSize = 0;

const NETWORK = {
    // Variables
    request: undefined,



    // Functions
    init: function () {
        Network.init();

        UTILS.log("Network initialized!");
    },
    update: function () { },
    download: function (url, path) {
        this.request = new Request();
        this.request.followlocation = true;
        this.request.headers = [
            "upgrade-insecure-requests: 1",
            "sec-fetch-dest: document",
            "sec-fetch-mode: navigate"
        ];

        this.request.asyncDownload(url, path);
        STATE.isDownloading = true;
        downloadStarted = true;


        let checkDownload = os.setInterval(() => {
            let downloadedSize = this.size();
            if (downloadedSize) downloadOnGoing = true;
            UTILS.log('Checking download...');
            if (downloadStarted && downloadOnGoing) {
                if (downloadedSize === lastDownloadedSize) {
                    UTILS.log('Download completed!');
                    downloadStarted = false;
                    downloadOnGoing = false;
                    lastDownloadedSize = 0;
                    ARCHIVE.extract();
                    os.clearInterval(checkDownload);
                } else {
                    lastDownloadedSize = downloadedSize;
                }
            }
        }, 20000);
    },
    isReady: function (timeout = 999999, conn_timeout = 3000) {
        return this.request.ready(timeout, conn_timeout);
    },
    size: function () {
        return this.request.getAsyncSize();
    },
    data: function () {
        return this.request.getAsyncData();
    }
}