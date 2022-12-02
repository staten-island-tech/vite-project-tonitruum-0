import "./style.css";
import * as api from "./api.js";

let DOMSelectors = {
  container: document.getElementById("container"),
};

await api.getCats();
await api.makeCatsHTML(10);

form.addEventListener("submit", function (e) {
  let numCats = 0;
  e.preventDefault();
  let input = document.getElementById("num");
  numCats = input.value;
  input.value = "";
  api.makeHtml(numCats);
  api.makeCats();
});

