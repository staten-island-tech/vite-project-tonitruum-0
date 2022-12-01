export async function getqTags(data) {
  let result = "";
  let result1 = [];
  data.forEach((d) => {
    result = data.map((d) => d.tags);
  });
  let i = 0;
  data.forEach((d) => {
    if (d.tags.includes("cute") === true) {
      result1.push(d._id);
    }
  });
  console.log(result1);
}

function filterTags(data) {}


/* for each tag -> for each thing in data check if d.tags includs (tag value)
if === true then console.log (tag) */

export async function getTags(data) {
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
  makeButtonHtml(arr);
}

function makeButtonHtml(arr){
  for (let i = 0; i < arr.length; i++){
    document.getElementById("buttonContainer").insertAdjacentHTML("beforeend", `<button class="tag" id="${arr[i]}" value="${arr[i][0]}">${arr[i][0]}</button>`);
  }
}