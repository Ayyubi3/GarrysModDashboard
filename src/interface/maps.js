const fileHelper = require("../utils/fileHelper");
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');



function getInstalledMaps() {
    const allFiles = fileHelper.directoryRead(path.join(process.env.ROOT, process.env.GMOD_DIR, "garrysmod", "maps"))
    const ttt_maps = allFiles.filter(file => file.startsWith("ttt_"));
    const uniqueTTTMaps = [...new Set(ttt_maps)]
    return uniqueTTTMaps
}

function installMapsInGMDBFolder() {

    let gmdbPath = path.join(process.env.ROOT, process.env.GMDB_DIR)

    let gmodPath = path.join(process.env.ROOT, process.env.GMOD_DIR, "garrysmod")

    
    let mapsInstallerPath = path.join(gmdbPath, "maps")
    let gmaFiles = fileHelper.directoryRead(mapsInstallerPath).filter(file => path.extname(file).toLowerCase() === '.gma');
    
    let gmadPath = path.join(process.env.ROOT, process.env.GMDB_DIR, "gmad.exe");

    for (let i = 0; i < gmaFiles.length; i++) {
        const gmaFile = path.join(mapsInstallerPath, gmaFiles[i]);

        try {
            const output = execFileSync(gmadPath, [gmaFile], { encoding: 'utf-8' });
            console.log(`Output: ${output}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return false
        }

        try {
            fs.unlinkSync(gmaFile);
            console.log('File deleted successfully');
        } catch (err) {
            console.error(`Error deleting file: ${err.message}`);
            return false
        }
    }

    let mapNames = fileHelper.directoryRead(mapsInstallerPath).filter(item => {
        const fullPath = path.join(mapsInstallerPath, item);
        return fs.statSync(fullPath).isDirectory();
    });

    for (let i = 0; i < mapNames.length; i++) {
        const currMapName = mapNames[i]
        const currMapPath = path.join(mapsInstallerPath, currMapName);
        console.log(`Moving map ${currMapName} (${currMapPath})`)

        const filesToMove = fileHelper.directoryRead(currMapPath)
        for (let j = 0; j < filesToMove.length; j++) {

            const fileToMove = path.join(currMapPath, filesToMove[j])

            const targetMove = path.join(gmodPath, filesToMove[j])

            console.log(`${fileToMove} moved to ${targetMove}`)
            fs.cpSync(fileToMove, targetMove, { recursive: true })
            fs.rmdirSync(currMapPath, { recursive: true, force: true });
            
        }

    }

    return true
}



module.exports = { getInstalledMaps, installMapsInGMDBFolder }