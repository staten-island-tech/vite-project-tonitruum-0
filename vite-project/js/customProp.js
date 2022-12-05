function clickHandler() {
  document.querySelectorAll(".css").forEach((c) => {
    t.addEventListener("click", changeTheme)})
};

function changeTheme() {
    if (this.id === "light"){
        document.documentElement.style.setProperty('--htmlColor', '#9c9c9c')
        document.documentElement.style.setProperty('--cardColor', 'rgba(224, 224, 224, 0.75)')
    }
}