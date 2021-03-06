function setActiveSessionProgress(procent) {
    var height = 455 * procent,
        el = $('.progress-bar-session');
    el.css('height', height);
    el.css('margin-top', 360 - height);
}

function setPassiveSessionProgress(procent) {
    var height = 455 * procent,
        el = $('.progress-bar-session');
    el.css('height', height);
    el.css('margin-top', '0px');
}

function setActiveSessionBreak(procent) {
    var height = 430 * procent,
        el = $('.progress-bar-break');
    el.css('height', height);
    el.css('margin-top', '-120px');
}

function setPassiveSessionBreak(procent) {
    var height = 430 * procent,
        el = $('.progress-bar-break');
    el.css('height', height);
    el.css('margin-top', 485 - height);
}

function resetProgress() {
    var height = 0;
    el = $('.progress-bar-break');
    el.css('height', height);
    el.css('margin-top', '-100px');
    height = 455;
    el = $('.progress-bar-session');
    el.css('height', height);
    el.css('margin-top', '-145px');
}

function formatTime(sec) {
    var minutes = (Math.floor(sec / 60) > 9) ? (Math.floor(sec / 60)) : ('0' + Math.floor(sec / 60));
    var seconds = (sec % 60 > 9) ? (sec % 60) : ('0' + sec % 60);
    return minutes + ':' + seconds;
}

$(document).ready(function () {
    var breakTime = 300,
        sessionTime = 1500,
        sessionActive = false,
        time = 0,
        setUpState = true,
        tick = null,
        turnInterval = null;

    $('.break-controls .minus').click(function () {
        console.log('a');
        if (breakTime > 30)
            breakTime -= 30;
        displayStatus();
    });

    $('.break-controls .plus').click(function () {
        if (breakTime < 5940)
            breakTime += 30;
        displayStatus();
    });

    $('.session-controls .minus').click(function () {
        console.log('a');
        if (sessionTime > 30)
            sessionTime -= 30;
        displayStatus();
    });

    $('.session-controls .plus').click(function () {
        if (sessionTime < 5940)
            sessionTime += 30;
        displayStatus();
    });

    $('.clock-container').click(function () {
        clearInterval(turnInterval);
        if (setUpState) {
            setUpState = false;
            sessionActive = true;
            $('.controls * *').css('display', 'none');
            $('.clock-container').css('transform', 'rotateZ(0) scale(0.8)');
            tick = setInterval(function () {
                time += 0.01;
                if (sessionActive && time > sessionTime) {
                    time = 0;
                    sessionActive = false;
                    $('.clock-container').css('transform', 'rotateZ(180deg) scale(0.8)');
                }
                if (!sessionActive && time > breakTime) {
                    time = 0;
                    sessionActive = true;
                    $('.clock-container').css('transform', 'rotateZ(0) scale(0.8)');
                }
                displayStatus();
            }, 10);
        } else {
            sessionActive = false;
            time = 0;
            setUpState = true;
            clearInterval(tick);
            $('.clock-container').css('transform', 'rotateZ(180deg) scale(0.8)');
            turnInterval = setInterval(function () {
                $('.controls *').css('display', 'block');
                displayStatus();
            }, 1000);
        }
    });



    function displayStatus() {
        if (setUpState) {
            $('.timer').css('transform', 'rotateZ(180deg)');
            $('.timer-session').text(formatTime(sessionTime));
            $('.timer-break').text(formatTime(breakTime));
            resetProgress();
        } else {
            $('.timer-break').text('');
            $('.timer-session').text('');
            $('.label-break').css('display', 'none');
            $('.label-session').css('display', 'none');
            if (sessionActive) {
                $('.timer').css('transform', 'rotateZ(0)');
                $('.label-session').css('display', 'block');
                $('.timer-session').text(formatTime(sessionTime - Math.floor(time)));
                var progress = time / sessionTime;
                setActiveSessionProgress(1 - progress);
                setPassiveSessionBreak(progress);
            } else {
                $('.timer').css('transform', 'rotateZ(180deg)');
                $('.label-break').css('display', 'block');
                $('.timer-break').text(formatTime(breakTime - Math.floor(time)));
                var progress = time / breakTime;
                setActiveSessionBreak(1 - progress);
                setPassiveSessionProgress(progress);
            }
        }
    }
    displayStatus();
});
