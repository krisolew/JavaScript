var onePlayerCheckbox = document.getElementById("one");
var twoPlayersCheckbox = document.getElementById("two");
var firstNick = document.getElementById("firstNick");
var secondNick = document.getElementById("secondNick");

function onePlayerChoosed()
{
    if (onePlayerCheckbox.checked == true)
    {
        secondNick.style.visibility = "hidden";
        twoPlayersCheckbox.checked = false;
    }
    else
    {
        secondNick.style.visibility = "visible";
        twoPlayersCheckbox.checked = true;
    }
}

function twoPlayersChoosed()
{
    if (twoPlayersCheckbox.checked == true)
    {
        secondNick.style.visibility = "visible";
        onePlayerCheckbox.checked = false;
    }
    else
    {
        secondNick.style.visibility = "hidden";
        onePlayerCheckbox.checked = true;
    }
}

function run()
{
    var nick1 = firstNick.value
    var nick2 = secondNick.value;
    sessionStorage.setItem("nick1", nick1);
    sessionStorage.setItem("nick2", nick2);
    if (onePlayerCheckbox.checked == true )
        sessionStorage.setItem("numOfPlayers", 1);
    else 
        sessionStorage.setItem("numOfPlayers", 2);
        
    window.location.href = "game.html";
}