const fs = require("fs"); // external library for accessing file system

function print(err,data){
    console.log(data);
}

fs.readFile("a.txt","utf-8",print); 
fs.readFile
fs.readFile("a.txt","utf-8",print);
console.log("done!!!!!!!!!!!!!!!!!!");


// function sum(a,b){
//     return a + b;
// }

// function doOperation(a,b,op){
//     let x = op(a,b);
//     return x;
// }
// const ap = doOperation(23,654,sum);
// console.log(ap);


//\/\/\/\/\/\synchrous verson of settime out\/\/\/\/\/\\
// function passtime(timeout){
//     let startTime = new Date();
//     let endTime = new Date(startTime.getTime() + timeout);
//     while(new Date() < endTime){
//         console.log("waiting");

//     }
//     console.log("wait is over");

//     // while(1){
//     //     let currentTime = new Date();
//     //     let timeDiff = currentTime - startTime;
        
//     // }
// }

// console.log("welcome to ap's clock");
