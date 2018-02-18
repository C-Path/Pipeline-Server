'use strict';

module.exports = function (app) {
    var fileList = require('../controllers/fileController')

    /* Setting the headers allows for CORS so it will run normal locally */
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });

    app.route('/files')
        .get(fileList.list_all_files)
        .delete(fileList.delete_old_files)
        .post(fileList.create_a_file);

    app.route('/files/:username')
        .get(fileList.list_all_files_by_user)

    app.route('files/:file_id')
        .get(fileList.list_file_by_id)
        .delete(fileList.delete_file_by_id)


}