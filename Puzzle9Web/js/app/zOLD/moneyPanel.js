/**
 * Created by jessebstone on 9/28/15.
 */

define(['./priceData'],function(priceData) {

    var current_price;
    var price_change;


    var init_money_panel = function(conversion_rate,pricechange) {


        current_price = Math.round((conversion_rate + 0.00001) * 100) / 100;
        price_change = Math.round((pricechange + 0.00001) * 100) / 100;


        $('#money_panel').append(
            '<div id=ticker_name class="ticker">BTC</div>'+
            '<div id=ticker_change class="ticker">'+price_change.toString()+'%'+'</div>'+
            '<div id=ticker_price class="ticker">'+current_price.toString()+'</div>'
        );

        if (pricechange < 0) {$('#ticker_change').css('color','red')}
        else{$('#ticker_change').css('color','green')}

        //register with timer

    };

    var update_ticker = function(){

        current_price = Math.round((priceData.get_todays_price() + 0.00001) * 100) / 100;
        price_change = Math.round((priceData.get_price_change() + 0.00001) * 100) / 100;
        $('#ticker_change').text(price_change.toString()+'%');
        $('#ticker_price').text(current_price.toString());


        if (price_change < 0) {$('#ticker_change').css('color','red')}
        else{$('#ticker_change').css('color','green')}


    };



    return{init_money_panel:init_money_panel,
    update_ticker:update_ticker}

});