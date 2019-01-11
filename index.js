const matter = require('gray-matter');
const fs = require('fs');
const showdown = require('showdown');
const Mustache = require('mustache');
const {promisify} = require('util');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const folder = process.cwd() + "/markdown";

const target = process.cwd() + "/dist";

const template = process.cwd() + "/template";

const converter = new showdown.Converter();

const navItems = [
  {title: 'About', url: '/about'},
  {title: 'Help & FAQ', url: '/help'}
]


// async function loadPartials(){
//   try{
//     const files = await readDirAsync(template + '/partials', {encoding: 'utf8'});
//     const partials = [];
//     for(let i = 0; i < files.length; i ++){
//       const partial = await readFileAsync(template + '/partials/' + files[i], {encoding: 'utf8'})
//       partials.push(partial)
//     }
//   }
//   catch(err){
//     console.log('ERROR', err)
//   }
// 
// }


async function writeFile(fileTitle, output){
  try{
    await writeFileAsync(target + '/' + fileTitle, output);
    console.log(target + '/' + fileTitle + " has been saved")
  }
  catch(err){
    console.log('ERROR', err);
  }
}

async function generateHtml(file){
  try{
    const content = matter.read(folder + '/' + file, {encoding: 'utf8'});
    const fileTitle = content.data.title + '.html';
    
    const contentHtml = converter.makeHtml(content.content);
    const data = await readFileAsync(template +'/wrapper.mst', {encoding: 'utf8'});
    const imageSidebarItems = content.data.imageSidebarItems;
    const menuSidebarItems = content.data.menuSidebarItems;
    
    const files = await readDirAsync(template + '/partials', {encoding: 'utf8'});
    const partials = {};
    for(let i = 0; i < files.length; i ++){
      const partial = await readFileAsync(template + '/partials/' + files[i], {encoding: 'utf8'})
      partials[files[i]] = partial
    }
    const output = Mustache.render(data.toString(), {content: contentHtml, 
                                                     title: content.data.title,
                                                     navItems: navItems,
                                                     imageSidebarItems: imageSidebarItems,
                                                     menuSidebarItems: menuSidebarItems},
                                                     partials
                                                     );
    writeFile(fileTitle, output);
  }
  catch(err){
    console.log('ERROR', err);
  }
}

async function loadContent(){
  try{
    const files = await readDirAsync(folder);
    for( let i = 0; i < files.length; i ++){
      const file = files[i];
      generateHtml(file);
    }
  }
  catch(err){
    console.log('ERROR', err);
  }
}

loadContent();


