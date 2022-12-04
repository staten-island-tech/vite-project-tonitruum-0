import * as filter from "./filter.js";

let DOMSelectors = {
  container: document.getElementById("container"),
};
let data = [];
let paginatedData = [];
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
  paginatedData = data = await response.json();
  await filter.getTags(data);
}

export async function makeCatsHTML(numCats) {
  DOMSelectors.container.className = "basic";
  DOMSelectors.container.textContent = "";
  for (let i = 0; i < numCats; i++) {
    let id = getRandom(data, numCats)[i]._id;

    const img = new Image();
    const div = document.createElement("div");
    DOMSelectors.container.appendChild(div);
    div.style.visibility = "hidden";
    img.onload = () => { div.style.visibility = "visible"; }
    div.classList.add("card");
    div.appendChild(img);
    img.src = `https://cataas.com/cat/${id}`;
    img.classList.add("cats");
  }
  return imgBuffer;
}
function getRandom(arr, n) {
  let result = new Array(n);
  let len = arr.length;
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

export function paginatedCats() {
  console.log(paginatedData);
  DOMSelectors.container.className = "basic";
  let len = 12;
  if (paginatedData.length < 12) {
    len = paginatedData.length;
  } else {
    len = 12;
  }
  for (let i = 0; i < len; i++) {
    const img = new Image();
    const div = document.createElement("div");
    DOMSelectors.container.appendChild(div);
    img.src = `https://cataas.com/cat/${paginatedData[i]._id}`;
    div.classList.add("card");
    div.style.visibility = "hidden";
    img.onload = () => { div.style.visibility = "visible"; }
    div.appendChild(img);
    img.classList.add("cats");
  }
  for (let i = 0; i < 12; i++) {
    paginatedData.shift();
  }
}
