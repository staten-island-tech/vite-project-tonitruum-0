let data = [];
let html = "";

let DOMSelectors = {
  container: document.getElementById('container'),
}

export async function getCats(numCats) {
  let api_url = `https://cataas.com/api/cats?limit=${numCats}`
  let response = await fetch(api_url);
  data = await response.json();
  console.log(data[1]._id);
/*   document.getElementById('container').innerHTML = "";
 */}

console.log(data);

export async function makeHtml(numCats) {
  for (let i = 0; i < numCats; i++) {
    let id = data[i]._id;
    html += `<img src='https://cataas.com/cat/${id}' id='cat${i+1}'>`
  }
}

export async function makeCats() {
  alert(html);
    DOMSelectors.container.innerHTML = html;
    html = "";
}

//https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded