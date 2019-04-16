"use strict"
var currentNumber = 0;

function check(){
    var promptContent = window.prompt("podaj ciąg znaków");
    var container = document.getElementById("container");

    if ( promptContent != null){
        var sumOfDigits = digits(promptContent);
        var numOfLetters = letters(promptContent);
        currentNumber += sum(promptContent);

        var div = "<div class=\"result\">\t"+sumOfDigits+"\t"+numOfLetters+"\t"+currentNumber+"\tdla napisu: "+promptContent+"</div>";
        container.innerHTML += div;
    }
    else
    {
        document.getElementById("buttonDiv").innerHTML="";
    }
}

function digits(napis)
{
    const reg = /\d/;
    var sum = 0;

    for(var i=0; i<napis.length; i++)
    {
        if ( napis[i].match(reg) )
        {
            sum+=parseInt(napis[i]);
        }
    }
    return sum;
}

function letters(napis)
{
    const reg = /[a-zA-Z]/;
    var numOfLetters = 0;

    for(var i=0; i<napis.length; i++)
    {
        if ( napis[i].match(reg) )
        {
            numOfLetters++;
        }
    }
    return numOfLetters;
}

function sum(napis)
{
    const reg = /\d/;
    var sum = 0;
    var i = 0;
    var number = "";

    while ( i < napis.length && napis[i].match(reg) )
    {
        number += napis[i];
        i++;
    }

    if (number != "")
    {
        var finalNumber = parseInt(number);
        return finalNumber;
    }
    return 0;
}