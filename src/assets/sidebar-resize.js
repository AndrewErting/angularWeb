const barWidth =  400;
const barHeight = document.querySelector("#sideBar");

window.addEventListener("resize", resizeSidebar);

function resizeSidebar() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    barHeight.getAttribute.height = height;
}