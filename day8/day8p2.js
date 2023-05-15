const {  } = require('../utils/utilities.js');
const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let stack = []
let scenArr = []

rl.on('line', (line) => {
    let str = Array.from(line)
    str = str.map(Number)
    stack.push(str)
    scenArr.push(new Array(str.length).fill(1))
});
//Shitty broken code that doesnt work:
rl.on('close', () => {
    //console.log(stack)
    let run = -1
    let i = 0
    let j = 0
    let treesSeen = 0
    while (run++ < 4){
        switch (run){
            case 0:
                i = 0
                j = 0
                while (i < stack.length){
                    let max = -1
                    j = 0
                    treesSeen = 0
                    while (j < stack.length){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            scenArr[i][j] *= treesSeen
                        }
                        treesSeen++
                        j++
                    }
                    i++
                }
                break
            case 1:
                i = 0
                j = 0
                while (j < stack.length){
                    treesSeen = 0
                    let max = -1
                    i = 0
                    while (i < stack.length){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            scenArr[i][j] *= treesSeen
                        }
                        treesSeen++
                        i++
                    }
                    j++
                }
                break
            case 2:
                i = stack.length-1
                j = stack.length-1
                while (i > -1){
                    let max = -1
                    j = stack.length-1
                    treesSeen = 0
                    while (j > -1){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            scenArr[i][j] *= treesSeen
                        }
                        treesSeen++
                        j--
                    }
                    i--
                }
                break
            case 3:
                i = stack.length-1
                j = stack.length-1
                while(j > -1){
                    treesSeen = 0
                    let max = -1
                    i = stack.length-1
                    while (i > -1){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            scenArr[i][j] *= treesSeen
                        }
                        treesSeen++
                        i--
                    }
                    j--
                }
                break
        }
    }
    let k = 0
    let newmax = 0
    while(k < scenArr.length){
        let testmax = Math.max(...scenArr[k])
        if (testmax > newmax)
        newmax = testmax
        k++
    }
    console.log(newmax)
});

