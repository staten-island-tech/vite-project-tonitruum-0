let data = [];
let html = "";

let DOMSelectors = {
  container: document.getElementById('container'),
}

export async function getCats() {
  let api_url = `https://cataas.com/api/cats?limit=1114`
  let response = await fetch(api_url);
  data = await response.json();
  console.log(response);
/*   document.getElementById('container').innerHTML = "";
 */}



export async function makeHtml(numCats) {
  for (let i = 0; i < numCats; i++) {
    let id = getRandom(data, numCats)[i]._id;
    console.log(id);
    html += `<img src='https://cataas.com/cat/${id}' id='cat${i+1}'>`
  }
}

export async function makeCats(numCats) {
    DOMSelectors.container.innerHTML = html;
    html = "";
  }
//https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded

function getRandom(arr, n) {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}