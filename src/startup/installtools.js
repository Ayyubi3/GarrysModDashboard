const fs = require('fs');
const fileHelper = require('../utils/fileHelper');
const cmdHelper = require('../utils/cmdHelper');
const path = require('path');
const mapsInterface = require("../interface/maps")



function install_tools() {

    let gmdbPath = path.join(process.env.ROOT, process.env.GMDB_DIR)
    fileHelper.directoryCreate(gmdbPath)

    let mapsInstallerPath = path.join(gmdbPath, "maps")
    fileHelper.directoryCreate(mapsInstallerPath)

    let gmadPath = path.join(process.env.ROOT, process.env.GMDB_DIR, "gmad.exe");
    while (!fileHelper.filesExists(gmadPath)) {
        cmdHelper.askQuestion("Please move gmad.exe into tools")
    }

    if (!mapsInterface.installMapsInGMDBFolder()) {
        return false
    }

    while (mapsInterface.getInstalledMaps().length <= 0) {
        cmdHelper.askQuestion("You dont have any maps installed. Add atleast one map")
        mapsInterface.installMapsInGMDBFolder()
    }

    return true

}
module.exports = { install_tools }