$(document).ready(function () {
    $.get("https://randomizerforsevs.herokuapp.com/getseed", function (data) {
        Math.seedrandom(data + "frewqrqS");
        $("#mr").text(parseInt(Math.random() * 5) + 1);
        $("#nr").text(parseInt(Math.random() * 5) + 1);
        $("#sr").text(parseInt(Math.random() * 5) + 1);
    });
    setInterval(updateTimer, 1000);
    updateTimer();

    function updateTimer() {
        var currDate = new Date();
        var offset;
        if (currDate.getHours() < 7) {
            offset = new Date(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 4) - currDate);
        } else {
            offset = new Date(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1, 4) - currDate);
        }
        $(".timer").text(twoD(offset.getHours()) + ":" + twoD(offset.getMinutes()) + ":" + twoD(offset.getSeconds()));
        if (offset.getTime() <= 1000) {
            setTimeout(function () {
                location.reload(true);
            }, 1000);
        }
    }

    function twoD(s) {
        return s.toString().length == 2 ? s : "0" + s;
    }
});
