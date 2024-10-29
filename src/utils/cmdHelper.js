const prompt = require('prompt-sync')({ sigint: true });

function askQuestion(question) {
    let input = prompt(question + ": ")
    return input
}

function askQuestion_withConfirmation(question) {

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

function askQuestion_withChoices(question, choices) {
    let q = question + ": "

    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        q += `${i}: ${choice}, `
    }

    let valid = false
    let res = ""

    while (!valid) {
        let x = parseInt(askQuestion(q))
        if (x >= 0 && x < choices.length) {
            valid = true
            res = x
            console.log(`${x} is a valid choice`)
            break
        }
        console.log("Not a valid choice")
    }

    return res
}

function askQuestion_untilTrue(question, lambda) {
    do {
        askQuestion(question)
    } while (lambda());
}

module.exports = { askQuestion, askQuestion_withConfirmation, askQuestion_withChoices, askQuestion_untilTrue }