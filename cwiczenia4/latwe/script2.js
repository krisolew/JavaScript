const fs = require('fs');

var filename = process.argv[2];

if (typeof filename === 'undefined')
{
    console.log("brak argumentu");
    process.exit();
}

try {
    var status = fs.lstatSync(filename);
    if (status.isFile())
    {
        console.log("Plik");
        var content = fs.readFileSync(filename, 'utf8');
        console.log(content);
    }
    if (status.isDirectory())
    {
        console.log("Katalog");
    }
}
catch (error)
{
    console.log("Brak pliku o podanej nazwie");
}