const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const stacks = [
    ['W','D','G','B','H','R','V'],
    ['J','N','G','C','R','F'],
    ['L','S','F','H','D','N','J'],
    ['J','D','S','V'],
    ['S','H','D','R','Q','W','N','V'],
    ['P','G','H','C','M'],
    ['F','J','B','G','L','Z','H','C'],
    ['S','J','R'],
    ['L','G','S','R', 'B', 'N', 'V', 'M']
];

rl.on('line', (line) => {
    const [move, x, from,y,to,z] = line.split(' ');
    let i = 0
    while(i < x){
        stacks[z-1].push(stacks[y-1].pop())
        i++
    }
    i = 0
});
rl.on('close', () => {
    let i = 0
    while(i < 9){
        console.log(stacks[i].pop())
        i++
    }
});