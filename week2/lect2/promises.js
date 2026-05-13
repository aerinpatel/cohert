// function setTimeoutPromisified(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function callback() {
//   console.log("some time has passedd");
// }
// // setTimeout(callback,3000);
// setTimeoutPromisified(2000).then(callback);
//-------------------------------------------------------------------------------------------------------------//
// function random(resolve){
//   setTimeout(resolve,4000);
// }

// let p = new Promise(random);
// let callback = () => console.log("done");
// p.then(callback);
//-------------------------------------------------------------------------------------------------------------//

console.log("-------------Start of the program--------");
function readTheFile(resolve){
    console.log("read the file called ");
    setTimeout(function(){
        console.log(" Set timeout called and started");
        resolve();
    }, 3000);

}
function setTimeoutPromisified(){
    console.log("---- Set time out promisified called  ");
    return new Promise(readTheFile);
}
const p = setTimeoutPromisified();

function callBack(){
    console.log(" Timer is done ")
}
p.then(callBack)
console.log("-------  End of the Program");

