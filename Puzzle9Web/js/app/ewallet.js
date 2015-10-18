/**
 * Created by jessebstone on 9/20/15.
 */

define(['./mine','./trade','./inventory'],function(mine,trade,inventory) {


   var init = function(){

       //sets up the e-wallet divs and menu

       $('#home_screen').append('<div id=ewallet_div class="wallet_style">' +
       '<div id="wallet_header"><div id=wallet_title class=wallet_style>bit-o-matic</div>'+
       '<div id=wallet_menu><p id="mine_item" class="wallet_menu">Mine Coins</p><p id="trade_item" class="wallet_menu">Trade</p></div></div>'+
       '<div id=wallet_content_area>' +
            '<div id=bitstachio_landing>' +
                '<p>Getting bitcoins has never been easier.</p>'+
                '<i class="fa_landing fa fa-cc-visa"></i><i class="fa_landing fa fa-cc-mastercard"></i><i class="fa_landing fa fa-paypal"></i>'+
            '</div>'+
            '<div id=mine></div>' +
            '<div id=trade>' +
                '<div id=transact_div></div>'+
                '<div id=chart2 class="with-3d-shadow with-transitions"><svg></svg></div>'+
            '</div>'+
       '</div>'+
       '</div>');


       $('#mine').hide();
       $('#trade').hide();

       //set handlers for the menu buttons
       $('#mine_item').click(function(){

           $('#trade_item').css('text-decoration','none');
           $('#mine_item').css('text-decoration','underline');

           $('#bitstachio_landing').hide();
           $('#trade').hide();
           $('#mine').show();

       });

       $('#trade_item').click(function(){

           $('#mine_item').css('text-decoration','none');
           $('#trade_item').css('text-decoration','underline');

           $('#bitstachio_landing').hide();
           $('#mine').hide();
           $('#trade').show();

           trade.init_chart();

       });


       //now we load the mine, chart and trade objects that will control these regions of the ewallet
       mine.init(change_btc); //pass the function that allows mine to change btc amt

       trade.init(change_btc,change_dollars,currency);

       $('#ewallet_div').hide();

      // chart.init();


   };

    var currency = {

        btc:0,
        dollars:0

    };

    var change_btc = function(btc_delta){

        currency.btc += btc_delta;
        console.log(currency.btc);
        inventory.update_item('bitcoin',currency.btc);

    };


    var change_dollars = function(dollars_delta) {

      currency.dollars += dollars_delta;
        console.log(currency.dollars);
        inventory.update_item('dollar',currency.dollars);

    };

    var get_avail_btc = function() {

        return currency.btc;
    }

    var get_avail_dollars = function(){

        return currency.dollars;
    }

   return{init:init,
          get_avail_btc:get_avail_btc,
          get_avail_dollars:get_avail_dollars,
          change_btc:change_btc,
          change_dollars:change_dollars
   };




});