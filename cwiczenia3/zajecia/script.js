var DX = parseInt(Math.random() * 1000);
var width = parseInt(document.body.clientWidth);
var isClickStop = new Map();
var animations = new Map();

function move(element, x, isAnimation){
    var currentX = element.offsetLeft;

    //checking if the item will leave the screen
    if ( (currentX + element.offsetWidth + x) >= width )
    {
        animations.set(element, null);
        setTimeout(function(){ isClickStop.set(element, false) }, 200);
        return;
    }

    //checking if the elemnt reached DX
    if ( isAnimation )
    {
        var nextAnimation = true;
        var dx = DX + 8;
        while (dx < width)
        {
            if (dx == (currentX + 1))
            {
                setTimeout(function(){ isClickStop.set(element, false) }, 200);
                animations.set(element, null);
                nextAnimation = false;
            }
            dx += DX;
        }
    }

    nextX = currentX + x - 8;
    var newLeft = nextX + "px";
    element.style.left = newLeft;

    if (isAnimation && nextAnimation) 
    {
        animations.set(element, requestAnimationFrame( function() { move(element, 1, true) })); 
    }
}

function click(element)
{
    if (isClickStop.get(element)) return;
    else move(element, DX, false)
}

function dblclick(element)
{
    isClickStop.set(element, true);

    if (animations.get(element) != null)
    {
        setTimeout(function(){ isClickStop.set(element, false) }, 200);
        cancelAnimationFrame(animations.get(element));
        animations.set(element, null);
        return;
    }

    animations.set(element, requestAnimationFrame( function() { move(element, 1, true) }));
}

function addEventListenersToElement(element)
{
    element.addEventListener('click', function() { setTimeout(function() { click(element) }, 200) });
    element.addEventListener('dblclick', function() { dblclick(element) });
}

function setMoveableElements()
{
    var elements = document.getElementsByClassName("Moveable");
    for (i = 0, length = elements.length; i < length; i++ )
    {
        addEventListenersToElement(elements[i]);
        animations.set(elements[i], null);
        isClickStop.set(elements[i], false);
    }
}