let DOMSelectors = {
    container: document.getElementById("container"),
}

export function globalCreate(idIdentifier) {
    const img = new Image();
    const p = document.createElement("p");
    
    const div = document.createElement("div");
    DOMSelectors.container.appendChild(div);
    div.classList.add("card");

    div.appendChild(p);
    p.textContent = "L";
    p.classList.add("loading");

    img.src = `https://cataas.com/cat/${idIdentifier}`;

    img.onload = () => { 
    div.appendChild(img);
    p.remove();
}
    img.classList.add("cats");
}