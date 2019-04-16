 var dlugosciSlow = new Map();
 
 
 function wykonaj()
{
    do
    {
        var n = window.prompt("podaj szukaną długość wyrazu");
    } while(isNaN(n) || n == "");
    var intN = parseInt(n);

    var wyraz = window.prompt("podaj szukany wyraz");

    var text = document.forms[0].text.value;
    var splitToWords = text.split(/\s/);
    var splitToLines = text.split("\n");
    
    var ilosc = 0;
    for(var i=0; i<splitToWords.length; i++)
    {
        if (splitToWords[i].length == intN)
        {
            ilosc++;
        }
    }
    
    //dodanie do mapy
    var nowaIlosc = ilosc;
    if (dlugosciSlow.has(intN))
    {
        nowaIlosc += dlugosciSlow.get(intN);
    }
    if (nowaIlosc > 0) dlugosciSlow.set(intN, nowaIlosc);

    var regex = "( |^)" + wyraz + "( |$)";

    for(var i=0; i<splitToLines.length; i++)
    {
        if (splitToLines[i].match(regex))
        {
            console.log("numer lini: " + (i+1));
        }
    }
}

function printMap()
{
    dlugosciSlow.forEach( function(value, key){
        console.log("klucz: " + key + " watosc: " + value);
    })
}