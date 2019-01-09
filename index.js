const matter = require('gray-matter');
const fs = require('fs');
const showdown = require('showdown');
const Mustache = require('mustache');

const folder = process.cwd() + "/markdown";

const target = process.cwd() + "/dist";

const template = process.cwd() + "/template";

const converter = new showdown.Converter();

fs.readdir(folder, function(error, files){
  if(files.length > 0){
    files.forEach(file => {
      content = matter.read(folder + '/' + file);
      const fileTitle = content.data.title + '.html';
      // create html content
      const contentHtml = converter.makeHtml(content.content);
      
      // load mst template
      fs.readFile(template +'/wrapper.mst', function (err, data) {
        if (err) throw err;
        const output = Mustache.render(data.toString(), {content: contentHtml});

        // write file
        fs.writeFile(target + '/' + fileTitle, output, err => {
          if(err){
            throw err;
          }
          return console.log(target + '/' + fileTitle + " has been saved");
        })
      })
      
    })    
  }
  if(error){
    console.log(error);
  }
});

