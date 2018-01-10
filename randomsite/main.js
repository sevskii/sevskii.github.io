
Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}
var date = new Date();
date = date.addHours(-7);
Math.seedrandom(date.getDay() * 1241 + "frewqrqS");

console.log(date);
$(document).ready(function () {
    $("#mr").text(parseInt(Math.random() * 5) + 1);
    $("#nr").text(parseInt(Math.random() * 5) + 1);
    $("#sr").text(parseInt(Math.random() * 5) + 1);
});
