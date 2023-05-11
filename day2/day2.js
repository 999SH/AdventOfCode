const fs = require('fs');
const readline = require('readline');
const fileStream = fs.createReadStream('source.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const counts = {};
rl.on('line', (line) => {
    const [key, value] = line.split(' ');
    const combination = `${key}=>${value}`;
    if (counts[combination]) {
        counts[combination]++;
    } else {
        counts[combination] = 1;
    }
});

rl.on('close', () => {
    let data = new Map(Object.entries(counts));
    counter(data)
});

function counter(data){
    let sum = 0
    let score = 0
    for (let [key, value] of data) {
        switch (key){
            case 'A=>X':
                score = 3 * value;
                break;
            case 'A=>Y':
                score = 4 * value;
                break;
            case 'A=>Z':
                score = 8 * value;
                break;
            case 'B=>X':
                score = 1 * value;
                break;
            case 'B=>Y':
                score = 5 * value;
                break;
            case 'B=>Z':
                score = 9 * value;
                break;
            case 'C=>X':
                score = 2 * value;
                break;
            case 'C=>Y':
                score = 6 * value;
                break;
            case 'C=>Z':
                score = 7 * value;
                break;
        }
        console.log("Sum for iteration:", score)
        sum += score
        console.log(`${key}, ${value}`);
    }
    console.log(sum)
}
