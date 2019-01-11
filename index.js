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

const nav = [
  {title: 'About', link: '/about'},
  {title: 'Help & FAQ', link: '/help'}
]


function generateNav(pageTitle){
  return `<ul>
    ${nav.map(item =>
    `<li><a href='${item.link}' class=${item.title === pageTitle ? '"active"' : '"non-active"' }>${item.title}</a></li>`).join(" ")}
  </ul>`
}

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
    const output = Mustache.render(data.toString(), {content: contentHtml, nav: generateNav(content.data.title)});
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


