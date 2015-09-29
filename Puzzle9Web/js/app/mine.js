/**
 * Created by jessebstone on 9/22/15.
 */

define(['progressbar','./inventory'],function(progressbar,inventory) {

    // mine_attr has the following attributes:
    ////  mining.difficulty - essentially how long it takes to complete one 'mining cycle'
    ////  mining.value - how many btc's are received after each cycle
    ////  mining.active: true for active mining and false for inactive (to prevent multiple simultaneous firings)

    var mine_attr = {};

    var init = function(change_btc){

        //create button and div for progress line
        $('#mine').append('<div id=mine_button><i class="fa fa-server"></i></div><div id=line_div>CPU</div>');

        // initialize mine_attr variables
        mine_attr.difficulty=0;
        mine_attr.value=1;
        mine_attr.active=false;

        inventory.register_item('bitcoin');

        $('#mine_button').click(function(){

        if(mine_attr.active){return;}

        mining_progress(change_btc);


    })

};

    // displays mining progress using progress bar and call the update button when done.

    var mining_progress = function(change_btc){

        //load the fancy button stuff for mining button

        mine_attr.active=true;

        var progress_timer=2000+mine_attr.difficulty*500;

        var line = new progressbar.Line('#line_div',{color:'#FCB03C',strokeWidth:0.5});
        line.animate(0.5,{duration:progress_timer,easing:'linear'},function(){

            change_btc(mine_attr.value);
            line.destroy();
            mine_attr.active=false;



        });

    };







    return{init:init}


});