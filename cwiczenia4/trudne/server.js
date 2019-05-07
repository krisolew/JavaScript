var http = require("http");
var url = require("url");
const fs = require('fs');
const Promise = require('bluebird');
const AppDAO = require('./dao');
const SubjectsRepository = require('./repositories/SubjectsRepository');  
const StudentsRepository = require('./repositories/StudentsRepository');
const TeachersRepository = require('./repositories/TeachersRepository');
const MarksRepository = require('./repositories/MarksRepository');
const ParticipationsRepository = require('./repositories/ParticipationsRepository');

const dao = new AppDAO('./database.sqlite3');
const SubjectRepo = new SubjectsRepository(dao);
const StudentsRepo = new StudentsRepository(dao);
const TeachersRepo = new TeachersRepository(dao);
const MarksRepo = new MarksRepository(dao);
const ParticipationsRepo = new ParticipationsRepository(dao);
 
http.createServer(function(request, response) {
    /*
      ,,request'' - input stream - contains data received from the browser, e.g. encoded contents of HTML form fields
       
      ,,response'' - output stream - put in it data that you want to send back to the browser.
         The answer sent by this stream must consist of two parts: the header and the body.
         The header contains, among others, information about the type (MIME) of data contained in the body.
         The body contains the correct data, e.g. a form definition.
 
    */
    
    var url_parts = url.parse(request.url,true); //parsing (relative) URL
     
    if(url_parts.pathname == '/submit') { //Processing the form content, if the relative URL is '/ submit'
        var command=url_parts.query['command']; //Read the contents of the field (form) named 'path'
        
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});  //Creating an answer header - we inform the browser that the body of the answer will be plain text
        
        var type = command.split('|')[0];
        var firstParam = command.split('|')[1];
   

        switch(type){
            case "print":
                console.log("print");
                switch(firstParam){
                    case "ls":
                        console.log("lista studentow")
                        var secondParam = command.split('|')[2];
                        break;
                    case "lo":
                        console.log("lista ocen");
                        var secondParam = command.split('|')[2];
                        break;
                    case "students":
                        StudentsRepo.getAll()
                        .then((data) => console.log(data))
                        break;
                    case "teachers":
                        var dane
                        TeachersRepo.getAll()
                        .then((data) => console.log(data))
                        break;
                    case "marks":
                        MarksRepo.getAll()
                        .then((data) => console.log(data))
                        break;
                    case "subjects":
                        SubjectRepo.getAll()
                        .then((data) => response.write(data))
                        break;
                    case "participations":
                        ParticipationsRepo.getAll()
                        .then((data) => console.log(data))
                        break;
                }
                break;
            case "insert":
                console.log("insert");
                var secondParam = command.split('|')[2];
                switch (firstParam){
                    case "students":
                        console.log("lista ocen");
                        break;
                    case "teachers":
                        console.log("lista ocen");
                        break;
                    case "marks":
                        console.log("lista ocen");
                        break;
                    case "subjects":
                        console.log("lista ocen");
                        break;
                    case "participations":
                        console.log("lista ocen");
                        break;
                }
                break;
            case "delete":
                console.log("delete");
                var secondParam = command.split('|')[2];
                switch(firstParam){
                    case "students":
                        StudentsRepo.delete(secondParam);
                        break;
                    case "teachers":
                        TeachersRepo.delete(secondParam);
                        break;
                    case "marks":
                        MarksRepo.delete(secondParam);
                        break;
                    case "subjects":
                        SubjectsRepo.delete(secondParam);
                        break;
                    case "participations":
                        ParticipationRepo.delete(secondParam);
                        break;
                }
                break;
            default:
                console.log("nieznana komenda!");
                break;
        }
        response.write("succes!");
        
        response.end(); //The end of the response - send it to the browser
    }
    else { //Generating the form
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
        response.write("<h3>Instrukcja</h3>");
        response.write("print|a - wyswitlanie danych z argumentem a, argumenty:<br/>");
        response.write("- ls|p - lista studentow przedmiotu p<br/>");
        response.write("- lo|p - lista ocen prowadzacego p<br/>");
        response.write("- x - zawartosci tabeli x ( students, teachers, marks, subject, participations<br/><br/>");
        response.write("insert|where|what - wstawianie do tabeli where, gdzie what to dane do wstawienia<br/><br/>");
        response.write("delete|where|id - usuwanie z tabeli where, gdzie id to id wiersza do usuniecia<br/><br/>");
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="pcommand">Give command</label>');
        response.write('<input name="command">');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('<input type="reset">');
        response.write('</form>');
        response.end();  //The end of the response - send it to the browser
    } 
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");