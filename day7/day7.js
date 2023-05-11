const { LinkedTree, Node, File } = require('../utils/utilities.js');
const fs = require('fs');
const fileStream = fs.createReadStream('source.txt');
const readline = require('readline');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});
let linkedTree = new LinkedTree()
let cur
let root
rl.on('line', (line) => {
    const [p1, p2,p3] = line.split(' ')
    if(p3 === '/'){
        linkedTree.root = new Node('/')
        cur = linkedTree.root
        root = linkedTree.root
    }
    else if(p3 === '..'){
        cur = cur.parent
    }
    else if(p2 === 'cd'){
        cur.addChild(p3)
        let cindex = cur.getCindex(p3)
        let childNode = cur.children[cindex]
        childNode.addParent(cur)
        cur = childNode
    }
    else if(Number(p1)){
        cur.addFile(new File(p2, Number(p1)))
    }
});
rl.on('close', () => {
    let stack = [linkedTree.root];
    let visited = new Set();
    while (stack.length > 0) {
        let node = stack[stack.length - 1];
        if (node.children.every(child => visited.has(child))) {
            // All children have been processed, so we can process this node
            stack.pop();
            visited.add(node);
            for (let child of node.children) {
                node.size += child.size;
            }
        } else {
            // Add unvisited children to the stack
            for (let child of node.children) {
                if (!visited.has(child)) {
                    stack.push(child);
                }
            }
        }
    }
    //DFS 2
    let stack2 = [linkedTree.root];
    let sum = 0
    while (stack2.length > 0) {
        let node = stack2.pop();
        if(node?.size <= 100000){
            sum += node.size
        }
        for (let child of node.children) {
            stack2.push(child); // Add the children of the current node to the stack
        }
    }
    console.log(sum);
});