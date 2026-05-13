//-----------------------------------------------------------------------------------------------------//
// Method 1 : settimeout 1(with callback hell)
// setTimeout(() => {
//     console.log("hi");
//     setTimeout(function(){
//         console.log("hello");
//         setTimeout(function(){
//             console.log("hello there");
//         },5000);
//     },3000);
// }, 1000);
//-----------------------------------------------------------------------------------------------------//
// Method 2 : settimeout 2(alt)[without callback hell (hard to understand)]
// function greet3(){
//     console.log("hello there");

// }
// function greet2(){
//     console.log("hello");
//     setTimeout(greet3,5000);
// }
// function greet1(){
//     console.log("hi");
//     setTimeout(greet2,3000);
// }
// setTimeout(greet1,1000);
//-----------------------------------------------------------------------------------------------------//
// // Method 3 : promisified settimeout1 (with callback hell) 
// function setTimeoutPromisified(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// setTimeoutPromisified(1000).then(() => {
//     console.log("hi");
//     setTimeoutPromisified(3000).then(() => {
//         console.log("hello");
//         setTimeoutPromisified(5000).then(() => {console.log("hello there");});
//     });
// });


//-----------------------------------------------------------------------------------------------------//
// Method 4 : promisified settimeout2 (without callback hell)
function setTimeoutPromisified(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
setTimeoutPromisified(1000)
    .then(() => {
        console.log("hi");
        return setTimeoutPromisified(3000);
    }).then(() => {
        console.log("hello");
        return setTimeoutPromisified(5000);
    }).then(() => {
        console.log("hello there");
    });

//-----------------------------------------------------------------------------------------------------//