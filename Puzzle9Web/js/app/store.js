/**
 * Created by jessebstone on 9/29/15.
 */

define(['./ewallet','bootstrap','./mine','./resource_items'],function(ewallet,bootstrap,mine,resourceitems) {


    var init = function(){


        var bootstrap_menu = '<div class="bookmark_container">'+
            '<div class="dropdown">'+
            '<button class="btn btn-xs dropdown-toggle" type="button" data-toggle="dropdown">Bookmarks'+
            '<span class="caret"></span></button>'+
            '<ul class="dropdown-menu">'+
            '</ul></div></div>';



        $('#home_screen').append('<div id=store_div class="store_style"><div id="store_top"><div id="store_title">Crypton</div>' +
        '<div id="store_address"><input type="text" name="command" id="torque_address_input" placeholder="localhost:8123/#" disabled></div><div id=store_menu>'+bootstrap_menu+'</div></div>'+
        '<div id=store_content_area></div></div>');

        add_site("Cloud Awesome",'cloudawesome');

        

        // fills the cloudawesome store items with all the servers
        for (i=0;i<6;i++) {

            store_items.cloudawesome['server'+ i.toString()]=mine.servers[i];

        }

        $('#store_div').hide();

    };


    var init_royalroad = function(){

        add_site("Royal Road",'royalroad');


    };





    var init_operation137 = function(){};



    var add_site = function(bookmark,site) {


        $('.bookmark_container .dropdown-menu').append('<li><a id=menu_'+site+'>'+bookmark+'</a></li>');
        $('#menu_'+site).click(function(){load_site(site)});


    };

  


//  STORE SITES ------------------------------------------------------------------

    var links = {

      cloudawesome:"www.cloudawesome.com",
        royalroad:"http://7hd3rr9347.onion"

    };

    var sites = {

        cloudawesome: {

            load: function () {


                //TODO: make prices automatically filled in
                $('#store_content_area').append('<div id=cloudawesome_div><div id="ca_header">' +
                    '<div id=ca_title><i class="fa fa-cloud-download"></i>Cloud Awesome</div>'+
                    '<div id=ca_tag>Select Your Cloud Server Configuration</div></div>'+
                    '<div id=ca_content>' +
                        '<div id=ca_item_showcase>' +
                            '<p class="server_name">BusinessEdge CPU Servers</p>'+
                            '<p>100 USD</p>'+
                            '<p class="server_name">BusinessEdge GPU Servers</p>'+
                            '<p>200 USD</p>'+
                            '<p class="server_name">BusinessEdge ASIC Servers</p>' +
                            '<p>400 USD</p>'+
                            '<p class="server_name">Q-Wave One QPU Servers</p>'+
                            '<p>800 USD</p>'+
                        '</div>'+
                        '<div id=ca_server_container></div>'+
                '</div>'+
                '</div>');

                load_store_items('cloudawesome');

            }
        },

        royalroad:{

            load: function(){

                $('#store_content_area').append('<div id=royalroad_div><div id=rr_title>Royal Road</div><div class=items_div></div></div></div>');






            }




        }



    };


    var store_items = {

        cloudawesome: {},

        royalroad:{

            hackerware:{},
            //sniffer:{},
            //ripper:{},
            pills:{} //,
            //chips:{},
            //address:{},
            //docs:{}

        },

        operation137:{

            quark:{},
            virus:{},
            trojan:{},
            deepcrack:{},
            rootkit:{},
            bots:{}


        }


    };



    var load_site = function(site) {


        $('#store_content_area').empty();
        $('#torque_address_input').attr('placeholder',links[site]);
        sites[site].load();


    };



    var load_store_items = function(site) {

        var items = store_items[site];


        for (var name in items) {
            if (items.hasOwnProperty(name)) {


                if (site != 'cloudawesome') {

                    // This is for non-cloud awesome stuff
                    $('.items_div').append('<div class="item_container">' +
                    '<div class="item_name">' + items[name]['name'] + '</div><div class=item_batch>( '+ items[name]['batch_num'] +' )</div>'+
                    '<div class=item_blurb>' + items[name]['blurb'] + '</div>'+
                    '<div class="item_cost"></div>' +
                    '<div class=item_purchase_div><button class="btn buy_item">PURCHASE ITEM</button></div>'+
                    '</div>');

                    //fill in costs (which could be multiple types of resources)
                    for (var name2 in items[name].costs) {
                        $('.item_container').last().find('.item_cost').last().append('<p>'+name2.toString()+': '+items[name]['costs'][name2].toString()+'</p>')
                    }


                    $('.item_container').last().find('.btn').last().click(function(){

                        var this_item = items[name];

                            //check that sufficient funds are available
                            var sufficient_funds = check_funds(this_item.costs);


                            if (sufficient_funds === true) {
                                //takes away cost resources/currency
                                for (var name3 in this_item.costs) {
                                    if (this_item['costs'].hasOwnProperty(name3)) {

                                        // special case where its btc or dollars, which don't have methods
                                        if (name3 === 'btc' || name3 === 'dollars') {

                                            if (ewallet['get_avail_' + name3]() >= this_item.costs[name3]) {
                                                ewallet['change_' + name3](-1 * this_item.costs[name3])
                                            }

                                        } else {

                                            if (resourceitems[name3]['num'] >= this_item.costs[name]) {
                                                resourceitems[name3]['remove_resource'](this_item.costs[name3])
                                            }
                                        }
                                    }
                                }

                              //now purchase the item - this depends on whether it's a resource or an upgrade
                              if (this_item.cat === 'resource') {

                                resourceitems[name]['add_resource'](this_item['batch_num']);}

                              else{

                                  this_item.purchase_tool();
                                  $(this).remove();

                              }



                            }

                    })

                }




                else{


                    $('#ca_server_container').append('<div class="item_container">' +
                    '<div class="item_icon_container"><i class="item_icons ' + items[name]['icon'] + '"></i></div>' +
                    '<div class="item_spinner_div" data-id=' + 'server'+items[name]['serial'].toString() + '><i class="spinner_elements fa fa-angle-left"></i><div class="spinner_elements item_number">' + items[name]['values'][items[name]['current']] + '</div><i class="spinner_elements fa fa-angle-right"></i>' +
                    '</div>');


                }


            }
            ;

        }
        ;



        //TODO: add handlers for non-cloud awesome items

        //attach purchasing functionality to the item spinners

        if (site !='cloudawesome'){





        }
        else {

            $('.item_spinner_div').each(function () {

                $(this).find('.fa-angle-left').click(function () {



                        var item_id = $(this).parent().attr('data-id');

                        if (items[item_id]['current'] > 0) {


                            //add back cost to wallet
                            ewallet.change_dollars(items[item_id]['costs'][items[item_id]['current']]);
                            // increment item # and reset div display value
                            items[item_id].downgrade_server();
                            $(this).siblings('.item_number').text(items[item_id]['values'][items[item_id]['current']]);

                        }


                    }
                );


                $(this).find('.fa-angle-right').click(function () {


                        var item_id = $(this).parent().attr('data-id');

                        if  ((items[item_id]['current'] < 4) && (items[item_id]['costs'][items[item_id]['current']+1] <= ewallet.get_avail_dollars())) {

                            //add back cost to wallet
                            ewallet.change_dollars(-1 * items[item_id]['costs'][items[item_id]['current']+1]);
                            // increment item # and reset div display value
                            items[item_id].upgrade_server();
                            $(this).siblings('.item_number').text(items[item_id]['values'][items[item_id]['current']])


                        }
                    }
                )


            })

        }
        };


    return {init:init,
            add_site:add_site}


});

