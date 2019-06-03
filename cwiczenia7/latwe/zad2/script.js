$(document).ready(function () {
    cells = ['#cell0']
    finished = false
    numOfFreePlaces = 9;

    for (var i=1; i<10; i++)
    {
        cells.push('#cell' + i);
        $(cells[i]).addClass('hover');
    }

    $(document).on('click', '#resetButton', resetGameTable)

    $(document).on('click', '#gameTable td', function ()
    {
        if (finished) return;

        if($(this).text() == '')
        {
            $(this).text('O');
            $(this).addClass('nohover');

            numOfFreePlaces--;
            if (checkWin('O'))
            {
                finished = true
                pPoints = $('#pPoints').text()
                numPPoints = parseInt(pPoints);
                numPPoints += 1
                $('#pPoints').text(numPPoints);
                $('#resetButton').css('visibility', 'visible');
                return;
            }

            computerMove();
            numOfFreePlaces--;
            if (checkWin('X'))
            {
                finished = true
                cPoints = $('#cPoints').text()
                numCPoints = parseInt(cPoints);
                numCPoints += 1
                $('#cPoints').text(numCPoints);
                $('#resetButton').css('visibility', 'visible');
            }

            if (numOfFreePlaces <= 0)
            {
                finished = true
                $('#resetButton').css('visibility', 'visible');
            }
        }
    });

    function checkWin(sign)
    {
        for (var i=1; i<4; i++)
        {
            if($(cells[i]).text() == sign && $(cells[i+3]).text() == sign && $(cells[i+6]).text() == sign)
                return true
            if($(cells[i*3-2]).text() == sign && $(cells[i*3-1]).text() == sign && $(cells[i*3]).text() == sign)
                return true
        }

        if($(cells[1]).text() == sign && $(cells[5]).text() == sign && $(cells[9]).text() == sign)
                return true

        if($(cells[3]).text() == sign && $(cells[5]).text() == sign && $(cells[7]).text() == sign)
            return true

            return false
    }

    function resetGameTable()
    {
        for (var i=1; i<10; i++)
        {
            $(cells[i]).text('');
            $(cells[i]).removeClass('nohover');
        }
        finished = false
        numOfFreePlaces = 9;
        $('#resetButton').css('visibility', 'hidden');
    }

    function computerMove()
    {
        if (numOfFreePlaces <= 0) return;
        num = 0
        while(true)
        {
            num = Math.floor((Math.random() * 9) + 1);
            if ($(cells[num]).text() == '')
                break;
        }
        $(cells[num]).text('X');
        $(cells[num]).addClass('nohover');
    }
});