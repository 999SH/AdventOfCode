const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

class Segment {
    constructor() {
        this.x = 0
        this.y = 0
    }
}

class Snake {
    constructor() {
        this.segments = []
    }

    init() {
        for (let i = 1; i < 8; i++) {
            this.segments.push(new Segment());
        }
    }
}

let snake = new Snake()
let head = new Segment()
let tail = new Segment()
let set = new Set()

snake.segments[0] = head
snake.init()
snake.segments[8] = tail
let prev = head
let cur
rl.on('line', (line) => {
    let [dir, amount] = line.split(' ')
    let moves = Number(amount)
    amount = 9
    for (let j = 0; j < moves; j++) {
        let i = 0
        while (amount) {
            cur = snake.segments[i]
            if (i > 0) {
                prev = snake.segments[i - 1]
            }
            if (dir === 'U') {
                prev.x++
                amount--
            } else if (dir === 'D') {
                prev.y--
                amount--
            } else if (dir === 'R') {
                prev.x++
                amount--
            } else if (dir === 'L') {
                prev.x--
                amount--
            }
            let len = (Math.abs(prev.x - cur.x) + Math.abs(prev.y - cur.y))
            if (prev.y !== cur.y && prev.x !== cur.x) {
                len--
            }
            if (len > 1) {
                if (prev.x > cur.x) {
                    if (prev.y > cur.y) {
                        //Diagonal case, top right
                        cur.x++
                        cur.y++
                    } else if (prev.y === cur.y) {
                        cur.x++
                    } else {
                        //Diagonal bottom right
                        cur.x++
                        cur.y--
                    }
                } else if (prev.x === cur.x) {
                    if (prev.y > cur.y) {
                        //Right above
                        cur.y++
                    } else if (prev.y === cur.y) {
                        //Same place, no movement
                    } else {
                        //Right under
                        cur.y--
                    }
                } else {
                    if (prev.y > cur.y) {
                        //Right above to the left
                        cur.y++
                        cur.x--
                    } else if (prev.y === cur.y) {
                        cur.x--
                    } else {
                        //Right under
                        cur.y--
                        cur.x--
                    }
                }
            }
            i++
        }
    }
    set.add(String([tail.x, tail.y]))
});

rl.on('close', () => {
    console.log(set)
});
