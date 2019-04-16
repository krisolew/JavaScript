var aside = document.getElementsByTagName("aside")[0];
var footer = document.getElementsByTagName("footer")[0];
var azure = document.getElementsByClassName("azure");
var main = document.getElementsByTagName("main")[0];
var nav = document.getElementsByTagName("nav")[0];

function set()
{
    aside.style.float = "left";
    aside.style.position = "absolute";
    aside.style.right = "9px";
    aside.style.width = "50%";
    
    footer.style.margin = "20px 0 0 0";
    footer.style.position = "absolute";
    footer.style.width = "98%";
    footer.style.marginBottom = "10px";
    
    main.style.margin = "120px 0 0 0";
    main.style.width = "40%";
    main.style.minWidth = "390px";
    main.style.clear = "both";
    
    nav.style.height = "auto";
    nav.style.width = "12%";
    nav.style.minWidth = "110px";
    nav.style.float = "left";
    
    for (var i=0; i<azure.length; i++)
    {
        azure[i].style.backgroundColor = "#EFF";
        azure[i].style.border = "1px solid #000000";
        azure[i].style.boxShadow = "0px 0px 5px #000000";
        azure[i].style.padding = "5px";
    }
}

function remove()
{
    aside.style = "none";
    footer.style = "none";
    main.style = "none";
    nav.style = "none"; 
    for (var i=0; i<azure.length; i++)
    {
        azure[i].style = "none";
    }
}