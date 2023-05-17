const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');
const string_decoder = require("string_decoder");

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let stack = []
let latitude = 0
let longitude = 0

rl.on('line', (line) => {
    let [dir, amount] = line.split(' ')
    if (dir === 'U'){
        latitude += Number(amount)
    }
    else if (dir === 'D'){
        latitude -= Number(amount)
    }
    else if(dir === 'R'){
        longitude += Number(amount)
    }
    else if (dir === 'L'){
        longitude -= Number(amount)
    }
    
});

rl.on('close', () => {
    console.log("Long, Lat: ",longitude,latitude)
});
