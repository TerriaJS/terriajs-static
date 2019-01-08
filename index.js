const matter = require('gray-matter');
const fs = require('fs');

const folder = process.cwd() + "/markdown";

fs.readdir(folder, function(error, files){
  console.log(files);
  if(error){
    console.log(error);
  }
})