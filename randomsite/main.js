Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

var date = new Date();
date = date.addHours(-7);


console.log(date);
$(document).ready(function () {
    $.get("https://randomizerforsevs.herokuapp.com/getseed", function (data) {
        Math.seedrandom(data + "frewqrqS");
        $("#mr").text(parseInt(Math.random() * 5) + 1);
        $("#nr").text(parseInt(Math.random() * 5) + 1);
        $("#sr").text(parseInt(Math.random() * 5) + 1);
    });


});
