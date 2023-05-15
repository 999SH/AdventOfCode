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
    let str = Array.from(line)
    str = str.map(Number)
    let boolstr = new Array(str.length).fill(false)
    stack.push(str)
    boolarr.push(boolstr)
});
rl.on('close', () => {
    //console.log(stack)

    let run = -1
    let i = 0
    let j = 0
    while (run++ < 4){
        switch (run){
            case 0:
                i = 0
                j = 0
                while (i < stack.length){
                    let max = -1
                    j = 0
                    while (j < stack.length){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            boolarr[i][j] = true
                        }
                        j++
                    }
                    i++
                }
                break
            case 1:
                i = 0
                j = 0
                while (j < stack.length){
                    let max = -1
                    i = 0
                    while (i < stack.length){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            boolarr[i][j] = true
                        }
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
                    while (j > -1){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            boolarr[i][j] = true
                        }
                        j--
                    }
                    i--
                }
                break
            case 3:
                i = stack.length-1
                j = stack.length-1
                while(j > -1){
                    let max = -1
                    i = stack.length-1
                    while (i > -1){
                        if (stack[i][j] > max){
                            max = stack[i][j]
                            boolarr[i][j] = true
                        }
                        i--
                    }
                    j--
                }
                break
        }
    }
    let k = 0
    let booltrue = 0
    while(k < boolarr.length){
        booltrue += boolarr[k].filter(Boolean).length
        k++
    }
    console.log(booltrue)
});
