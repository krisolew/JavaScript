var http = require("http");
var url = require("url");
var fs = require("fs");
 
 
http.createServer(function(request, response) {
 
    console.log("--------------------------------------")
    console.log("The relative URL of the current request: "+request.url+"\n")
    var url_parts = url.parse(request.url,true);
 
    if(url_parts.pathname == '/submit') {
        var path=url_parts.query['name'];
        var lineAndMode = url_parts.query['mode'];
 
        var line = parseInt(lineAndMode.split(':')[0]);
        var mode = parseInt(lineAndMode.split(':')[1]); //mode: 0 to delete, 1 to merge
 
        if(mode != 1 && mode != 0){
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
            response.write("Invalid mode. Mode must be 0 or 1.")
            response.end();
        }
        else {
            fs.open(path, 'rs+', (err, fd) => {
                if(err){
                    response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
                    response.end();
                    throw err;
                }
                else {
                    fs.readFile(path, (err, data) => {
                        var arr = data.toString().split('\n');
                        if(arr.length <= line){
                            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                            response.write("Line number is out of bound.")
                            response.end();
                        }
                        else {
                            if(mode == 0){
                                arr[line] = arr[line].replace(/(\r\n|\n|\r)/gm, " ");
                                arr[line] = "";
                            }
                            else if(mode == 1){
                                arr[line] = arr[line].replace(/(\r\n|\n|\r)/gm, " ");
                            }
                            for(var i of arr){
                                response.write(i);
                            }
                            response.end();
                        }
                    })
                }
            })
        }
    }
    else { //Generating the form
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="name">Enter path </label>');
        response.write('<input name="name">');
        response.write('<br>');
        response.write('<label for="mode">Enter line number and mode &lt;line&gt; : &lt;mode&gt; </label>');
        response.write('<input name="mode">');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('<input type="reset">');
        response.write('</form>');
        response.end();  
    }
}).listen(9090);
console.log("The server was started on port 9090");
console.log("To end the server, press 'CTRL + C'");