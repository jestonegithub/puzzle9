/**
 * Created by jessebstone on 10/24/15.
 */

define(['./controlPanel','./holdings','./workers','./inventory','./ewallet'],function(controlPanel,holdings,workers,inventory,ewa) {


    var ads,worker;
    var occupations = {};

    var init = function() {


        //sets up the rbn_ent divs and menu

        $('#home_screen').append(
            '<div id=rbn_ent_div class="rbn_ent_style">' +
                '<div id="rbn_ent_header">' +
                    '<div id=rbn_ent_title class=rbn_ent_style>RBN Entrepreneur</div>'+
                    '<div id=rbn_ent_menu><p id=overview_item class="rbn_ent_menu">How It Works</p><p id=mycomps_item class="rbn_ent_menu">My Portolio</p></div>' +
                '</div>'+
                '<div id=rbn_ent_content_area>' +
                    '<div id=rbn_ent_landing>' +
                    '<p>Go ahead.  Build that corporate EMPIRE you\'ve always dreamed of.</p>'+
                    '</div>'+
                    '<div id=ent_overview>HOW IT WORKS</div>'+
                    '<div id=mycomps></div>' +
                '</div>'+
            '</div>');


        $('#ent_overview').hide();
        $('#mycomps').hide();

        //set handlers for the menu buttons
        $('#overview_item').click(function(){

            $('#mycomps_item').css('text-decoration','none');
            $('#overview_item').css('text-decoration','underline');

            $('#rbn_ent_landing').hide();
            $('#mycomps').hide();
            $('#ent_overview').show();

        });

        $('#mycomps_item').click(function() {

            $('#overview_item').css('text-decoration', 'none');
            $('#mycomps_item').css('text-decoration', 'underline');

            $('#rbn_ent_landing').hide();
            $('#ent_overview').hide();
            $('#mycomps').show();

        });

        //initializing ads, workers and occupations objects - they live in rbn_ent

        ads = new workers.Ads();
        //inventory.register_item('ads');

        worker = new workers.Workers();
        //inventory.register_item('workers');

        workers.init_workers();

        //occupations['salesmen'] = new workers.Occupation('salesmen');
        //occupations['pharmacists'] = new workers.Occupation('pharmacists');
        //occupations['activists'] = new workers.Occupation('activists');
        //occupations['researchers'] = new workers.Occupation('researchers');
        //occupations['traders'] = new workers.Occupation('traders');
        //occupations['engineers'] = new workers.Occupation('engineers');



        //this displays ads and workers
        console.log('ad cost:'+ads.cost)
        $('#mycomps').append('<div id=ads><div id=ads_title class="ads">NEW AD Rate (USD)</div><div id="ads_number" class="ads">'+ads.cost.toString()+'</div><button type="button" class="btn ads">BUY ADS</button></div>');


        //$('#mycomps').append('<div id=workers><div id="worker_title" class="workers">Workers</div><div id="workers_number" class="workers">'+workers.num_workers+'</div>');


        // this holds the company listings and occupations (as they are unlocked by rbn_actor)

        $('#mycomps').append('<div id="my_comps_header"><div id=mycomps_div class=mycomps_listing><p id="mycomps_title">Companies</p></div><div id=myoccupations_div class=myoccupations_listing><p id="myoccupations_title">Available Workers</p></div></div>');
        $('#mycomps').append('<div id="holding_content"></div>');



        //handler for buy ads button

        $('.btn.ads').click(function(){
            ads.buy_ads(worker);
        });






        $('#rbn_ent_div').hide();


        //TODO: DEV ONLY
        init_company('zyng');
        init_company('epharm');
        init_company('ezpaper');
        init_company('press');


    };







    // rbn_actor calls this function as certain conditions develop

    var init_company = function(holding_type) {

        var new_comp = new holdings.Holding(holding_type);

        $('#holding_content').append('<div class=holding_div>' +
            '<div class=holding_container>'+
                '<div class=holding_title>'+new_comp['name']+'</div>'+
                '<div class=holding_blurb>'+new_comp.blurb+'</div>'+
                '<div class=holding_price></div>'+
            '</div>'+
            '<div class=holding_action_div></div>'+
        '</div>'
        );

        //fill in costs (which could be multiple types of resources)
        for (var name in new_comp.costs) {
            $('.holding_div').last().find('.holding_price').last().append('<p>'+name.toString()+': '+new_comp.costs[name].toString()+'</p>')
        }

        $('.holding_div').last().find('.holding_action_div').append('<button class="btn buy_holding">PURCHASE HOLDING</button>');



        //handler for purchase companies button
        $('.holding_div').last().find('.btn').last().click(function(){
            new_comp.buy_holding();
            if (new_comp.purchased === true){

                //determine which DIV we are in
                var current_div = $(this).parent();

                //add new occupation
                var occup = new workers.Occupation(new_comp.occupation_supported);

                // add html and handlers for new occupation
                $(this).remove();
                current_div.append('<div class="myoccupations_container">' + new_comp.occupation_supported +
                '<div class=item_spinner_div><i class="spinner_elements fa fa-angle-left"></i><div class="spinner_elements item_number">' + occup.num_active.toString() + '</div><i class="spinner_elements fa fa-angle-right"></i>' +
                '</div>');


                //add handlers for spinners
                current_div.find('.fa-angle-left').click(function(){
                        occup.decrease_occupation(worker);
                        console.log(occup.num_active);
                        $(this).siblings('.item_number').text(occup.num_active.toString());
                });

                current_div.find('.fa-angle-right').click(function(){
                        occup.increase_occupation(worker);
                        console.log(occup.num_active);
                        console.log(worker.avail_workers);
                        $(this).siblings('.item_number').text(occup.num_active.toString());
                });
            }
        })
    };










    return{init:init}


});