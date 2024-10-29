const { install_steamcmd, check_steamcmd } = require("./installsteamcmd")
const { install_gmod, check_gmod } = require("./installgmod")
const { install_start_bat } = require('./installstartbat');
const { install_tools } = require("./installtools")


async function startup() {
    if (check_steamcmd() == false)
        if (!await install_steamcmd())
            process.exit(-1)

    const gmod_status = check_gmod()
    if (gmod_status === "error")
        process.exit(-1)


    if (gmod_status === false) {
        if (!await install_gmod())
            process.exit(-1)
    }

    if (!await install_tools())
        process.exit(-1)
    if (!await install_start_bat())
        process.exit(-1)
}


module.exports = { startup }