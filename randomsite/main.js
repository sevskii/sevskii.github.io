$(document).ready(function () {
    $.get("https://randomizerforsevs.herokuapp.com/getseed", function (data) {
        $("#mr").text(data[0]);
        $("#nr").text(data[2]);
        $("#sr").text(data[4]);
    });
    setInterval(updateTimer, 1000);
    var currDate = new Date();
    var refreshDate;
    if (currDate.getHours() < 7) {
        refreshDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 7);
    } else {
        refreshDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1, 7);
    }
    updateTimer();

    function updateTimer() {
        currDate = new Date();
        var offset = parseInt((refreshDate - currDate) / 1000);
        $(".timer").text(twoD(parseInt(offset / 60 / 60)) + ":" + twoD(parseInt(offset / 60 % 60)) + ":" + twoD(parseInt(offset % 60)));

        if (+offset <= 1) {
            setTimeout(function () {
                location.reload(true);
            }, 1000);
        }
    }

    function twoD(s) {
        return s.toString().length == 2 ? s : "0" + s;
    }
});
