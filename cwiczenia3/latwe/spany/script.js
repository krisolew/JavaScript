var div = document.getElementById("spanDiv");
var num;

function run()
{
    createSpans();
    setInterval(startCountingDown, 1000);
}

function createSpans()
{
    num = document.getElementById("input").value;
    num = parseInt(num);

    for (var i = 0; i<100; i++){
        var span = document.createElement("span");
        var br = document.createElement("br");
        
        span.textContent = num;
        div.appendChild(span);
        div.appendChild(br);
    }
}

function startCountingDown()
{
    var spnasList = document.querySelectorAll("span");

    num--;  
    spnasList.forEach(function(item){
        if (num >= 0)
            item.textContent = num;
    });
    if (num==0)
        document.getElementById("input").value = num;
}