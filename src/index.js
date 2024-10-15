require("dotenv").config()

const { startup } = require("./startup/startup")
const { dashboard } = require("./dashboard/dashboard")


async function main(params) {
    console.log("This program will guide your through a Garrys mod TTT server Creation")
    await startup()
    dashboard()
}

main()