$(document).ready(function () {
    //$('#elementSPAN').text('456');
    //$('#elementSPAN').css("background-color", "red")

    cells = ['#cell0']
    for (var i=1; i<10; i++)
    {
        cells.push('#cell' + i);
    }

    $(document).on('click', '#gameTable td', function ()
    {
        if($(this).text() == '')
        {
            $(this).text('O');
            if (checkWin())
            {
                console.log("win");
                resetGameTable();
            }
        }
    });

    function checkWin()
    {
        for (var i=1; i<4; i++)
        {
            if($(cells[i]).text() != '' && ($(cells[i]).text() == $(cells[i+3]).text()) && ($(cells[i+6]).text() == $(cells[i+3]).text()))
                return true
            if($(cells[i*3-2]).text() != '' && ($(cells[i*3-2]).text() == $(cells[i*3-1]).text()) && ($(cells[i*3-1]).text() == $(cells[i*3]).text()))
                return true
        }

        if($(cells[1]).text() != '' && ($(cells[1]).text() == $(cells[5]).text()) && ($(cells[5]).text() == $(cells[9]).text()))
                return true

        if($(cells[3]).text() != '' && ($(cells[3]).text() == $(cells[5]).text()) && ($(cells[5]).text() == $(cells[7]).text()))
            return true

            return false
    }

    function resetGameTable()
    {
        for (var i=1; i<10; i++)
        {
            $(cells[i]).text('');
        }
    }
    //var width = $('#elementSPAN').width()
    //var height = $('#elementSPAN').height()
    //console.log(width + 'x' + height)
    //$('#elementSPAN').animate({width: 250, height: 250},'slow');
    //alert("The current document is ready for processing");
});