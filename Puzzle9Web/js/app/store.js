/**
 * Created by jessebstone on 9/29/15.
 */

define(['./ewallet','bootstrap','./mine'],function(ewallet,bootstrap,mine) {


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


    var add_site = function(bookmark,site) {


        $('.bookmark_container .dropdown-menu').append('<li><a id=menu_'+site+'>'+bookmark+'</a></li>');
        $('#menu_'+site).click(function(){load_site(site)});


        //'<li><a id="test">Super Servers</a></li>'+
        //'<li><a href="#">royal road</a></li>'+



    };




//  STORE SITES ------------------------------------------------------------------

    var links = {

      cloudawesome:"www.cloudawesome.com"

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
        }

    };

    var store_items = {

        cloudawesome: {}

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
                    $('#ca_content').append('<div class="item_container">' +
                    '<div class="item_icon_container"><i class="item_icons ' + items[name]['icon'] + '"></i></div>' +
                    '<div class="item_name">' + items[name]['name'] + '</div>' +
                    '<div class="item_cost">' + items[name]['cost'] + " " + items[name]['cost_type'] + '</div>' +
                    '<div class="item_spinner_div" data-id=' + items[name]['id'] + '><i class="spinner_elements fa fa-angle-left"></i><div class="spinner_elements item_number">' + items[name]['num_active'] + '</div><i class="spinner_elements fa fa-angle-right"></i>' +
                    '</div>');



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


    return {init:init}


});

