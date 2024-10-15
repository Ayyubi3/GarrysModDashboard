const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');

function askQuestion(question) {
    let input = prompt(question + ": ")
    return input
}

function askQuestion_confirmation(question) {

    let input = ""
    let sure = false
    while (!sure) {
        input = askQuestion(question)
        if (input.trim() == "") {
            console.log("Invalid")
            continue
        }
        if (askQuestion("Are you sure?: Y/N").toLowerCase() == "y")
            sure = true
    }
    return input
}

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
}



module.exports = { askQuestion, askQuestion_confirmation, filesExists }
