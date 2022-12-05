import "../css/style.css";
import * as api from "./api.js";
import * as filter from "./filter.js";

let DOMSelectors = {
  container: document.getElementById("container"),
};

await api.getCats();
await api.makeCatsHTML(12);
cssClickHandler();

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
    console.log(window.innerHeight, window.pageYOffset, document.body.offsetHeight, (window.innerHeight + window.pageYOffset));
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

function cssClickHandler() {
  document.querySelectorAll(".css").forEach((c) => {
    c.addEventListener("click", changeTheme)})
};

function changeTheme() {
    if (this.id === "light"){
        document.documentElement.style.setProperty('--htmlColor', '#9c9c9c')
        document.documentElement.style.setProperty('--cardColor', 'rgba(224, 224, 224, 0.75)')
      }
      else {
      document.documentElement.style.setProperty('--htmlColor', '#252525')
      document.documentElement.style.setProperty('--cardColor', 'rgba(0, 0, 0, 0.75)')
    }
}