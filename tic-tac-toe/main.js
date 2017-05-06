$(document).ready(function () {
    var firstPlayer = 0;
    var secondPlayerAi = 0;

    var intaractive = true;

    var playFieldTemplate = $('#play-field').clone();
    $('#play-field').remove();
    var menuTemplate = $('#menu').clone();
    $('#menu').remove();

    function respawnField() {
        if (intaractive) {
            intaractive = false;
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
