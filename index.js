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
  {title: 'About', url: '/about.html'},
  {title: 'Help', url: '/help.html'},
  {title: 'FAQ', url: '/faq.html'},
  {title: 'Privacy', url: '/privacy.html'},
  {title: 'Launch NationalMap', url: 'https://nationalmap.gov.au/'}
]
function parseNestedMenuItems(menuSidebarItemsRaw, fileTitle){
  if(menuSidebarItemsRaw && menuSidebarItemsRaw.length > 0){
     return menuSidebarItemsRaw.map((group) => {
       return {title: group.title,
              items: group.items.map((item, index) =>{
                const id= '#' + item.title.toLowerCase().replace(/\s/g, "-");
                return {title: item.title,
                        url: id
                      }
              })}
     })
  }
  return [];
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
    const imageSidebarItems = content.data.imageSidebarItems;
    const menuSidebarItemsRaw = content.data.menuSidebarItems;
    const menuSidebarItems = parseNestedMenuItems(menuSidebarItemsRaw, fileTitle);

    const files = await readDirAsync(template + '/partials', {encoding: 'utf8'});
    const partials = {};
    for(let i = 0; i < files.length; i ++){
      const partial = await readFileAsync(template + '/partials/' + files[i], {encoding: 'utf8'})
      partials[files[i]] = partial
    }

    const output = Mustache.render(data.toString(), {content: contentHtml,
                                                     title: content.data.title,
                                                     navItems,
                                                     imageSidebarItems,
                                                     menuSidebarItems},
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
