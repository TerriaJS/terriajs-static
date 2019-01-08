const matter = require('gray-matter');
const fs = require('fs');

const folder = './test'

fs.readdir('/test', function(error, files){
  console.log(files);
  if(error){
    console.log(error);
  }
})