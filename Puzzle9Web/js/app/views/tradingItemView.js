/**
 * Created by jessestone on 1/1/16.
 */

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var nv = require('nv');
    var tmpl = require('hbs!app/templates/tradingItemView');
    var broker = require('./../Utilities');



    var TradingItemView = mn.ItemView.extend({

        template: tmpl,

        className:"trading_div",

        events: {

            'keyup #btc_amt': 'btc_to_usd',
            'click #trade_submit_btn': 'transact'

        },

        modelEvents:{

          'change current_price':'plotPrices'


        },


        initialize:function(){

          this.on('show',this.plotPrices,this);


        },

        btc_to_usd: function(){

            var min_coin = this.model.get('min_coin');
            var max_coin = this.model.get('max_coin');

            var validated = function(value){
                return ((!isNaN(parseFloat(value)) && isFinite(value)) && (value >= min_coin) && (value < max_coin))
            };

            var input_value = $('#btc_amt').val();
            var conversion_rate = this.model.get('current_price');
            if (validated(input_value)) {
                var value_int = parseInt(input_value);
                var usd_value = Math.floor(value_int*conversion_rate);
                $('#usd_value').text(usd_value.toString());
            }
            else {$('#usd_value').text("?");}
        },


        transact:function(){

            console.log('transacting...');

            //check to make sure its a legal transaction (no ?)
            if ($('#usd_value').text() != '?') {

                var input_btc = parseInt($('#btc_amt').val());
                var output_usd = parseInt($('#usd_value').text());
                var btc_sign, usd_sign, btc_value, usd_value;

                if ($('#cmn-toggle-7').is(':checked')) {

                    //BUY

                    // purchase only happens with sufficient funds
                    if (broker.withdrawal_funds('dollars',output_usd)){broker.deposit_funds('coins',input_btc)}


                }
                else {

                    //SELL

                    // purchase only happens with sufficient funds
                    if (broker.withdrawal_funds('coins',input_btc)){broker.deposit_funds('dollars',output_usd)}

                }
            }
        },


        plotPrices: function(){

            $('.nvtooltip').remove();

            var market_data = this.get_market_data();

            nv.addGraph(function() {
            var chart = nv.models.lineWithFocusChart();
            chart.xAxis.tickFormat(d3.format(',f')).axisLabel("");
            chart.x2Axis.tickFormat(d3.format(',f'));
            chart.yAxis.tickFormat(d3.format(',.2f'));
            chart.y2Axis.tickFormat(d3.format(',.2f'));
            chart.useInteractiveGuideline(true);
            d3.select('#price_chart svg')
                .datum(market_data)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;

        })
        },

        get_market_data: function() {

        var trc = this.model.get('price_data');

        // return data

        return [
            {
                values: trc,      //values - represents the array of {x,y} data points
                key: 'trc', //key  - the name of the series.
                color: '#ffffff'  //color - optional: choose your own line color.
            }
            ];
        }
    });



    return {TradingItemView:TradingItemView}

});