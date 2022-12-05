let DOMSelectors = {
  container: document.getElementById("container"),
};
let tagArr = [];
let api = [];

export async function getTags(data) {
  api = data;
  let tag = [];
  let tagArr = [];
  let api_url = `https://cataas.com/api/tags`;
  let response = await fetch(api_url);
  tag = await response.json();
  tag.forEach((t) => {
    let num = 0;
    data.forEach((d) => {
      if (d.tags.includes(t) === true){
        num++
      }
    });
    if (num > 10){
      tagArr.push([t, num]);
    }
  });  
  await bubbleSort(tagArr);
}

async function bubbleSort(arr){
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < (arr.length - i - 1); k++){
      if (arr[k][1] < arr[k+1][1]){
        let temp = arr[k];
        arr[k] = arr[k + 1];
        arr[k+1] = temp;
      }
    }
  }
  await makeButtonHtml(arr);
}

async function makeButtonHtml(arr){
  for (let i = 0; i < arr.length; i++){
    document.getElementById("buttonContainer").insertAdjacentHTML("beforeend", `<button class="tag" id="${arr[i][0]}" value="${arr[i][0]} - ${arr[i][1]}">${arr[i][0]} - ${arr[i][1]}</button>`);
  }
  clickHandler();
}

function clickHandler(){
  document.querySelectorAll(".tag").forEach((t) => {
    t.addEventListener("click", getFilteredCats)
  })
}


export function getFilteredCats(){
  let idTag = this.id;
  DOMSelectors.container.textContent = "";
  DOMSelectors.container.className = idTag;
  let i = 0;
  api.forEach((cat) => {
    if (cat.tags.includes(idTag)){
      tagArr.push(cat._id);
    }
  })
  api.forEach((cat) => {
    if (cat.tags.includes(idTag) && i < 12){
    i++;
    const img = new Image();
    const div = document.createElement("div");
    DOMSelectors.container.appendChild(div);
    div.appendChild(img)
    div.style.visibility = "hidden";
    img.onload = () => { div.style.visibility = "visible"; }
    img.src = `https://cataas.com/cat/${cat._id}`;
    div.classList.add('card');
    img.classList.add('cats');
  }
})
for (let i = 0; i < 12; i++){
  tagArr.shift();
}
}

export function paginatedCats(idTag){
  DOMSelectors.container.className = idTag;
  let len = 12;
  if (tagArr.length < 12){
    len = tagArr.length
  }
  else {
    len = 12;
  }
  for (let i = 0; i < len; i++){
      const img = new Image();
      const div = document.createElement("div");
      DOMSelectors.container.appendChild(div);
      div.appendChild(img)
      div.style.visibility = "hidden";
      img.onload = () => { div.style.visibility = "visible"; }
      img.src = `https://cataas.com/cat/${tagArr[i]}`;
      div.classList.add('card');
      img.classList.add('cats');  
    }
    for (let i = 0; i < 12; i++){
      tagArr.shift();
    }
  }