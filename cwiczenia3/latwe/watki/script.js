var prevInterval = performance.now();
var prevTimeout = performance.now();
var prevRequest = performance.now();
var intervalID;
var timeoutID;
var requestID;
var result;

function count()
{
    return fib(40);
}

function fib(n)
{
    if (n==2 || n==1) return 1;
    return fib(n-1) + fib(n-2);
}

function funInterval()
{
    var nextInterval = performance.now();
    var a = count();
    var interval = document.getElementById("interval");
    interval.innerHTML += "<br>Wynik obliczeń: " + a + " Time: " + (nextInterval - prevInterval) + " ms";
    prevInterval = nextInterval;
}

function funTimeout()
{
    var nextTimeout = performance.now();
    var a = count();
    var timeout = document.getElementById("timeout");
    timeout.innerHTML += "<br>Wynik obliczeń: " + a + " Time: " + (nextTimeout - prevTimeout) + " ms";
    prevTimeout = nextTimeout;
    timeoutID = setTimeout(funTimeout, 2000);
}

function funRequest()
{
    var nextRequest = performance.now();
    var a = count();
    var request = document.getElementById("request");
    var frequency = parseInt(1000 / (nextRequest - prevRequest));
    request.innerHTML += "<br>Wynik obliczeń: " + a + " Frequency: " + frequency + " fps";
    prevRequest = nextRequest;
    requestID = requestAnimationFrame(funRequest);
}

function run()
{
    intervalID = setInterval(funInterval, 1000);
    timeoutID = setTimeout(funTimeout, 2000);
    requestID = requestAnimationFrame(funRequest);
}

function end()
{
    clearInterval(intervalID);
    clearTimeout(timeoutID);
    cancelAnimationFrame(requestID);
}