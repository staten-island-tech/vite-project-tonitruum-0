import "../css/style.css";
import * as api from "./api.js";
import * as filter from "./filter.js";

let DOMSelectors = {
  container: document.getElementById("container"),
};

await api.getCats();
await api.makeCatsHTML(12);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.getElementById("num");
  let numCats = input.value;
  input.value = "";
  api.makeCatsHTML(numCats);
});

window.onscroll = function() {
  if ((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight)) {
    display();
  }
}

function display() {
  let tag = DOMSelectors.container.className;
  if (tag != "basic"){
    filter.paginatedCats(tag);
  }
  else {
    api.paginatedCats();
  }
}