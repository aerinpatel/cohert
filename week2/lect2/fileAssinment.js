const fs = require('fs');


function resolve(ans){
    fs.readFile("a.txt","utf-8",(err,data) =>{
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        ans(data);
    })
}

function readfileprom(file){
    return new Promise(resolve);
}

function print(data) {
    console.log(data);
}
const p = readfileprom("a.txt");
p.then(print);