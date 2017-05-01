$(document).ready(function () {
    var Tile = function (e, a) {
        var el = e,
            audio = a;
        this.activate = function () {
            el.addClass('active');
            audio.play();

        };
        this.deactivate = function () {
            el.removeClass('active');
        };
    };

    var on = false,
        strict = false,
        score = 1,
        intaractive = false,
        queue = [],
        queueInd = 0,
        userInd = 0,
        winScore = 21,
        payingWinCircle = false,
        tiles = [new Tile($('#tile-0'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')), new Tile($('#tile-1'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')), new Tile($('#tile-2'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')), new Tile($('#tile-3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'))];

    function reset() {
        on = false;
        strict = false;
        score = 1;
        intaractive = false;
        $('.active').removeClass('active');
        $('.counter-value').text('');
        payingWinCircle = false;
        queue = [];
        userInd = 0;
    }

    function displayScore() {
        if (score >= winScore) {
            payingWinCircle = true;
            winCircle();
        } else if (score < 10)
            $('.counter-value').text('0' + score);
        else
            $('.counter-value').text(score);
    }

    function winCircle() {
        if (payingWinCircle) {
            $('.counter-value').text('GG');
            tiles[1].activate();
            setTimeout(function () {
                if (payingWinCircle) {
                    tiles[3].activate();
                    setTimeout(function () {
                        if (payingWinCircle) {
                            tiles[2].activate();
                            setTimeout(function () {
                                if (payingWinCircle) {
                                    tiles[0].activate();
                                    setTimeout(function () {
                                        tiles[1].deactivate();
                                        setTimeout(function () {
                                            if (payingWinCircle) {
                                                tiles[3].deactivate();
                                                setTimeout(function () {
                                                    if (payingWinCircle) {
                                                        tiles[2].deactivate();
                                                        setTimeout(function () {
                                                            if (payingWinCircle) {
                                                                tiles[0].deactivate();
                                                                setTimeout(winCircle, 500);
                                                            }
                                                        }, 500);
                                                    }
                                                }, 500);
                                            }
                                        }, 500);
                                    }, 500);
                                }
                            }, 500);
                        }
                    }, 500);
                }
            }, 500);
        }
    }

    function playQueue() {
        tiles.forEach(function (el) {
            el.deactivate();
        });
        playNext(0, queueInd);
    }

    function playNext(ind, gi) {
        tiles[queue[ind]].activate();
        setTimeout(function () {
            if (gi == queueInd) {
                tiles[queue[ind]].deactivate();
                if (ind + 1 < queue.length)
                    setTimeout(function () {
                        playNext(ind + 1, gi);
                    }, 100);
                else
                    intaractive = true;
            }
        }, 500);
    }

    function addOneToQueue() {
        queue.push(Math.floor(Math.random() * 4));
    }

    $('.strict-btn').click(function () {
        if (on) {
            if (strict)
                $('.strict-lamp').removeClass('active');
            else
                $('.strict-lamp').addClass('active');
            strict = !strict;
        }
    });

    $('.switch-switcher').click(function () {
        if (on) {
            reset();
        } else {
            $('.switch-switcher').addClass('active');
            $('.counter-line').addClass('active');
            on = true;
        }
    });

    $('.start-btn').click(function () {
        if (on) {
            queueInd++;
            score = 1;
            intaractive = false;
            queue = [];
            payingWinCircle = false;
            $('.segment.active').removeClass('active');
            var myQueueInd = queueInd;
            $('.counter-value').text('');
            $('.counter-line').removeClass('active');
            setTimeout(function () {
                if (myQueueInd == queueInd) {
                    $('.counter-line').addClass('active');
                    setTimeout(function () {
                        if (myQueueInd == queueInd) {
                            $('.counter-line').removeClass('active');
                            setTimeout(function () {
                                if (myQueueInd == queueInd) {
                                    addOneToQueue();
                                    displayScore();
                                    playQueue();
                                }
                            }, 500);
                        }
                    }, 500);
                }
            }, 500);
        }
    });

    $('.segment').mousedown(function () {
        if (intaractive) {
            tiles[$(this).data('tile')].activate();
        }
    });
    $('.segment').mouseup(function () {
        if (intaractive) {
            presed($(this).data('tile'));

        }
    });
    $('.segment').mouseout(function () {
        if (intaractive)
            tiles[$(this).data('tile')].deactivate();
    });

    function presed(ind) {
        tiles[ind].deactivate();
        if (queue[userInd] != ind) {
            userInd = 0;
            $('.counter-value').text('!!');
            if (!strict) {
                setTimeout(function () {
                    playQueue();
                    displayScore();
                }, 1000);
            }
            intaractive = false;
        } else if (userInd == queue.length - 1) {
            intaractive = false;
            score++;
            displayScore();
            if (score < winScore) {
                addOneToQueue();
                userInd = 0;
                setTimeout(function () {
                    playQueue();
                }, 1000);
            }
        } else {
            userInd++;
        }
    }
});
