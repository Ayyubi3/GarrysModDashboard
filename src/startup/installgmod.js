const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const fileHelper = require("../utils/fileHelper")


function install_gmod() {


    console.log(`Garrys Mod Server installation\nThis may take a while (dont worry if there is no output for a couple of minutes)`)


    return new Promise((resolve, reject) => {
        const program = path.join(process.env.ROOT, "steamcmd.exe")
        const args = ["+force_install_dir", process.env.GMOD_DIR, "+login", "anonymous", "+app_update", "4020", "validate", "+exit"]


        const child = spawn(program, args, { encoding: "utf8" });

        child.stdout.setEncoding("utf8")
        child.stdout.on('data', (data) => {
            console.log(`Output: ${data}`);
        });

        child.stderr.setEncoding("utf8")
        child.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        child.on('close', (code) => {
            resolve(true)
            // Test after if files are there
        });
    });

}


function check_gmod() {
    const checkFiles = [
        path.join(process.env.ROOT, process.env.GMOD_DIR),
        path.join(process.env.ROOT, process.env.GMOD_DIR, "garrysmod"),
        path.join(process.env.ROOT, process.env.GMOD_DIR, "garrysmod", "cfg"),
        path.join(process.env.ROOT, process.env.GMOD_DIR, "garrysmod", "lua"),
    ]

    let filesExist = fileHelper.filesExists(checkFiles)
    if (filesExist == "error") {
        console.error("Only some of the files for the server exist.")
        console.error("Try deleting everything except this programm")
        console.error("THERE SHOULD BE NOTHING IN THIS FOLDER EXCEPT THIS SCRIPT")
        return "error"
    }

    if (filesExist === true) {
        console.log("Garrys mod is already installed")
        return true
    }

    console.log("Garrys Mod not installed")
    return false

}


module.exports = { check_gmod, install_gmod }