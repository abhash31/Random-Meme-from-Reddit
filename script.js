const memeImg = document.querySelector('.meme');
const uploadedBy = document.querySelector('#author');
const nextMeme = document.querySelector('#next-meme');
const openSource = document.querySelector('#open-source');
const loadingDiv = document.querySelector('.loading-container');
const caption = document.querySelector('#caption');

let meme = '';
let alreadySeen = [];

const randomMemeGenerator = function(){ 
    memeImg.style.display = "none"
    loadingDiv.style.display = "flex"
    
    fetch('https://meme-api.com/gimme').then((response)=>{
    return response.json();
}).then((data)=>{
    meme = data.url;
    console.log(meme)
    // const author = data.author;
    if(meme.endsWith('.gif')) {
        randomMemeGenerator();
        return;
    }
    else updateMeme(data.preview[2], data.author, data.title);
}).catch(()=>{
    console.log('1')
    randomMemeGenerator();
    return;
})}

randomMemeGenerator();

function updateMeme(memeUrl, author, title){
    if(alreadySeen.includes(memeUrl)) {
        randomMemeGenerator();
        return;
    }
    memeImg.setAttribute('src', memeUrl);
    uploadedBy.innerHTML = `uploaded by: ${author}<br><br>${title}`;
    memeImg.style.display = "block";
    loadingDiv.style.display = "none";
    alreadySeen.push(memeUrl);
}

nextMeme.addEventListener('click', randomMemeGenerator)
openSource.addEventListener('click', function(){
    openSource.setAttribute('href', meme);
});