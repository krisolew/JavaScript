$(document).ready(function () {
    //$('#elementSPAN').text('456');
    //$('#elementSPAN').css("background-color", "red")

    cells = []
    free = []
    for (var i=1; i<10; i++)
    {
        cells.push('cell' + i);
        free.push(true);
    }

    $(document).on('click', '#gameTable td', function ()
    {
        if($(this).text() == '')
        {
            $(this).text('O');
        }
    });
    //var width = $('#elementSPAN').width()
    //var height = $('#elementSPAN').height()
    //console.log(width + 'x' + height)
    //$('#elementSPAN').animate({width: 250, height: 250},'slow');
    //alert("The current document is ready for processing");
});