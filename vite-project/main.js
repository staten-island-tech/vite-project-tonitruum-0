import "./style.css";
import * as api from "./api.js";

let DOMSelectors = {
    container: document.getElementById('container'),
}
// runs function once initially to display 10 cats
await api.getCats(10);
await api.makeHtml(10);
await api.makeCats();

form.addEventListener("submit", function (e) {
    let numCats = 0;
    // prevents reload
    e.preventDefault();
    // input field
    let input = document.getElementById('num');
    // sets the number of cats user wants displayed
    numCats = input.value;
    console.log(input.value);
    // clears form
    input.value = "";
    // gets cat data from api
    api.getCats(numCats);
    api.makeCats(numCats);
});