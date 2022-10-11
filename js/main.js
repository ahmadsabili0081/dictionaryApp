
let dictionaryAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
let loading = false;
let errorHandling = false;
let dictionary__app = document.querySelector('.dictionary__app');
let searchBtn = document.querySelector('.send');
let resultDictionary = document.querySelector('.resultDictionary');
let audio = document.querySelector('.audio');
let dataEl = null;

searchBtn.addEventListener('click', async () => {
  loading = true;
  let inputValue = document.querySelector('.inputDic');
  let loadingEls = document.createElement('div');
  loadingEls.innerHTML = "Loading.. and get the data";
  loadingEls.classList.add('loading');
  dictionary__app.appendChild(loadingEls);
  try{
    let res = await fetch(dictionaryAPI + inputValue.value);
    let resJson = await res.json();
    loading = false;
    createFunc(resJson);
    setTimeout(() => {
      loadingEls.style.display= "none";
      loadingEls.remove();
    },300);
    inputValue.value = "";
  }catch(err){  
    errorHandling = true;
    console.error(err);
  }
});
function createFunc(data){
  if(data.length){
    console.log(data);
    dataEl = data;
    resultDictionary.innerHTML= `
   <div class="titleAudio">
       <h1 class="titleDictionary">${data[0].word.toUpperCase()}</h1>
      <button class="btnAudio" onclick="playMusic()" type="button"><img src="../assets/sound-off-music-mute-off-sound-speaker-volume-icon-16.png"></img></button>
   </div>
      <div class="textMeanings">
        <p>${data[0].phonetic}</p><p>${data[0].phonetics[0].text}</p>
      </div>
    <div class="meaningText">
      <p>${data[0].meanings[0].definitions[0].definition}</p>
    </div>
    `
  }else{
    resultDictionary.innerHTML = `<h1>Sorry,your finding is not on the API.</h1>`
  }
}

function playMusic(){
  audio.src = `${dataEl[0].phonetics[0].audio === false ? dataEl[0].phonetics[1].audio : dataEl[0].phonetics[0].audio }`
  audio.play();
}