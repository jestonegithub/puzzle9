/**
 * Created by jessestone on 12/26/15.
 */







define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var cur = require('./models/currencyModel');
    var _ = require('underscore');



    var Broker = {

        //makes withdrawal of the desired amount as long as there are sufficent funds - returns 'true' when there are suff. funds (false, otherwise)
        withdrawal_funds : function(currency_type,transaction_amount){

            if (currency_type === 'coins'){var currency = cur.Coins;}
            if (currency_type === 'dollars'){var currency = cur.Dollars;}

            if (currency_type === undefined){console.log('improper currency type')}

            if (currency.get('quantity') >= transaction_amount){
                currency.remove_currency(transaction_amount);
                return true;
            }else{return false}

        }

    };


    var TwitterAPI = {


        clearNotifications : function() {

            // To fix some memory usage issues, we clear notifications that have been hidden.

            // We use position().top here, because we know that the parent will be the same, so the position will be the same.
            var bottom = $('#notifyGradient').position().top + $('#notifyGradient').outerHeight(true);

            $('.notification').each(function () {

                if ($(this).position().top > bottom) {
                    $(this).remove();
                }

            });

        },


        tweet : function(handle,t) {

            var text = $('<div>').addClass('notification').css('opacity', '0').prependTo('#feed_content');
            $('#feed_content').children().eq(0).append('<div class=handle>'+handle+': </div><div class=tweet_content>'+t+'</div>');

            text.animate({opacity: 1}, 500, 'linear', function () {
            // Do this every time we add a new message, this way we never have a large backlog to iterate through. Keeps things faster.
            TwitterAPI.clearNotifications();

            });

        }





    };


    return {withdrawal_funds:Broker.withdrawal_funds,
            tweet:TwitterAPI.tweet}

});
