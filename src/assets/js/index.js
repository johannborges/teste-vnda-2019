var menuOpen = false;

function toggleMenu(){
    var menu = document.getElementById("floating_menu");

    if(!menuOpen)
        menu.className = "open";
    else
        menu.className = "";

    menuOpen = !menuOpen;
}