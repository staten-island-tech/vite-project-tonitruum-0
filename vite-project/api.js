import * as filter from "./filter.js"

let DOMSelectors = {
  container: document.getElementById("container"),
};
let data = [];
let _imgSyncBuffer = [];
const imgBuffer = new Promise((resolve) => {
  try {
    if (_imgSyncBuffer.length === DOMSelectors.container.childElementCount) {
      resolve(_imgSyncBuffer); 
    }
  } catch (err) {}
});


export async function getCats() {
  let api_url = `https://cataas.com/api/cats?limit=1114`;
  let response = await fetch(api_url);
  data = await response.json();
  await filter.getTags(data);
}

export async function makeCatsHTML(numCats) {
  DOMSelectors.container.textContent = "";
  for (let i = 0; i < numCats; i++) {
    let id = getRandom(data, numCats)[i]._id;

    const img = new Image();
/*     img.src = 'https://ak.picdn.net/shutterstock/videos/1012114871/thumb/1.jpg';
 */
img.load(`https://cataas.com/cat/${id}`);
    const div = document.createElement("div");
    DOMSelectors.container.appendChild(div);
    div.classList.add('card');
    div.appendChild(img);


    //img.onload = () => { img.src = `https://cataas.com/cat/${id}`; }
    img.classList.add('cats');
  };
return imgBuffer;
}
function getRandom(arr, n) {
  let result = new Array(n);
  let len = arr.length
  let taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

/* 
Image.prototype.load = function(url){
  var thisImg = this;
  console.log(thisImg);
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url,true);
  xmlHTTP.responseType = 'arraybuffer';
  xmlHTTP.onload = function(e) {
      var blob = new Blob([this.response]);
      thisImg.src = window.URL.createObjectURL(blob);
    };
  xmlHTTP.onprogress = function(e) {
      thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
      progressBar(thisImg, thisImg.completedPercentage);
  };
  xmlHTTP.onloadstart = function() {
      thisImg.completedPercentage = 0;
  };
  xmlHTTP.send();
  
};

Image.prototype.completedPercentage = 0;

function progressBar (img, percent) {
  img.insertAdjacentHTML("afterend", percent);
} */