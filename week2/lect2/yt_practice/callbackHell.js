function getwheat(callback) {
  setTimeout(() => {
    console.log("Here is the wheat");
    callback("wheat");
  }, 3000);
}
function getoil(wheat, callback) {
  setTimeout(() => {
    console.log("Here is the oil");
    callback("oil");
  }, 3000);
}
function getwater(wheat, oil, callback) {
  setTimeout(() => {
    console.log("Here is the water");
    callback("water");
  }, 3000);
}
getwheat((flour) => {
  console.log("got the flour:", flour);

  getoil(flour, (oil) => {
    console.log("got the oil", oil);
    getwater(flour, oil, (water) => {
      console.log("got the water", water);
      console.log("finished");
    });
  });
});
