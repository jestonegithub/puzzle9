/**
 * Created by jessebstone on 9/23/15.
 */

define(['./ewallet'],function(ewallet) {


    // THESE CHANGE WITH CHANGE IN DIV CONFIG
    //-------------------------------------------

    // dictionary that defines (column,row)-address for each item
    var item_address = {

        bitcoin:[1,7],
        dollar:[1,6],
        ads:[1,3],
        workers:[1,4],
        emails:[2,7],
        pass:[2,6],
        trade:[2,5],
        intel:[2,4],
        pills:[3,7],
        docs:[3,6],
        exploits:[3,4],
        chips:[3,3],
        si:[3,2],
        dict:[4,7],
        bots:[4,6],
        sniffer:[5,7],
        ripper:[5,6],
        deepcrack:[5,5],
        quark:[5,4],
        trojan:[6,7],
        virus:[6,6],
        rootkit:[6,5],
        worm:[6,4]

    };

    // dict to provide 'names' for inventory items

    var item_name = {

      bitcoin:'btc',
        dollar:'usd',
        ads:'ads',
        workers:'workers',
        emails:'emails',
        pass:'passwords',
        trade:'trade secrets',
        intel:'intel',
        pills:'pills',
        docs:'passports',
        exploits:'exploits',
        chips:'processors',
        si:'silicon',
        dict:'dictionaries',
        bots:'bots',
        sniffer:'port scanner',
        ripper:'PassHack',
        deepcrack:'DeepCrackR',
        quark:'QuarkII',
        trojan:'trojans',
        virus:'viruses',
        rootkit:'rootkits',
        worm:'worms'



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