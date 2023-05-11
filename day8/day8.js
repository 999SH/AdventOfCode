const {  } = require('../utils/utilities.js');
const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});


let stack = []
let boolarr = []
rl.on('line', (line) => {
    const str = Array.from(line)
    stack.push(str)
    boolarr.push(str.fill(false))
});
rl.on('close', () => {
    console.log(stack)
    for (let i = 0; i < stack.length; i++) {
        for (let j = 0; j < stack.length; j++) {
            //console.log(stack[i][j])
        }
    }
});
