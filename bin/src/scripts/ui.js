const UI = {
    //Variables
    headerHeight: 43,
    footerHeight: 50,
    rowHeight: 25,
    fontBold: new Font('./src/fonts/Rajdhani-Bold.ttf'),
    fontSemiBold: new Font('./src/fonts/Rajdhani-SemiBold.ttf'),
    fontRegular: new Font('./src/fonts/Rajdhani-Regular.ttf'),


    // Functions
    init: function () {
        this.fontBold.scale = 0.8f;
        this.fontSemiBold.scale = 0.5f;
        this.fontRegular.scale = 0.5f;
        UTILS.log("UI initialized!");
    },
    update: function () {
        this.renderWrapper();
        this.renderHeader();
        this.renderFooter();
        this.renderList();
        this.renderModal();
    },
    renderWrapper: function () {
        Draw.line(10, 10, SCREEN.width - 10, 10, COLORS.border);
        Draw.line(SCREEN.width - 10, 10, SCREEN.width - 10, SCREEN.height - 10, COLORS.border);
        Draw.line(SCREEN.width - 10, SCREEN.height - 10, 10, SCREEN.height - 10, COLORS.border);
        Draw.line(10, SCREEN.height - 10, 10, 10, COLORS.border);
    },
    renderHeader: function () {

        //Displaying temperature
        let temperature = System.getTemperature();
        if (temperature) {
            let temp_text = temperature + "C";
            let temp_size = this.fontSemiBold.getTextSize(temp_text);
            this.fontSemiBold.color = COLORS.primaryAction;

            //Add temperature text position based on the text size
            this.fontSemiBold.print(SCREEN.width - (temp_size.width / 2) - 40, 7, temp_text);
        }

        //Displaying app name + version
        let appname_first = "BIT";
        let appname_second = "ZONE";

        this.fontBold.color = COLORS.highlight;
        this.fontBold.print(20, 10, appname_first);
        this.fontBold.color = COLORS.primaryAction;
        this.fontBold.print(48, 10, appname_second);

        this.fontSemiBold.color = COLORS.secondary;
        this.fontSemiBold.print(95, 10, VERSION);

        Draw.line(10, this.headerHeight, SCREEN.width - 10, this.headerHeight, COLORS.border);

    },
    renderList: function () {
        const startAt = STATE.itemOnFocus < STATE.itemsShown / 2 ? 0 : STATE.itemOnFocus - Math.floor(STATE.itemsShown / 2);
        const endsAt = STATE.itemOnFocus < STATE.itemsShown / 2 ? STATE.itemsShown : STATE.itemOnFocus - Math.floor(STATE.itemsShown / 2) + STATE.itemsShown;

        STATE.list.slice(startAt, endsAt).forEach((item, i) => {
            let = rowPosition = this.headerHeight + (this.rowHeight * i);
            if (item.id === STATE.itemOnFocus) {
                Draw.rect(20, rowPosition + 5, SCREEN.width - 40, this.rowHeight, COLORS.border);

                Draw.line(20, rowPosition + 5, SCREEN.width - 20, rowPosition + 5, COLORS.highlight);
                Draw.line(SCREEN.width - 20, rowPosition + 5, SCREEN.width - 20, rowPosition + 32, COLORS.highlight);
                Draw.line(SCREEN.width - 20, rowPosition + 32, 20, rowPosition + 32, COLORS.highlight);
                Draw.line(20, rowPosition + 32, 20, rowPosition + 5, COLORS.highlight);

                let name = item.name.replace('.zip', '');

                if (name.length > 95) name = name.slice(0, 95) + '...';

                this.fontSemiBold.print(30, rowPosition, name);
                this.fontSemiBold.print(SCREEN.width - 80, rowPosition, item.size);
            } else {
                let name = item.name.replace('.zip', '');

                if (name.length > 95) name = name.slice(0, 95) + '...';
                this.fontRegular.print(30, rowPosition, name);
                this.fontRegular.print(SCREEN.width - 80, rowPosition, item.size);
            }

        })
    },
    renderFooter: function () {
        this.fontSemiBold.color = COLORS.secondary;
        Draw.line(10, SCREEN.height - this.footerHeight, SCREEN.width - 10, SCREEN.height - this.footerHeight, COLORS.border);

        // Cross button
        Draw.line(90, SCREEN.height - 38, 106, SCREEN.height - 22, COLORS.highlight);
        Draw.line(106, SCREEN.height - 38, 90, SCREEN.height - 22, COLORS.highlight);
        Draw.line(90, SCREEN.height - 38, 106, SCREEN.height - 38, COLORS.background);
        Draw.line(106, SCREEN.height - 38, 106, SCREEN.height - 21, COLORS.background);
        Draw.line(106, SCREEN.height - 22, 90, SCREEN.height - 22, COLORS.background);
        Draw.line(90, SCREEN.height - 22, 90, SCREEN.height - 38, COLORS.background);
        this.fontSemiBold.print(115, SCREEN.height - 49, "Select");

        // Circle button
        Draw.circle(290, SCREEN.height - 30, 8, COLORS.tertiaryAction, false);
        this.fontSemiBold.print(305, SCREEN.height - 49, "Back");

        //Square button
        Draw.line(490, SCREEN.height - 38, 506, SCREEN.height - 38, COLORS.secondaryAction);
        Draw.line(506, SCREEN.height - 38, 506, SCREEN.height - 21, COLORS.secondaryAction);
        Draw.line(506, SCREEN.height - 22, 490, SCREEN.height - 22, COLORS.secondaryAction);
        Draw.line(490, SCREEN.height - 22, 490, SCREEN.height - 38, COLORS.secondaryAction);
        this.fontSemiBold.print(515, SCREEN.height - 49, "Options");
    },
    renderModal: function () {
        if (STATE.isDownloadModalFocused) {
            const modalMiddlePoint = SCREEN.width / 2;
            // Modal background
            Draw.rect(100, SCREEN.height / 3, SCREEN.width - 200, SCREEN.height / 3, COLORS.border);

            //Modal title and description
            let title = "Downloading...";

            let description = "It will take a few time. Take a coffee!"

            let percentage = 0;

            // Only calculate download percentage if there is any download going on
            if (STATE.isExtracting) {
                title = "Extracting..."
                percentage = 99.9;
            } else if (STATE.isDownloading) {
                let item = UTILS.findItem(STATE.itemOnFocus);
                let fileSize = UTILS.convertSize(item.size);
                let totalDownloadedSize = NETWORK.size();


                // Calculate dynamic percentage based on the total file size and current downloaded size
                percentage = parseFloat((100 * totalDownloadedSize) / fileSize).toFixed(1);

                //Breaking percentage on max 100%
                if (percentage > 100) percentage = 100;
            }

            const titleSize = this.fontBold.getTextSize(title);
            const descriptionSize = this.fontRegular.getTextSize(description);
            const percentageSize = this.fontRegular.getTextSize(`${percentage}%`);
            this.fontBold.print(modalMiddlePoint - (titleSize.width / 2), (SCREEN.height / 3) + 20, title);
            this.fontRegular.print(modalMiddlePoint - (descriptionSize.width / 2), (SCREEN.height / 3) + titleSize.height + 7, description);

            //Progress bar
            const progressBarWidth = SCREEN.width - 300;
            Draw.rect(150, (SCREEN.height / 3) + titleSize.height + descriptionSize.height + 25, progressBarWidth, 15, COLORS.background);
            Draw.rect(150, (SCREEN.height / 3) + titleSize.height + descriptionSize.height + 25, (progressBarWidth * percentage) / 100, 15, COLORS.primaryAction);
            this.fontRegular.print(modalMiddlePoint - (percentageSize.width / 2), (SCREEN.height / 3) + titleSize.height + descriptionSize.height + 13, `${percentage}%`);
        }
    }
}