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
    img.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgflip.com%2F2%2F103rdm.jpg&f=1&nofb=1&ipt=1c1a329e8198cf4984d403da79c9a3cca32e59dffa032c0d80c2edb1505e7f6a&ipo=images';
    const div = document.createElement("div");
    DOMSelectors.container.appendChild(div);
    div.classList.add('card');
    div.appendChild(img);


    img.onload = () => { 
    img.src = `https://cataas.com/cat/${id}`;
    div.appendChild(img);
  }
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