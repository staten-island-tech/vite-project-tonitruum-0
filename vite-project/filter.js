let selectors = {
  container: document.getElementById("container"),
}
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
    document.getElementById("buttonContainer").insertAdjacentHTML("beforeend", `<button class="tag" id="${arr[i][0]}" value="${arr[i][0]} - ${arr[i][1]}">${arr[i][0]}</button>`);
  }
  clickHandler();
}

function clickHandler(){
  document.querySelectorAll(".tag").forEach((t) => {
    t.addEventListener("click", getID)
  })
}

function getID(){
  getFilteredCats(this.id);
}

function getFilteredCats(idTag){
  selectors.container.textContent = "";
  let i = 0;
  api.forEach((cat) => {
    if (cat.tags.includes(idTag)){
      selectors.container.insertAdjacentHTML("beforeend", `<img src='https://cataas.com/cat/${cat._id}' id='cat${i + 1}' class='cats'>`)
      i++;
    }
  })
}



