// function add(x,y){
//     return x + y;
// }
// function sum(n){
//     return n*(n + 1)/2;

// }
// let ans = sum(4);
// console.log(ans);

function pow(x, n) {
    if (n === 0) {
        return 1;
    }
    return x * pow(x, n - 1);
}

function remainder(x, n) {
    return x % n;
}

class calculator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add() {
        return this.x + this.y;
    }

    multiply() {
        return this.x * this.y;
    }

    divide() {
        if (this.y === 0) {
            throw new Error("Cannot divide by zero");
        }
        return this.x / this.y;
    }
}

let chr = new calculator(2, 3);
let ans = chr.add();

console.log(ans);