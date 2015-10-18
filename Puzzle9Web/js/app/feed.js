/**
 * Created by jessebstone on 9/18/15.
 */

define([],function() {


    var init = function(){

        $('#home_screen').append('<div id=feed_div><div id=feed_header>' +
        '<i class="fa fa-twitter"></i>' +
        '<div class=feed_title id=feed_title1>@user137</div></div>' +
        //'<div class=feed_title id=feed_title2>FEEDS</div></div>' +
        '<div id=feed_content><div id=notifyGradient></div></div></div>');






        //<i class="fa fa-rss"></i>
    };


    var clearNotifications = function() {

        // To fix some memory usage issues, we clear notifications that have been hidden.

        // We use position().top here, because we know that the parent will be the same, so the position will be the same.
        var bottom = $('#notifyGradient').position().top + $('#notifyGradient').outerHeight(true);

        $('.notification').each(function () {

            if ($(this).position().top > bottom) {
                $(this).remove();
            }

        });

    };

    var pushNotifications = function(t) {
        var text = $('<div>').addClass('notification').css('opacity', '0').text(t).prependTo('#feed_content');
        text.animate({opacity: 1}, 500, 'linear', function () {
            // Do this every time we add a new message, this way we never have a large backlog to iterate through. Keeps things faster.
            clearNotifications();
        });
    };



    var tweet = function(handle,t) {

        var text = $('<div>').addClass('notification').css('opacity', '0').prependTo('#feed_content');
        $('#feed_content').children().eq(0).append('<div class=handle>'+handle+': </div><div class=tweet_content>'+t+'</div>');
        text.animate({opacity: 1}, 500, 'linear', function () {
            // Do this every time we add a new message, this way we never have a large backlog to iterate through. Keeps things faster.
            clearNotifications();
        });



    };



    return{init:init,
    pushNotifications:pushNotifications,
    tweet:tweet};






});