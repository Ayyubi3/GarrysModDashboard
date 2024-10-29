const fs = require('fs');
const path = require('path');
const fileHelper = require('../utils/fileHelper');
const cmdHelper = require('../utils/cmdHelper');
const mapsInterface = require("../interface/maps")



function install_start_bat() {

    if (fileHelper.filesExists(path.join(process.env.ROOT, "start.bat"))) {
        console.log("Starting script is already installed")
        return true
    }

    console.log("Creating Starting script\nAt this step you need to create a Steam Workshop Collection with addons for your TTT server.\nFor now an empty collection is enough. You can add more addons later.\nThe Collection ID is last number in the URL")

    let collectionID = cmdHelper.askQuestion_withConfirmation("Steam collection ID for the addons (Can be changed later)").trim()

    let installedMaps = mapsInterface.getInstalledMaps()
    let startingMapIndex = cmdHelper.askQuestion_withChoices("On which map should the server start (Can be changed later)", installedMaps)
    let startingMap = installedMaps[startingMapIndex]
    const script = `
    @echo off

    cls
    echo Protecting srcds from crashes...
    echo If you want to close srcds and this script, close the srcds window and type Y depending on your language followed by Enter.
    title srcds.com Watchdog
    :srcds
    echo (%time%) srcds started.
    ${path.join(process.env.ROOT, process.env.GMOD_DIR, "srcds.exe")} +host_workshop_collection ${collectionID} +r_hunkalloclightmaps 0 -console -game garrysmod +gamemode terrortown +map ${startingMap} +maxplayers 32
    echo (%time%) WARNING: srcds closed or crashed, restarting.
    goto srcds
    `

    fs.writeFileSync(path.join(process.env.ROOT, "start.bat"), script, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return false
        } else {
            console.log('File has been created and content written!');
        }
    })

    console.log("start.bat created")
    return true
}

module.exports = { install_start_bat }