const DATABASE = {
    // Functions
    init: function () {
        UTILS.log("Database initialized!");
    },
    get: function () {
        let database_file = std.open("./src/db/database.json", "r");
        let database = JSON.parse(database_file.getline());
        database_file.close();
        database_file = null;

        return database;
    }
}