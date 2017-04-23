$(document).ready(function () {
    var scrolling = false;

    $('.scroll-about').click(function () {
        clearActivate();
        $('.scroll-about').addClass('active');
        scrolling = true;
        $('html,body').animate({
            scrollTop: $('#about').offset().top - 85
        }, 500);
        setTimeout(function () {
            scrolling = false;
        }, 500);
    });
    $('.scroll-portfolio').click(function () {
        clearActivate();
        $('.scroll-portfolio').addClass('active');
        scrolling = true;
        $('html,body').animate({
            scrollTop: $('#portfolio').offset().top - 85
        }, 500);
        setTimeout(function () {
            scrolling = false;
        }, 500);
    });
    $('.scroll-contacts').click(function () {
        clearActivate();
        $('.scroll-contacts').addClass('active');
        scrolling = true;
        $('html,body').animate({
            scrollTop: $('#contacts').offset().top - 85
        }, 500);
        setTimeout(function () {
            scrolling = false;
        }, 500);
    });
    $(document).scroll(function () {
        if (!scrolling) {
            clearActivate();
            activate();

        }
    });

    function activate(){
        var scrollTop = $('body').scrollTop();
            if (scrollTop < $('#portfolio').offset().top - 85) {
                $('.scroll-about').addClass('active');
            } else {
                $('.scroll-portfolio').addClass('active');
            }
    }

    function clearActivate() {
        $('.scroll-about').removeClass('active');
        $('.scroll-portfolio').removeClass('active');
        $('.scroll-contacts').removeClass('active');
    };

    activate();
});
