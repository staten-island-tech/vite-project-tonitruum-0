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

window.onscroll = function () {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    display();
    console.log(
      window.innerHeight,
      window.pageYOffset,
      document.body.offsetHeight,
      window.innerHeight + window.pageYOffset
    );
  }
};

function display() {
  let tag = DOMSelectors.container.className;
  if (tag != "basic") {
    filter.paginatedCats(tag);
  } else {
    api.paginatedCats();
  }
}

document.querySelectorAll(".css").forEach((c) => {
  c.addEventListener("click", changeTheme);
});


let root = document.documentElement.style;
function changeTheme() {
  if (this.id === "light") {
    root.setProperty("--htmlColor", "#9c9c9c");
    root.setProperty("--cardColor", "rgba(224, 224, 224, 0.75)");
    root.setProperty("--textColor", "black");
  } else {
    root.setProperty("--htmlColor", "#252525");
    root.setProperty("--cardColor", "rgba(0, 0, 0, 0.75)");
    root.setProperty("--textColor", "white");
  }
}
