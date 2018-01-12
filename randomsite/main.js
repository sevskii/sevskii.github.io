$(document).ready(function () {
    $.get("https://randomizerforsevs.herokuapp.com/getseed", function (data) {
        Math.seedrandom(data + "frewqrqS");
        $("#mr").text(parseInt(Math.random() * 5) + 1);
        $("#nr").text(parseInt(Math.random() * 5) + 1);
        $("#sr").text(parseInt(Math.random() * 5) + 1);
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
