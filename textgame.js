// core module - means you don't need to install it - it comes included as part of node!
const readline = require("readline");
const chalk = require("chalk");

// console.log(chalk.magenta("Hi Mustard <33333"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const story = {
    q: "Would you like to hangout today?",
    answers: {
        yes: {
            q: "Do you like ping-pong?",
            answers: {
                yes: {
                    q: "How many points to switch the serve?",
                    answers: {
                        "5": "You seem to be a Profi, Let's play!"
                    }
                },
                no: "I am just in the mood for 🏓. Goodbye!"
            }
        },
        no: "Me neither :P"
    }
};

const colors = {
    q: `Please choose a color for Questions? \n 
        black \n
        magenta \n
        green \n
        random \n`,   
};

// question takes 2 arguments
// rl.question(arg1, arg2)
// 1st arg - question you want to ask
// 2nd arg - callback fn that runs which is responsible in capturing the user's response to the question!

let i=1;
let j=0;

function askQuestion(obj) {
    rl.question(chalk.keyword(colorInput)(obj.q), (answer) => {
        // console.log("check answer ===> ", obj.answers[answer]);

        // if they give us one of the valid answers (yes or no)
        
        if(typeof obj.answers[answer] == "object") {
            j = 0;
            i++;
            console.log(chalk.green("you have reached the challenge level:",i));
            askQuestion(obj.answers[answer]);
        } else if (typeof obj.answers[answer] == "string") {
            j =0;
            console.log(chalk.keyword(colorInput)(obj.answers[answer]));
            rl.close();
        } else {
            j++;
            if(j<3) {
                console.log(
                    chalk.red("I will repeat my Question!"));
                askQuestion(obj);
            } else if(j==3) {
                console.log(
                    chalk.red("Last time to repeat my Question. Attention!"));
                    askQuestion(obj);
            } else {
                console.log(
                    chalk.red("You have wasted my time.Bye!"));
                rl.close();
            }
            
        }
    });
}

function askQuestionRandom(obj) {
    let rVal = Math.floor(256*Math.random());
    let gVal = Math.floor(256*Math.random());
    let bVal = Math.floor(256*Math.random());

    rl.question(chalk.rgb(rVal, gVal, bVal)(obj.q), (answer) => {
        // console.log("check answer ===> ", obj.answers[answer]);

        // if they give us one of the valid answers (yes or no)
        
        if(typeof obj.answers[answer] == "object") {
            j=0;
            i++;
            console.log(chalk.green("you have reached the challenge level:",i));
            askQuestionRandom(obj.answers[answer]);
        } else if (typeof obj.answers[answer] == "string") {
            j=0;
            console.log(chalk.rgb(rVal, gVal, bVal)(obj.answers[answer]));
            rl.close();
        } else {
            j++;
            if(j<3) {
                console.log(
                    chalk.red("I will repeat my Question!"));
                askQuestionRandom(obj);
            } else if(j==3) {
                console.log(
                    chalk.red("Last time to repeat my Question. Attention!"));
                    askQuestionRandom(obj);
            } else {
                console.log(
                    chalk.red("You have wasted my time.Bye!"));
                rl.close();
            }
            
        }
    });
}

function chooseColor(obj) {
    rl.question(obj.q, (answer) => {
        // console.log("check answer ===> ", obj.answers[answer]);

        // if they give us one of the valid answers (yes or no)
        
        if(colorsList.includes(answer)) {
            console.log(answer, "color will be used");
            if(answer != "random") {
                colorInput = answer;
                askQuestion(story);
            } else {
                askQuestionRandom(story);
            }
            
        } else {
            console.log(chalk.red("This option is not valid!"));
            chooseColor(colors);
        }
    });
}

let colorInput;
let colorsList = ["black","magenta","green", "random"];

chooseColor(colors); 

// start off the game by calling the function and passing it the 'story'!
