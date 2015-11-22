/**
 * Created by jessebstone on 9/17/15.
 */

define([],function() {


    var init = function() {

        $('#home_screen').append('<div id=rainmeter_div>' +
        '<div id="os_label">' +
            '<div id="os_text1">Cryptonite</div>' +
            '<div id="os_text2">OS</div>' +
        '</div>'

        //'<div id="payment_widget">'+
        //    '<div id=payment_period>' +
        //        '<p>Billing Cycle:</p>'+
        //        '<div class="progress">'+
        //            '<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:60%"></div>'+
        //            '</div>'+
        //        '</div>'+
        //    '<div id=payment_button>Pay Bill</div>'+
        //'</div>'
        );


        //$('#home_screen').append('<div id=rainmeter_div>'+
        //'<div id=rm_day></div><div id=rm_date></div>' +
        //'<div id=rm_weather_div><div id=rm_weather></div><div id=rm_temp></div>' +
        //'</div>' +
        //'</div>');

        //$('#rm_day').text('MONDAY');
        //$('#rm_date').text('17');
        //$('#rm_weather').append('<i id=cloud_icon class="glyphicon glyphicon-cloud"></i>');
        //$('#rm_temp').text('77°');


    };


    return{init:init};

});