const { Queue } = require('../utils/utilities.js');
const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let set= {}
let queue = new Queue()
let finali = -1

rl.on('line', (line) => {
    const str = line
    let i = 0
    let charsum = 0
    while(i<str.length){
        if (i > 13){
            if (queue.allUnique()){
                finali = i
                break
            }
            //if(!queue.contains(str[i])){
            //}
            queue.dequeue()
        }
        queue.enqueue(str[i])
        i++
    }
});
rl.on('close', () => {
    console.log(finali)
});
