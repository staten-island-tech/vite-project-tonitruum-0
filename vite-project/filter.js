let selectors = {
  container: document.getElementById("container"),
};
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
      if (d.tags.includes(t) === true) {
        num++;
      }
    });
    if (num > 10) {
      tagArr.push([t, num]);
    }
  });
  await bubbleSort(tagArr);
}

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr.length - i - 1; k++) {
      if (arr[k][1] < arr[k + 1][1]) {
        let temp = arr[k];
        arr[k] = arr[k + 1];
        arr[k + 1] = temp;
      }
    }
  }
  await makeButtonHtml(arr);
}

async function makeButtonHtml(arr) {
  for (let i = 0; i < arr.length; i++) {
    document
      .getElementById("buttonContainer")
      .insertAdjacentHTML(
        "beforeend",
        `<button class="tag" id="${arr[i][0]}" value="${arr[i][0]} - ${arr[i][1]}">${arr[i][0]}</button>`
      );
  }
  clickHandler();
}

function clickHandler() {
  document.querySelectorAll(".tag").forEach((t) => {
    t.addEventListener("click", getFilteredCats);
  });
}

function getFilteredCats(idTag) {
  idTag = this.id;
  selectors.container.textContent = "";
  let i = 0;
  api.forEach((cat) => {
    if (cat.tags.includes(idTag)) {
      const img = new Image();
      img.load(`https://cataas.com/cat/${cat._id}`);

      const div = document.createElement("div");
      selectors.container.appendChild(div);
      div.classList.add("card");
      div.appendChild(img);

      div.appendChild(document.createElement("p"));
      img.classList.add("cats");
    }
  });
}

Image.prototype.load = function (url) {
  var thisImg = this;
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open("GET", url, true);
  xmlHTTP.responseType = "arraybuffer";
  xmlHTTP.onload = function (e) {
    var blob = new Blob([this.response]);
    thisImg.src = window.URL.createObjectURL(blob);
  };
  xmlHTTP.onprogress = function (e) {
    thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
    if (thisImg.completedPercentage.prevValue !== thisImg.completedPercentage) {
      progressBar(thisImg, thisImg.completedPercentage);
    }
  };
  xmlHTTP.onloadstart = function () {
    thisImg.completedPercentage = 0;
    progressBar(thisImg, thisImg.completedPercentage);
  };
  xmlHTTP.send();
};

export {};

Image.prototype.completedPercentage = 0;

function progressBar(img, percent) {
  img.nextSibling.innerHTML = percent;
}
