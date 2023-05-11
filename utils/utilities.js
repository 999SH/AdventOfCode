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

    len() {
        return this.items.length;
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

class Node {
    constructor(directory) {
        this.directory = directory
        this.children = []
        this.files = []
        this.parent = null
        this.size = 0
    }
    addChild(directory){
        let i = 0
        while (this.children[i]){
            i++
        }
        this.children[i] = new Node(directory)
    }
    addParent(node){
        this.parent = node
    }
    getCindex(directory){
        let i = 0
        while(this.children[i].directory){
            if(directory === this.children[i].directory){
                return i
            }
            i++
        }
        return -1
    }
    addFile(file){
        let i = 0
        while (this.files[i]){
            i++
        }
        this.files[i] = file
        this.size += file.filesize
    }
}
class File{
    constructor(name, size) {
        this.filesize = size
        this.filename = name
    }
}

class LinkedTree {
    constructor() {
        this.root = null;
    }
    addRoot(data) {
        this.root = new Node(data);
    }
}
module.exports = { Queue, LinkedTree, Node, File };
