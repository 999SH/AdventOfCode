const fs = require('fs');
const readline = require('readline');
const fileStream = fs.createReadStream('source.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});
function isUpperCase(char) {
    return char >= 'A' && char <= 'Z';
}

let set = {}
function charToNum(char){
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const mapping = {};
    for (let i = 0; i < alphabet.length; i++) {
        mapping[alphabet[i]] = i + 1;
    }
    return mapping[char]
}

rl.on('line', (line) => {
    const middleIndex = Math.ceil(line.length / 2);
    const item1 = line.substring(0, middleIndex);
    const item2 = line.substring(middleIndex);
    let dl = identifyDuplicate(item1, item2)
    if (set[dl]){
        set[dl] += charToNum(dl)
    }
    else {
        set[dl] = charToNum(dl)
    }
});

rl.on('close', () => {
    let sum = 0
    for (const char in set){
        sum += set[char]
    }
    console.log(sum)
});

function identifyDuplicate(item1, item2){
    let commonchar
    for (const char of item1) {
        if(item2.includes(char)){
            commonchar = char
            break
        }
    }
    return commonchar
}

