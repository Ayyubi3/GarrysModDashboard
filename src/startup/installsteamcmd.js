const axios = require('axios');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const os = require('os');
const fileHelper = require("../utils/fileHelper")

const STEAM_CMD_LINK_WIN32 = "https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip"

async function install_steamcmd() {

    console.log("SteamCMD installation")

    const URL = STEAM_CMD_LINK_WIN32

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


function check_steamcmd() {
    if (fileHelper.filesExists(path.join(process.env.ROOT, "steamcmd.exe"))) {
        console.log("SteamCMD already installed.")
        return true
    }
    console.log("SteamCMD not installed.")
    return false

}

module.exports = { check_steamcmd, install_steamcmd }