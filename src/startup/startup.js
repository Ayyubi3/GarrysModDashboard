const { install_steamcmd } = require("./installsteamcmd")
const { install_gmod } = require("./installgmod")
const {install_start_bat} = require('./installstartbat');


async function startup() {
    if(!await install_steamcmd())
        process.exit(-1)
    if(!await install_gmod())
        process.exit(-1)
    if(!await install_start_bat())
        process.exit(-1)
    }

module.exports = { startup }