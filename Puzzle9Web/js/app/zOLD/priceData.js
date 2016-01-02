/**
 * Created by jessebstone on 9/25/15.
 */



define(['d3','./timer'],function(d3,timer) {

    // PARAMS......----------------------------------------------------------------------


    //retrieve real-time values from timer module
    var game_date=0;
    var curernt_date;
    var current_day;
    var current_month;
    var current_year;

    var first_date;
    var first_day;
    var first_month;
    var first_year;

    var price_data=[];
    var current_market_condition='normal'; //default market condition for daily updates


    // VOL and MEAN for various epochs ---------------------------

    var vol = {
        normal: 0.2,
        crash: 0.3,
        rally: 0.2
    };

    var mean = {
        normal: 0,
        crash: -2,
        rally: 1
    };


    // HISTORICAL PARAMETERS --------------------------------------



    var historical_days = 300;
    var crash_start = 100; //first day of crash
    var crash_duration = 5; // length of crash
    var bottom_out_time = 50; // time before post-crash rally
    var rally_duration = 10;


    //Black-Scholes parameters

    var initial_price=100;
    var time=1;
    var b=0.3;
    var W=0;







// END PARAMS ---------------------------------------------------------------------------------------



    var update_trade_data;



// externally accessible FUNCS -------------------------

    var init_price_data = function(update_func) {


        historical_prices();
        timer.addToList('update_prices',update_prices,10);
        update_trade_data=update_func;


    };


    var get_prices = function() {

        return price_data;

    };


    var get_todays_price = function () {

        return price_data[price_data.length -1]['y'];

    };


    var get_price_change = function() {


        return (price_data[price_data.length -1]['y']-price_data[price_data.length -2]['y'])

    };


    // externally available method allowing other agents to set market conditions
    var set_current_market_condition = function() {



    };

    var real_time_market_condition = function () {

        // return mean and vol for current game_date


    };


    var update_prices = function() {





        var i=historical_days+timer.get_game_date();
        var delta=time/historical_days;
        var t=i*delta;

        var todays_mean=mean[current_market_condition];
        var todays_vol=vol[current_market_condition];

        W=W+normal_random(todays_mean,todays_vol)*Math.sqrt(delta);
        var p=initial_price*Math.exp((b-0.5*todays_vol*todays_vol)*t+todays_vol*W);

        price_data.push({x:i,y:p});



        // tell chart to update

        update_trade_data();



    };


    // (HISTORICAL): generate the historical price data

    function historical_prices() {



        var historical_day_type = new Array(historical_days);
        historical_day_type.fill('normal');
        historical_day_type.fill('crash',crash_start,crash_start+crash_duration);
        historical_day_type.fill('rally',crash_start+crash_duration+bottom_out_time,crash_start+crash_duration+bottom_out_time+rally_duration);

        var delta=time/historical_days;
        var t, p,todays_mean,todays_vol;

        for (i=0;i<historical_days;i++) {


            todays_mean=mean[historical_day_type[i]];
            todays_vol=vol[historical_day_type[i]];

            t=i*delta;


            W=W+normal_random(todays_mean,todays_vol)*Math.sqrt(delta);
            p=initial_price*Math.exp(

                (b-0.5*todays_vol*todays_vol)*t+todays_vol*W

            );


            price_data.push(

                {x:i,y:p}

            );
        }

    };






// RANDOM FUNCTIONS ---------

    function normal_random(mean, variance) {
        if (mean == undefined)
            mean = 0.0;
        if (variance == undefined)
            variance = 1.0;
        var V1, V2, S;
        do {
            var U1 = Math.random();
            var U2 = Math.random();
            V1 = 2 * U1 - 1;
            V2 = 2 * U2 - 1;
            S = V1 * V1 + V2 * V2;
        } while (S > 1);

        X = Math.sqrt(-2 * Math.log(S) / S) * V1;
        //Y = Math.sqrt(-2 * Math.log(S) / S) * V2;
        X = mean + Math.sqrt(variance) * X;
        //Y = mean + Math.sqrt(variance) * Y ;
        return X;
    };

    function discrete_uniform_random(error) {

        Math.floor(((Math.random()-0.5) * error/2) + 1);

    };







    return{init_price_data:init_price_data,
    get_prices:get_prices,
    get_todays_price:get_todays_price,
    get_price_change:get_price_change}



});