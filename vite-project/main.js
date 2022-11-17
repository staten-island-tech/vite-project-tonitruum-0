import "./style.css";
import * as api from "./api.js";

let DOMSelectors = {
  container: document.getElementById("container"),
};

await api.getCats();
await api.makeHtml(10);
await api.makeCats(10);

Promise.all(
  Array.from(document.images)
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        })
    )
).then(() => {
  console.log("images finished loading");
});

form.addEventListener("submit", function (e) {
  let numCats = 0;
  e.preventDefault();
  let input = document.getElementById("num");
  numCats = input.value;
  input.value = "";
  api.makeHtml(numCats);
  api.makeCats();
});
