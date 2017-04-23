$(document).ready(function() {
  $.ajaxSetup({ cache: false });

  refreshQuote();

  $('.new-quote-btn').on('click',function(){
    refreshQuote();
  });
  $('.twitter-btn').on('click',function(){
    console.log($('.quote-text').text());
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+encodeURIComponent($('.quote-text').text().substr(1)));
  });

  function generateColor(){
      return 'rgb('+(Math.floor(Math.random()*200) + 30)+','+(Math.floor(Math.random()*200) + 30)+','+(Math.floor(Math.random()*200) + 30)+')';
  }

  function refreshQuote(){
    var newColor = generateColor();
    $('.quote-text,.quote-author').css('color','white');
    $.getJSON('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',function(json){
      $('.btn,body').css('background-color',newColor);
      $('.quote-text,.quote-author').css('color',newColor);
      var content = json[0].content;
      $('.quote-text').fadeIn().html(content.substr(0,3)+'<i class="fa fa-quote-left"></i> '+content.substr(3));
      $('.quote-author').text('- '+json[0].title);
    });
  }
});
