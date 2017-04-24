//https://api.twitch.tv/kraken/streams/ESL_SC2?client_id=76ah1f29uaasef3lmlkhgobgj6qpnv&limit=1
$(document).ready(function () {
    var onlineFilter = null;
    var filterStr = "";

    var chanels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    var Stream = function (id) {
        var me = this;
        this.el = $('<div class="stream col-xs-6"></div>');;
        $('.streams').append(me.el);
        this.online = false;
        this.title = id;
        this.icon = '';

        function loaded() {
            if (me.icon === null)
                me.icon = 'https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png';
            me.el.html("<a href='https://www.twitch.tv/"+id+"' target='_blank'><img src=" + me.icon + " /><p>" + me.title + "</p></a><i class='fa fa-circle " + (me.online ? "online" : "") + "'></i>");

        }

        $.get({
            url: 'https://api.twitch.tv/kraken/streams/' + id + '?client_id=76ah1f29uaasef3lmlkhgobgj6qpnv&limit=1',
            success: function (data) {
                if (data.stream === null) {
                    me.online = false;
                    $.get({
                        url: data._links.channel + '?client_id=76ah1f29uaasef3lmlkhgobgj6qpnv&limit=1',
                        success: function (data) {
                            me.icon = data.logo;
                            loaded();
                        }
                    });
                } else {
                    me.online = true;
                    me.icon = data.stream.channel.logo;
                    loaded();
                }

            }
        });

    };

    var streams = [];
    for (var i = 0; i < chanels.length; i++) {
        streams.push(new Stream(chanels[i]));
    }



    function filter() {
        for (var i = 0; i < streams.length; i++) {
            streams[i].el.css('display', 'none');
        }
        for (var i = 0; i < streams.length; i++) {
            if (streams[i].title.indexOf(filterStr) != -1) {
                if (onlineFilter === undefined)
                    streams[i].el.css('display', 'block');
                else if (onlineFilter && streams[i].online)
                    streams[i].el.css('display', 'block');
                else if (!onlineFilter && !streams[i].online)
                    streams[i].el.css('display', 'block');
            }
        }
    }

    $('#filter').keyup(function (){
        filterStr = $(this).val();
        filter();
    });

    function clearActives() {
        $('.active').removeClass('active');
    }

    $('.tab').click(function () {
        clearActives();
        $(this).addClass('active');
        console.log($(this).data('filter'));
        onlineFilter = $(this).data('filter');
        filter();
    });



});
