const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');
const string_decoder = require("string_decoder");

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let stack = []
let headX = 0
let headY = 0
let tailX = 0
let tailY = 0
let set = new Set()

rl.on('line', (line) => {
    let [dir, amount] = line.split(' ')
    amount = Number(amount)
    while(amount){
        if (dir === 'U'){
            headY++
            amount--
        }
        else if (dir === 'D'){
            headY--
            amount--
        }
        else if(dir === 'R'){
            headX++
            amount--
        }
        else if(dir === 'L'){
            headX--
            amount--
        }
        let len = (Math.abs(headX-tailX)+Math.abs(headY-tailY))
        if (headY !== tailY && headX !== tailX){
            break
        }
        if (len > 1) {
            if (headX > tailX){
                if(headY > tailY){
                    //Diagonal case, top right
                    tailX++
                    tailY++
                }
                else if(headY === tailY){
                    tailX++
                }
                else {
                    //Diagonal bottom right
                    tailX++
                    tailY--
                }
            }
            else if(headX === tailX){
                if(headY > tailY){
                    //Right above
                    tailY++
                }
                else if(headY === tailY){
                    //Same place, no movement
                }
                else {
                    //Right under
                    tailY--
                }
            }
            else {
                if(headY > tailY){
                    //Right above to the left
                    tailY++
                    tailX--
                }
                else if(headY === tailY){
                    tailX--
                }
                else {
                    //Right under
                    tailY--
                    tailX--
                }
            }
        }
        set.add(String([tailX,tailY]))
    }
});

rl.on('close', () => {
    console.log(set)
});
