import * as filter from "./filter.js";
import { globalCreate } from "./globalCreate.js";

let DOMSelectors = {
  container: document.getElementById("container"),
};
let data = [];
let paginationData = [];
let _imgSyncBuffer = [];
const imgBuffer = new Promise((resolve) => {
  try {
    if (_imgSyncBuffer.length === DOMSelectors.container.childElementCount) {
      resolve(_imgSyncBuffer);
    }
  } catch (err) {}
});

export async function getCats() {
  try {
  let api_url = `https://cataas.com/api/cats?limit=1114`;
  let response = await fetch(api_url);
  paginationData = data = await response.json();
  }
  catch (error) {
    alert("Error caught: check console");
    console.error(error);
  }
  await filter.getTags(data);
}

export async function makeCatsHTML(numCats) {
  DOMSelectors.container.className = "basic";
  DOMSelectors.container.textContent = "";
  for (let i = 0; i < numCats; i++) {
    let id = getRandom(data, numCats)[i]._id;
    globalCreate(id);
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
  let randomPaginationData = getRandom(paginationData, paginationData.length);
  DOMSelectors.container.className = "basic";
  let len = 12;
  if (randomPaginationData.length < 12) {
    len = randomPaginationData.length;
  } else {
    len = 12;
  }
  for (let i = 0; i < len; i++) {
    globalCreate(randomPaginationData[i]._id);
  }
  for (let i = 0; i < 12; i++) {
    randomPaginationData.shift();
  }
}
