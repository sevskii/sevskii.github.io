$(document).ready(function () {
    $('.icon-search').click(function () {
        $('.search-area').css('width', '100%');
        $('.search-area').css('left', '0');
        $('.search-area').css('margin-left', '0');
        $('.search-area').css('border', 'solid aquamarine 1px');
        $('.search-query').css('color', 'black');
        $('.search-query').removeAttr('disabled');
        $('.search-query').focus();
        $('.icon-random').css('display', 'none');
        $('.icon-close').css('display', 'block');
    });
    $('.icon-close').click(function () {
        if ($('.search-area').css('top') == '0') {
            $('.search-area').css('width', '200px');
            $('.search-area').css('left', '50%');
            $('.search-area').css('margin-left', '-100px');
            $('.search-area').css('border', 'none');
            $('.search-query').css('color', 'transparent');
            $('.search-query').attr('disabled');
            $('.icon-random').css('display', 'block');
            $('.icon-close').css('display', 'none');
            $('.result-area').css('display', 'none');
        } else {
            $('.search-area').css('top', '50%');
            $('.result-area').css('display', 'none');
            setTimeout(function () {
                $('.search-area').css('width', '200px');
                $('.search-area').css('left', '50%');
                $('.search-area').css('margin-left', '-100px');
                $('.search-area').css('border', 'none');
                $('.search-query').css('color', 'transparent');
                $('.search-query').attr('disabled');
                $('.icon-random').css('display', 'block');
                $('.icon-close').css('display', 'none');
            }, 250);
        }
    });

    $(".search-query").on('keyup', function (e) {
        if (e.keyCode == 13) {
            setTimeout(function () {
                $('.result-area').css('display', 'block');
            }, 500);
            $.get({
                url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=' + $('.search-query').val(),
                success: function (data) {
                    var resultsContent = $('<div></div>');
                    var results = data.query.search;
                    console.log(results);
                    $('.result-area').html('');
                    for (var i = 0; i < results.length; i++) {
                        console.log('<a href="https://en.wikipedia.org/wiki/' + encodeURI(results[i].title) + '"> <div class="result"> <h1 class="result-header">' + results[i].title + '</h1> <p class="result-description">' + results[i].snippet + '</p> </div> </a>');
                        $('.result-area').append('<a href="https://en.wikipedia.org/wiki/' + encodeURI(results[i].title) + '"> <div class="result"> <h1 class="result-header">' + results[i].title + '</h1> <p class="result-description">' + results[i].snippet + '</p> </div> </a>');
                    }
                },
                dataType: 'jsonp'
            })
            $('.search-area').css('top', '45px');
        }
    });
});
