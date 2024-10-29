const path = require('path');
const fs = require('fs');

// Tests if file or files exist (returns "error" if only some files exist)
function filesExists(pathOrPaths) {
    if (typeof pathOrPaths == "string") {
        if (fs.existsSync(pathOrPaths)) {
            return true
        }
        return false
    } else if (typeof pathOrPaths == "object") {
        let count = 0
        for (let i = 0; i < pathOrPaths.length; i++) {
            if (filesExists(pathOrPaths[i]))
                count++
        }

        if (count == pathOrPaths.length) {
            return true
        }
        if (count != 0)
            return "error"
        return false
    }

    return false
}



function directoryCreate(filePath) {
    if (filesExists(filePath) === false) {
        fs.mkdirSync(filePath);
        console.log(`Folder "${filePath}" has been created.`);
    } else {
        console.log(`Folder "${filePath}" already exists.`);
    }
}

function directoryRead(filePath) {
    let files = fs.readdirSync(filePath)
    return files
}


function moveItem(sourcePath, destPath) {
    if (fs.statSync(sourcePath).isDirectory()) {
        // If it's a directory, move recursively
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath); // Create destination folder if it doesn't exist
        }
        const items = fs.readdirSync(sourcePath);
        for (const item of items) {
            const sourceItemPath = path.join(sourcePath, item);
            const destItemPath = path.join(destPath, item);
            moveItem(sourceItemPath, destItemPath); // Recursively move contents
        }
        fs.rmdirSync(sourcePath); // Remove the source directory after moving
    } else {
        // If it's a file, move it
        fs.renameSync(sourcePath, destPath);
    }
}

module.exports = { filesExists, directoryCreate, directoryRead, moveItem }
