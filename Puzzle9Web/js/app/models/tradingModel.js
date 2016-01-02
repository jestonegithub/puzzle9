/**
 * Created by jessestone on 12/30/15.
 */


define(function (require) {
    // var mn = require('marionette');
    var bb = require('backbone');
    var tm = require('./timeModel');
    var _ = require('underscore');



    // Variables and functions for generating initial historical price data and real-time price data

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

        var X = Math.sqrt(-2 * Math.log(S) / S) * V1;

        X = mean + Math.sqrt(variance) * X;

        return X;
    }

    function discrete_uniform_random(error) {

        Math.floor(((Math.random()-0.5) * error/2) + 1);

    }




    var TradingModel = bb.Model.extend({

        defaults: {

            current_price: 0,
            price_data: [],
            current_market_condition:'normal',
            latest_price_change:0,
            open:false,
            installed:true,
            coin_type:'TRC',
            min_coin: 1,
            max_coin: 10000000

        },



        initialize:function(){

            // generate the historical prices prior to starting game date
            this.historical_prices();
            this.get_current_price();
            this.on('change:price_data',function(){
                this.calc_latest_price_change();
                this.get_current_price();
                console.log('listening');
                console.log(this.get('current_price'));
            },this);

            tm.Timer.addToList('new_price', _.bind(this.update_prices,this),tm.Timer.get('game_date_duration'));


        },




        // (HISTORICAL): generate the historical price data

        historical_prices:function(){

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

                this.get('price_data').push({x:i,y:p});
            }

        },

        update_prices: function(){

            console.log('updating prices...');

            var i=historical_days+tm.Timer.get('game_date');
            var delta=time/historical_days;
            var t=i*delta;

            var current_market_condition = this.get('current_market_condition');

            var todays_mean=mean[current_market_condition];
            var todays_vol=vol[current_market_condition];

            W=W+normal_random(todays_mean,todays_vol)*Math.sqrt(delta);
            var p=initial_price*Math.exp((b-0.5*todays_vol*todays_vol)*t+todays_vol*W);

            this.get('price_data').push({x:i,y:p});
            this.trigger('change:price_data');

        },

        calc_latest_price_change: function(){
            var price_data=this.get('price_data');
            var price_delta = (price_data[price_data.length -1]['y']-price_data[price_data.length -2]['y']);
            var price_change_percent = Math.round((price_delta + 0.00001) * 100) / 100;
            this.set({'latest_price_change': price_change_percent})
        },

        get_current_price:function(){
            var prices = this.get('price_data');
            var last_price = prices[prices.length-1]['y'];
            var rounded_price = Math.round((last_price+ 0.00001) * 100) / 100;
            this.set({'current_price':rounded_price});
        }

    });


    return {TradingModel:TradingModel}


});