class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }
    contains(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                return true;
            }
        }
        return false;
    }
    allUnique(){
        for (let i = 0; i < this.items.length; i++) {
            for (let j = i+1; j < this.items.length; j++) {
                if (this.items[i] === this.items[j]) {
                    return false;
                }
            }
        }
        return true;
    }
}
module.exports = { Queue };
