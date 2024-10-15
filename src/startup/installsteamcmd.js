const axios = require('axios');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const os = require('os');


const { filesExists } = require("../utils/index.js")

const STEAM_CMD_LINK_WIN32 = "https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip"

async function install_steamcmd() {

    if (filesExists(path.join(path.join(process.env.ROOT, "steamcmd.exe")))) {
        console.log("SteamCMD already installed.")
        return true
    }


    console.log("SteamCMD installation")

    const URL = os.platform == "win32" ? STEAM_CMD_LINK_WIN32 : ""

    try {
        const response = await axios({
            url: URL,
            method: 'GET',
            responseType: 'stream'
        });

        await new Promise((resolve, reject) => {
            response.data
                .pipe(unzipper.Extract({ path: process.env.ROOT }))
                .on('close', () => {
                    console.log('SteamCMD installed successfully');
                    resolve();
                })
                .on('error', (err) => {
                    console.error('Error extracting zip file:', err);
                    reject(err);
                });
        });

    } catch (error) {
        console.error('Error downloading or extracting SteamCMD:', error);
        return false
    }

    return true
}

module.exports = { install_steamcmd }