/**
 * Created by jessebstone on 9/23/15.
 */

define(['./ewallet'],function(ewallet) {


    // THESE CHANGE WITH CHANGE IN DIV CONFIG
    //-------------------------------------------

    // dictionary that defines (column,row)-address for each item
    var item_address = {

        bitcoin:[1,7],
        dollar:[2,7],
        ads:[3,7],
        workers:[4,7]

    };

    // dict to provide 'names' for inventory items

    var item_name = {

      bitcoin:'btc',
        dollar:'usd',
        ads:'ads',
        workers:'workers'



    };

    var total_cols = 6;

   //---------------------------------------------


   // "hidden" inventory items (like server stuff)

    //var servers = {
    //
    //    CPU_server: {
    //
    //        num_running:0
    //
    //    }
    //
    //
    //};




    var address_to_child = function(m){

        var col=m[0];
        var row=m[1];

        return total_cols*(row-1)+col-1;

    };


    //this 'turns on' the relevant div
    var register_item = function(item) {


        $('.inventory_box:eq('+address_to_child(item_address[item])+')').addClass('on');
        $('.item_name:eq('+address_to_child(item_address[item])+')').text(item_name[item]);

    };


    var update_item = function(item,value){

        $('.item_value:eq('+address_to_child(item_address[item])+')').text(value);


    };



    var init_inventory_menu = function(){};




    return{register_item:register_item,
    update_item:update_item,
    init_inventory_menu:init_inventory_menu}



});