 var words = new Map();
 var colors = ['blue', 'red', 'green', 'gold', 'grey', 'blueviolet', 'coral', 'darkgreen', 'firebrick', 'lightskyblue']
 
 
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
    console.log("liczba znalezionych wyrazow " + ilosc);
    
    //dodanie do mapy
    var nowaIlosc = ilosc;
    if (words.has(intN))
    {
        nowaIlosc += words.get(intN);
    }
    if (nowaIlosc > 0) words.set(intN, nowaIlosc);

    //wyszukiwanie slow
    var regex = "( |^)" + wyraz + "( |$)";

    for(var i=0; i<splitToLines.length; i++)
    {
        if (splitToLines[i].match(regex))
        {
            console.log("numer lini: " + (i+1));
        }
    }
    printMap();
}

function printMap()
{
    words.forEach( function(value, key){
        console.log("klucz: " + key + " watosc: " + value);
    })
    printChart();
}

function printPost(ctx, x, y, width, height, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.stroke();
}

function printChart()
{
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    var numOfPosts = words.size;
    var numOfAllWords = 0;
    words.forEach( function(value, key){
        numOfAllWords += value;
    });

    var heightUnit = 300 / numOfAllWords;
    var widthUnit = 300 / numOfPosts;
    var startPosition = 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var legend = document.getElementById("legend");
    legend.innerHTML = "Legenda: ";

    var i = 0;
    words.forEach( function(value, key){

        printPost(ctx, startPosition, 400-value*heightUnit, widthUnit, value*heightUnit, colors[i]);
        legend.innerHTML += "<br/><span style=\"color: " + colors[i] + "\">Liczba słow o dlugości " + key + ": " + value + "</span>";
        startPosition += widthUnit;
        i++;
        i = i % 10;
    });
}