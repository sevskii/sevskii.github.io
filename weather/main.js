var State = function(id, str, pic) {
  this.id = id;
  this.str = str;
  this.pic = pic;
};

var statesArray = [
  new State(/^2\d{2}$/, 'There is tunderstorm outside, so you probably shuold turn you pc off and go to sleep', 'http://s.hswstatic.com/gif/thunderstorm-orig.jpg'),
  new State(/^3\d{2}$/, 'There is nasty drizzle outside, meh... that\'s nice that you are home', 'http://blackburnnews.com/wp-content/uploads/2016/02/IMG_7057.jpg'),
  new State(/^5\d{2}$/, 'There is rain outside, but sweet home will safe you from water', 'https://images.alphacoders.com/201/201751.jpg'),
  new State(/^6\d{2}$/, 'There is snow outside, it\'s good that you stayed at home, you do not have to make your way through the snow', 'http://raynhampubliclibrary.org/wp-content/uploads/2016/02/snow01.jpg'),
  new State(/^7\d{2}$/, 'There is bad air outside, hope you will not let outside absorb home', 'http://kingofwallpapers.com/haze/haze-010.jpg'),
  new State(/^800$/, 'Looks like it\'s good weather outside, it will switch to bad if you\'ll decide to go out, so please don\'t ruin others\' joy', 'https://i.ytimg.com/vi/ui6N0jMIFyM/maxresdefault.jpg'),
  new State(/^80\d$/, 'Clouds outside, do you trust them?(I am not)', 'http://pre12.deviantart.net/69e0/th/pre/i/2013/099/8/a/clowdy_sky_by_nogarr-d60pgja.jpg'),
];
var loaded =false;
var dotsAmount = 0;

function animateDots(){
  if (!loaded){
    var loadingStr='Loading';
    for(var i = 0;i<dotsAmount;i++)
      loadingStr += '.';
    dotsAmount++;
    if (dotsAmount > 3)
      dotsAmount = 0;
    $('.text-result').text(loadingStr);
    setTimeout(animateDots,250);
    }
  }
animateDots();

var temp = 0;
var format = 'C';

function getTemp() {
  var str;
  if (format === 'C')
    str = temp;
  else
    str = temp * 9 / 5 + 32;
  return str.toString().match(/\d+\.\d{2}/)[0];
}

function updateTemp() {
  $('.temp-result').html(getTemp() + ' <a href=\'#\' class=\'switch\'>°' + format + '</a>');
  $('.switch').on('click', function() {
  console.log('clicked');
  if (format === 'C')
    format = 'F';
  else
    format = 'C';
  updateTemp();
  });
}

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(position) {
    $.get({
      url:'https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=71ae061d3776833393c4f0c617630aa5',
      success: function(json) {
        loaded = true;
        var id = json.weather[0].id;
        for (var i = 0; i < statesArray.length; i++) {
          if (id.toString().match(statesArray[i].id)) {
            setState(i);
          }
        }
        temp = json.main.temp - 273.15;
        updateTemp();
      },
     error:function(){
       loaded = true;
       $('.text-result').text('Failed to load weather data');
     }
  });
},function(){
    loaded=true;
    $('.text-result').text('Can\'t get your location');
  })
});

var state = 0;

function setState(i){
 $('body').css('background-image', 'url(' + statesArray[i].pic + ')');
          $('.background-muffler').css('background-color', 'rgba(0,0,0,0.5)');
  $('.text-result').text(statesArray[i].str);
  state = i;
}

$('h3').on('click',function(){
  state++;
  if (state >= statesArray.length)
    state = 0;
  setState(state);
});
