/**
 * Created by jessebstone on 9/22/15.
 */

//making a change to test git...

define(['./inventory','nv','./priceData','./moneyPanel','./timer'],function(inventory,nv,pricedata,moneyPanel,timer) {

    var min_btc = 1;
    var max_btc = 1000000000;
    var conversion_rate;
    var price_change;

    //pricedata.data_in();


// TRANSACTION FUNCTIONALITY

    var init = function(change_btc,change_dollars,currency) {


        // starting timer
        timer.looper();


        // creating the usd inventory item
        inventory.register_item('dollar');

        //pre-loading in the price data & passing in a callback function for updating trade stuff
        pricedata.init_price_data(update_trade_data);

        get_conversion(); //sets conversion rate
        get_price_change(); //sets price change

        // initialize the money panel - shows current btc price ($) and recent change

        moneyPanel.init_money_panel(conversion_rate,price_change);


        //


        //registering


        var switch_div = '<div class="switch">' +
            '<input id="cmn-toggle-7" class="cmn-toggle cmn-toggle-yes-no" type="checkbox">' +
            '<label for="cmn-toggle-7" data-on="BUY" data-off="SELL"></label>' +
            '</div>';

        var btc_input_field = '<div id=btc_input_div><div id=btc_input_icon>btc</div>'+
            '<input type="text" name="btc_amt" id="btc_amt" class="transact_btc" placeholder="0" style="border:none;"></div>';


        var usd_values = '<div class=conversion_rate><div id="at_div">at</div><div id=usd_value>0</div><p>USD</p></div>';

        var trade_submit = '<div id=trade_submit_btn class="btn_my transact_btc">Order</div>'



        $('#transact_div').append(switch_div+btc_input_field+usd_values+trade_submit);

        $('#btc_amt').on("keyup",function(){

            console.log('keypress detected');
            btc_to_usd();


        });

        $('#trade_submit_btn').click(function(){

            //TODO:  Add a confirmation screen to confirm/cancel trade - leave out for now, no transaction costs so can undo trades easily





            //check to make sure its a legal transaction (no ?)

            if ($('#usd_value').text() != '?') {


                var input_btc = parseInt($('#btc_amt').val());
                var output_usd = parseInt($('#usd_value').text());



                var btc_sign, usd_sign, btc_value, usd_value;

                if ($('#cmn-toggle-7').is(':checked')) {

                    //BUY

                    btc_sign = 1;
                    usd_sign = -1;


                }
                else {

                    //SELL

                    btc_sign = -1;
                    usd_sign = 1;


                }

                    btc_value = btc_sign*input_btc;
                    usd_value = usd_sign*output_usd;


                    if (((currency.btc + btc_value) >= 0) && ((currency.dollars + usd_value) >= 0)) {

                        change_btc(btc_value);
                        change_dollars(usd_value);

                    }


            }


        })



    };



    // set of functions that need to be updated on a 'daily' bases - these are registered with priceData, which calls them - NOT timer
    var update_trade_data = function(){


        console.log('go');
        moneyPanel.update_ticker();
        $('.nvtooltip').remove(); //removes any tooltip being shown when update occurs (otherwise end up with ghost tooltips)
        init_chart();


    };


    var get_conversion = function(){

        conversion_rate = pricedata.get_todays_price();

    };

    var get_price_change = function() {

        price_change = pricedata.get_price_change();

    };


    var btc_to_usd = function(){

        var input_value = $('#btc_amt').val();

        console.log($('#btc_amt').val());


        if (validated(input_value)) {

            var value_int = parseInt(input_value);

            var usd_value = Math.floor(value_int*conversion_rate);

        $('#usd_value').text(usd_value.toString());

        }

        else {$('#usd_value').text("?");}


    };


    var validated = function(value){

        return ((!isNaN(parseFloat(value)) && isFinite(value)) && (value >= min_btc) && (value < max_btc))

    };




// CHART FUNCTIONALITY ----------------------------




    // DATA API - Retrieve Data for Chart from price_data.js



    // Function to set conversion rate each time data is updated (called by DATA API update)


// CHART - Static data to start


    var init_chart = function() {





        nv.addGraph(function() {
            var chart = nv.models.lineWithFocusChart();
            //chart.brushExtent([50,70]);
            chart.xAxis.tickFormat(d3.format(',f')).axisLabel("");
            chart.x2Axis.tickFormat(d3.format(',f'));
            chart.yAxis.tickFormat(d3.format(',.2f'));
            chart.y2Axis.tickFormat(d3.format(',.2f'));
            chart.useInteractiveGuideline(true);
            d3.select('#chart2 svg')
                .datum(get_market_data())
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;

        });



        /**************************************
         * Simple test data generator
         */



        function get_market_data () {

          var btc = pricedata.get_prices();



          // return data

            return [
                {
                    values: btc,      //values - represents the array of {x,y} data points
                    key: 'btc', //key  - the name of the series.
                    color: '#ffffff'  //color - optional: choose your own line color.
                }
            ];




        };



        function sinAndCos() {
            var sin = [],sin2 = [],
                cos = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10)});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ffffff'  //color - optional: choose your own line color.
                }
            ];
        }




        //function testData() {
        //    return stream_layers(3,128,.1).map(function(data, i) {
        //        return {
        //            key: 'Stream' + i,
        //            values: data
        //        };
        //    });
        //}
        //
        //
        //function stream_layers(n, m, o) {
        //    if (arguments.length < 3) o = 0;
        //    function bump(a) {
        //        var x = 1 / (.1 + Math.random()),
        //            y = 2 * Math.random() - .5,
        //            z = 10 / (.1 + Math.random());
        //        for (var i = 0; i < m; i++) {
        //            var w = (i / m - y) * z;
        //            a[i] += x * Math.exp(-w * w);
        //        }
        //    }
        //    return d3.range(n).map(function() {
        //        var a = [], i;
        //        for (i = 0; i < m; i++) a[i] = o + o * Math.random();
        //        for (i = 0; i < 5; i++) bump(a);
        //        return a.map(stream_index);
        //    });
        //}
        //
        //function stream_index(d, i) {
        //    return {x: i, y: Math.max(0, d)};
        //}


    };



   // window.dispatchEvent(new Event('resize'));

    return{init:init,
    init_chart:init_chart}

});


