var http = require("http");
var url = require("url");
var fs = require("fs");
 
 
http.createServer(function(request, response) 
{
    console.log("--------------------------------------")
    console.log("The relative URL of the current request: "+request.url+"\n")
    var url_parts = url.parse(request.url,true);
 
    if(url_parts.pathname == '/submit')
    {
        var path=url_parts.query['name'];
        var lineAndMode = url_parts.query['mode'];
 
        var line = parseInt(lineAndMode.split('|')[0]);
        var mode = lineAndMode.split('|')[1]; //mode: D to delete, M to merge
 
        if(mode != "M" && mode != "D"){
            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
            response.write("Invalid mode. Mode must be D (delete) or M (merge).");
            response.end();
        }
        else {
            fs.open(path, 'rs+', (err, fd) => 
            {
                if(err){
                    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                    response.write("No such file");
                    response.end();
                }
                else {
                    fs.readFile(path, (err, data) => 
                    {
                        var lines = data.toString().split('\n');
                        var numOfLines = lines.length - 1;
                        console.log(numOfLines);
                        if(numOfLines < line || ( numOfLines == line && mode=="M"))
                        {
                            response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                            response.write("Line number is out of bound.");
                            response.end();
                        }
                        else 
                        {
                            if (mode == "D") line--;
                            if (mode == "M") lines[line-1] += " " + lines[line];

                            var result = "";
                            for(var i=0; i<numOfLines; i++)
                                if ( i != parseInt(line) ) result += lines[i] + '\n';

                            fs.writeFile(path, result, () => 
                            {
                                response.write(result);
                                response.end();
                            });
                        }
                    })
                }
            })
        }
    }
    else //Generating the form
    {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="name">Enter path </label>');
        response.write('<input name="name">');
        response.write('<br>');
        response.write('<label for="mode">Enter line number and mode &lt;line&gt; | &lt;mode&gt; </label>');
        response.write('<input name="mode">');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('<input type="reset">');
        response.write('</form>');
        response.end();  
    }
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");