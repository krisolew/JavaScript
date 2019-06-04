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
            $(this).removeClass('hover');
            numOfFreePlaces--;
            if (checkWin('O'))
            {
                game_over('O');
                return;
            }

            computerMove();
            numOfFreePlaces--;
            if (checkWin('X'))
            {
                game_over('X');
            }

            if (numOfFreePlaces <= 0)
            {
                finished = true
                $('#resetButton').css('visibility', 'visible');
            }
        }
    });

    function game_over(sign)
    {
        finished = true
        sign == 'O' ? id = '#pPoints' : id = '#cPoints'
        console.log(id);

        points = $(id).text()
        numPoints = parseInt(points);
        numPoints += 1
        $(id).text(numPoints);

        for (var i=1; i<10; i++)
        {
            $(cells[i]).removeClass('hover');
        }

        $('#resetButton').css('visibility', 'visible');
    }

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
            $(cells[i]).addClass('hover');
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
        $(cells[num]).removeClass('hover');
    }
});