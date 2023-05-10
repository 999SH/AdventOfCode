const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let sum = 0
rl.on('line', (line) => {
    const [p1,p2] = line.split(',');
    let [n1, n2] = p1.split('-')
    let [k1, k2] = p2.split('-')

    n1 = Number(n1)
    n2 = Number(n2)
    k1 = Number(k1)
    k2 = Number(k2)
    console.log(p1,p2)
    if ((n1 < k1) && (n2 < k1)){
        console.log("No overlap")
    }
    else if ((n1 > k1) && (n1 > k2)){
        console.log("No overlap")
    }
    else {
        console.log("Overlap")
        sum++
    }
});

rl.on('close', () => {
    console.log(sum)
});