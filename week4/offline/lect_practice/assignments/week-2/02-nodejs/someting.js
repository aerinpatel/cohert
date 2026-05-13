const fs = require('fs');

const filePath = "./files"; // Replace with the actual path if needed

// fs.readFile(filePath, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // Read the file content as a string
//     // const content = data.toString();
//     data.forEach((content) => console.log(content)};
//   }
// });

fs.readdir(filePath, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach(file => {
      console.log(file);
    });
  }
});
