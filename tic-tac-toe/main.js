$(document).ready(function () {
    var firstPlayer = 0;
    var secondPlayerAi = 0;
    var gameDone = false;
    var fieldArr = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    var winCombos = [ //vertical lines
                    [[0, 0], [0, 1], [0, 2], '#wl-4'],
                    [[1, 0], [1, 1], [1, 2], '#wl-5'],
                    [[2, 0], [2, 1], [2, 2], '#wl-6'],
                    //horisontal lines
                    [[0, 0], [1, 0], [2, 0], '#wl-1'],
                    [[0, 1], [1, 1], [2, 1], '#wl-2'],
                    [[0, 2], [1, 2], [2, 2], '#wl-3'],
                    //crossed lines
                    [[0, 0], [1, 1], [2, 2], '#wl-7'],
                    [[2, 0], [1, 1], [0, 2], '#wl-8']
                    ];
    var currTurn = 0;

    var intaractive = true;

    var playFieldTemplate = $('#play-field').clone();
    $('#play-field').remove();
    var menuTemplate = $('#menu').clone();
    $('#menu').remove();

    function respawnField() {
        if (intaractive) {
            fieldArr = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
            intaractive = false;
            gameDone = false;
            var newField = playFieldTemplate.clone();
            newField.css('z-index', '-1');
            var oldField = $('.field');

            oldField.css('top', '2000px');

            setTimeout(function () {
                intaractive = true;
                newField.css('z-index', '0');
                intaractive = true;
                $(oldField).remove();
            }, 1000);
            $('body').append(newField);
            newField.children().children('.next-button').click(respawnField);
            newField.children().children('.home-button').click(respawnMenu);
            newField.children('.paper').children('.play-field').children('.cells').children('.cells-row').children('.cell').click(function () {
                if (!gameDone) {
                    if ($(this).text() == '') {
                        if (currTurn == 0) {
                            fieldArr[$(this).data('cell-x')][$(this).data('cell-y')] = 0;
                            $(this).text('X');
                            currTurn++;
                        } else {
                            fieldArr[$(this).data('cell-x')][$(this).data('cell-y')] = 1;
                            $(this).text('O');
                            currTurn = 0;
                        }
                        for (var i = 0; i < winCombos.length; i++) {
                            var a = true;
                            var symb = fieldArr[winCombos[i][0][0]][winCombos[i][0][1]];
                            if (symb == -1)
                                continue;
                            for (var j = 1; j < winCombos[i].length - 1; j++) {
                                if (fieldArr[winCombos[i][j][0]][winCombos[i][j][1]] != symb) {
                                    a = false;
                                    break;
                                }
                            }
                            if (a) {
                                $(winCombos[i][winCombos[i].length - 1]).css('display', 'block');
                                gameDone = true;
                                console.log('win ' + i + ' ' + symb);
                            }
                        }
                    }
                }
            });
        }
    }

    function respawnMenu() {
        if (intaractive) {
            intaractive = false;
            var newMenu = menuTemplate.clone();
            newMenu.children('.setting-1').children('.setting-options').children('.option:nth-child(' + (firstPlayer + 1) + ')').addClass('selected');
            newMenu.children('.setting-2').children('.setting-options').children('.option:nth-child(' + (secondPlayerAi + 1) + ')').addClass('selected');

            newMenu.css('z-index', '-1');
            var oldField = $('.field');

            oldField.css('top', '2000px');

            setTimeout(function () {
                intaractive = true;
                newMenu.css('z-index', '0');
                intaractive = true;
                $(oldField).remove();
            }, 1000);
            $('body').append(newMenu);

            newMenu.children('.settings-row').children('.setting-options').children('.option').click(function () {
                if ($(this).data('option-index') == 0) {
                    firstPlayer = $(this).data('option-argument');
                } else if ($(this).data('option-index') == 1) {
                    secondPlayerAi = $(this).data('option-argument');
                }
                $(this).parent().children('.selected').removeClass('selected');
                $(this).addClass('selected');


            });
            newMenu.children('.start-btn').click(respawnField);
            //newField.click(respawnField);
        }
    }
    respawnMenu();


});
